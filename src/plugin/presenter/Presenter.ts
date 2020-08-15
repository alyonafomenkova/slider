import Model from '../model/Model';
import SliderView from '../view/SliderView';
import PointerView from '../view/PointerView';
import ScaleView from '../view/ScaleView';
import ScaleItem from '../view/ScaleItem';
import Util from '../util/Util';

class Presenter {
  private readonly MAX_SCALE_ITEMS_STEP = 26;

  private model: Model;

  private sliderView?: SliderView = undefined;

  private pointerFromView?: PointerView = undefined;

  private pointerToView?: PointerView = undefined;

  private scaleView?: ScaleView = undefined;

  constructor(model: Model) {
    this.model = model;
  }

  private initPointerFrom(view: PointerView):void {
    view.draw(this.model.isValue());
    view.setDownEventListener(this.pointerDownEventListener);
    view.setMoveEventListener(this.pointerMoveEventListener);
    view.setUpEventListener(this.pointerUpEventListener);

    this.model.attachValueFrom((value: number): void => {
      if (this.pointerFromView) {
        this.pointerFromView.setValue(value);
      }
    });

    this.setupPositionByValue(view, this.model.getFrom());
    this.calculateValue(view);
  }

  private initPointerTo(view: PointerView): void {
    if (this.model.isInterval()) {
      view.draw(this.model.isValue());
      view.setDownEventListener(this.pointerDownEventListener);
      view.setMoveEventListener(this.pointerMoveEventListener);
      view.setUpEventListener(this.pointerUpEventListener);

      this.model.attachValueTo((value: number): void => {
        if (this.pointerToView) {
          this.pointerToView.setValue(value);
        }
      });

      this.setupPositionByValue(view, this.model.getTo());
      this.calculateValue(view);
    }
  }

  private updateHorizontalProgress(sliderView: SliderView): void {
    const isInterval = this.model.isInterval() && this.pointerFromView && this.pointerToView;
    const posMin = sliderView.getBoundLeft();
    const posFrom = this.pointerFromView!.getLeft() + this.pointerFromView!.getWidth() / 2;
    let start;
    let end;

    if (isInterval) {
      const posTo = this.pointerToView!.getLeft() + this.pointerToView!.getWidth() / 2;
      start = posFrom - posMin;
      end = posTo;
    } else {
      start = 0;
      end = posFrom;
    }

    const width = Math.abs(end - start - posMin);
    const startInPercent = (start / sliderView.getWidth()) * 100;
    const widthInPercent = (width / sliderView.getWidth()) * 100;
    sliderView.drawHorizontalProgress(startInPercent, widthInPercent);
  }

  private updateVerticalProgress(sliderView: SliderView): void {
    const isInterval = this.model.isInterval() && this.pointerFromView && this.pointerToView;
    const posMax = sliderView.getBoundBottom();
    const posFrom = posMax - this.pointerFromView!.getTop() - this.pointerFromView!.getHeight() / 2;
    let start;
    let end;

    if (isInterval) {
      const posTo = posMax - this.pointerToView!.getTop() - this.pointerToView!.getHeight() / 2;
      start = posFrom;
      end = posTo;
    } else {
      start = 0;
      end = posFrom;
    }

    const height = Math.abs(start - end);
    const startInPercent = (start / sliderView.getHeight()) * 100;
    const heightInPercent = (height / sliderView.getHeight()) * 100;
    sliderView.drawVerticalProgress(startInPercent, heightInPercent);
  }

  private updateProgress(sliderView: SliderView): void {
    if (this.model.isVerticalOrientation()) {
      this.updateVerticalProgress(sliderView);
    } else {
      this.updateHorizontalProgress(sliderView);
    }
  }

  init(sliderView: SliderView, pointerFromView: PointerView, pointerToView: PointerView, scaleView: ScaleView): void {
    this.sliderView = sliderView;
    this.pointerFromView = pointerFromView;
    this.pointerToView = pointerToView;
    this.scaleView = scaleView;

    if (this.model.isVerticalOrientation()) {
      sliderView.clear();
      sliderView.drawVertical();
      if (this.model.isScale()) {
        this.setupScale(scaleView);
      }
    } else {
      sliderView.clear();
      sliderView.drawHorizontal();
      if (this.model.isScale()) {
        this.setupScale(scaleView);
      }
    }
    this.initPointerFrom(pointerFromView);
    this.initPointerTo(pointerToView);
    this.updateProgress(sliderView);
  }

  private setupScale(view: ScaleView): void {
    if (this.sliderView) {
      const items: Array<ScaleItem> = [];
      const min = this.model.getMin();
      const max = this.model.getMax();
      const sliderWidth = this.sliderView.getWidth();
      const sliderHeight = this.sliderView.getHeight();
      const step = this.model.getStep();
      const count = Math.floor((max - min) / step);
      const isVertical = this.model.isVerticalOrientation();
      const stepWidth = isVertical ? (sliderHeight / count) : (sliderWidth / count);
      const itemStep = this.getItemsStep(stepWidth);
      for (let i = 0; i <= count; i += itemStep) {
        const value = min + step * i;
        const rounded = Util.roundWithEpsilon(value);
        const percent = ((value - min) * 100) / (max - min);
        items.push(new ScaleItem(rounded, percent));
      }
      view.addItems(items, isVertical);
      view.setClickListener(this.scaleClickListener);
    }
  }

  private scaleClickListener = (view: ScaleView, value: number): void => {
    const isInterval = this.model.isInterval() && this.pointerFromView && this.pointerToView;
    const from = this.model.getFrom();
    const to = this.model.getTo();
    let pointerView;

    if (isInterval) {
      const diffBetweenValueAndFrom = Math.abs(value - from);
      const diffBetweenValueAndTo = Math.abs(value - to);
      if (diffBetweenValueAndFrom <= diffBetweenValueAndTo) {
        pointerView = this.pointerFromView;
      } else {
        pointerView = this.pointerToView;
      }
    } else {
      pointerView = this.pointerFromView;
    }
    if (this.sliderView && pointerView) {
      this.setupPositionByValue(pointerView, value);
      this.calculateValue(pointerView);
      this.updateProgress(this.sliderView);
    }
  };

  private getItemsStep(stepWidth: number): number {
    let step = 1;
    let width = stepWidth;

    while (width < this.MAX_SCALE_ITEMS_STEP) {
      width *= 2;
      step *= 2;
    }
    return step;
  }

  private pointerDownEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private pointerMoveEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private pointerUpEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private setPointerPosition(view: PointerView, x: number, y: number) {
    if (this.model.isVerticalOrientation()) {
      this.setPointerY(view, y);
    } else {
      this.setPointerX(view, x);
    }
    this.calculateValue(view);
    if (this.sliderView) {
      this.updateProgress(this.sliderView);
    } else {
      throw new Error('sliderView is undefined');
    }
  }

  private calculateValue(view: PointerView): void {
    if (this.sliderView) {
      const pointerHalfWidth = view.getWidth() / 2;
      const pointerHalfHeight = view.getHeight() / 2;
      const min = this.model.getMin();
      const max = this.model.getMax();
      const step = this.model.getStep();
      const from = this.model.getFrom();
      const to = this.model.getTo();
      const isInterval = this.model.isInterval();
      const stepsTotal = (max - min) / step;
      let value;

      if (this.model.isVerticalOrientation()) {
        const posY = view.getTop() + pointerHalfHeight - this.sliderView.getBoundTop();
        const stepHeight = this.sliderView.getHeight() / stepsTotal;

        if (Math.floor(posY) === 0) {
          value = max;
        } else {
          value = Math.round(((this.sliderView.getHeight() - posY) / stepHeight) * step) + min;
        }
      } else {
        const posX = view.getLeft() + pointerHalfWidth - this.sliderView.getBoundLeft();
        const stepWidth = this.sliderView.getWidth() / stepsTotal;

        if (Math.floor(posX) < Math.floor(this.sliderView.getWidth())) {
          value = Math.round((posX / stepWidth) * step) + min;
        } else {
          value = max;
        }
      }
      const rounded = Util.roundWithEpsilon(value);

      if (view === this.pointerFromView) {
        if (isInterval) {
          this.model.setFrom(rounded > to ? to : rounded);
        } else {
          this.model.setFrom(rounded);
        }
      } else {
        this.model.setTo(rounded < from ? from : rounded);
      }
    } else {
      throw new Error('Slider view is undefined');
    }
  }

  public setStep(value: number): void {
    this.model.setStep(value);
  }

  public setValueFrom(value: number): void {
    if (!this.pointerFromView) {
      throw new Error('Pointer view from not defined');
    }
    if (!this.sliderView) {
      throw new Error('Slider view is not defined');
    }
    this.setupPositionByValue(this.pointerFromView, value);
    this.calculateValue(this.pointerFromView);
    this.updateProgress(this.sliderView);
  }

  public setValueTo(value: number): void {
    if (!this.pointerToView) {
      throw new Error('Pointer view to not defined');
    }
    if (!this.sliderView) {
      throw new Error('Slider view is not defined');
    }
    if (this.model.isInterval()) {
      this.setupPositionByValue(this.pointerToView, value);
      this.calculateValue(this.pointerToView);
      this.updateProgress(this.sliderView);
    }
  }

  public setScale(value: boolean): void {
    this.model.setScale(value);
    if (this.scaleView) {
      if (value) {
        this.scaleView.show();
      } else {
        this.scaleView.hide();
      }
    }
  }

  public setPointerValue(value: boolean): void {
    this.model.setPointer(value);
    if (this.pointerFromView && this.pointerToView) {
      if (value) {
        this.pointerFromView.showValue();
        this.pointerToView.showValue();
      } else {
        this.pointerFromView.hideValue();
        this.pointerToView.hideValue();
      }
    }
  }

  public setHasInterval(value: boolean): void {
    this.model.setInterval(value);
    if (this.sliderView && this.pointerToView) {
      if (value) {
        const from = this.model.getFrom();
        const to = this.model.getTo();
        const step = this.model.getStep();
        const max = this.model.getMax();

        if (from === max) {
          this.model.setFrom(max - step);
          this.model.setTo(max);
          this.setValueFrom(max - step);
          this.setValueTo(max);
        } else if (from >= to) {
          this.model.setTo(from + step);
          this.setValueTo(from + step);
        }
        this.pointerToView.show();
      } else {
        this.pointerToView.hide();
      }
      this.updateProgress(this.sliderView);
    }
  }

  public setIsVerticalOrientation(value: boolean): void {
    this.model.setVertical(value);
    if (this.sliderView && this.pointerFromView && this.pointerToView && this.scaleView) {//
      if (value) {
        console.log('VERTICAL');
        this.sliderView.clear();
        this.sliderView.drawVertical();
      } else {
        console.log('HORIZONTAL');
        this.sliderView.clear();
        this.sliderView.drawHorizontal();
      }
      this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
    }
  }

  setValueFromListener(listener: (value: number) => void): void {
    this.model.attachValueFrom(listener);
  }

  setValueToListener(listener: (value: number) => void): void {
    this.model.attachValueTo(listener);
  }

  setStepListener(listener: (value: number) => void): void {
    this.model.attachStep(listener);
  }

  private setupPositionByValue(view: PointerView, value: number): number | undefined {
    if (this.sliderView) {
      const min = this.model.getMin();
      const max = this.model.getMax();
      let posMin;
      let posMax;
      let centerOfPointer;

      if (this.model.isVerticalOrientation()) {
        posMin = this.sliderView.getBoundTop();
        posMax = this.sliderView.getBoundBottom();
        centerOfPointer = (((value - min) * (posMin - posMax)) / (max - min)) + posMax;
        this.setPointerY(view, centerOfPointer);
      } else {
        posMin = this.sliderView.getBoundLeft();
        posMax = this.sliderView.getBoundRight();
        centerOfPointer = (((value - min) * (posMax - posMin)) / (max - min)) + posMin;
        this.setPointerX(view, centerOfPointer);
      }
      if (centerOfPointer) {
        return centerOfPointer;
      }
    }
    return undefined;
  }

  private setPointerX(view: PointerView, x: number) {
    if (this.sliderView) {
      let posX = x - this.sliderView.getBoundLeft();
      const xMin = 0;
      const xMax = this.sliderView.getWidth();
      const min = this.model.getMin();
      const max = this.model.getMax();
      const step = this.model.getStep();
      const stepCount = (max - min) / step;
      const stepX = this.sliderView.getWidth() / stepCount;
      const stepsTotal = (max - min) / step;
      const stepWidth = this.sliderView.getWidth() / stepsTotal;
      const isInterval = this.model.isInterval() && this.pointerFromView && this.pointerToView;
      posX = Math.round(posX / stepX) * stepX;

      if (isInterval) {
        if (view === this.pointerFromView) {
          const pointerToX = ((this.model.getTo() - min) / step) * stepWidth;

          if (posX > pointerToX - stepWidth) {
            posX = pointerToX - stepWidth;
          }
        } else {
          const pointerFromX = ((this.model.getFrom() - min) / step) * stepWidth;

          if (posX < pointerFromX + stepWidth) {
            posX = pointerFromX + stepWidth;
          }
        }
      }
      if (posX > xMax) {
        posX = xMax;
      } else if (posX < xMin) {
        posX = xMin;
      }
      const percent = (posX / this.sliderView.getWidth()) * 100;
      view.setX(percent);
    }
  }

  private setPointerY(view: PointerView, y: number) {
    if (this.sliderView) {
      let posY = y - this.sliderView.getBoundTop();
      const yMin = 0;
      const yMax = this.sliderView.getHeight();
      const min = this.model.getMin();
      const max = this.model.getMax();
      const step = this.model.getStep();
      const stepCount = (max - min) / step;
      const stepY = this.sliderView.getHeight() / stepCount;
      const stepHeight = this.sliderView.getHeight() / stepCount;
      const offset = this.sliderView.getHeight() - Math.floor(stepCount) * stepHeight;
      const isInterval = this.model.isInterval() && this.pointerFromView && this.pointerToView;
      posY = Math.round((posY - offset) / stepY) * stepY + offset;

      if (isInterval) {
        if (view === this.pointerFromView) {
          const pointerToY = Math.abs(((this.model.getTo() - max) / step) * stepHeight);
          if (posY < pointerToY + stepHeight) {
            posY = pointerToY + stepHeight;
          }
        } else {
          const pointerFromY = Math.abs(((this.model.getFrom() - max) / step)) * stepHeight;

          if (posY > pointerFromY - stepHeight) {
            posY = pointerFromY - stepHeight;
          }
        }
      }
      if (posY > yMax) {
        posY = yMax;
      } else if (posY < yMin) {
        posY = yMin;
      }
      const percent = (posY / this.sliderView.getHeight()) * 100;
      view.setY(percent);
    }
  }
}

export default Presenter;
