import Configuration from '../model/Configuration';
import Model from '../model/Model';
import Subject from '../model/Subject';
import PointerView from '../view/PointerView';
import ScaleItem from '../view/ScaleItem';
import ScaleView from '../view/ScaleView';
import SliderView from '../view/SliderView';
import Util from '../util/Util';

class Presenter {
  private readonly MAX_SCALE_ITEMS_STEP = 26;

  private readonly model: Model;

  private sliderView?: SliderView = undefined;

  private pointerFromView?: PointerView = undefined;

  private pointerToView?: PointerView = undefined;

  private scaleView?: ScaleView = undefined;

  private isVertical: Subject<boolean>;

  private hasValue: Subject<boolean>;

  private hasScale: Subject<boolean>;

  constructor(model: Model, configuration: Configuration) {
    this.model = model;
    this.isVertical = new Subject(configuration.isVertical);
    this.hasValue = new Subject(configuration.hasValue);
    this.hasScale = new Subject(configuration.hasScale);
  }

  private initPointerFrom(view: PointerView):void {
    view.draw(this.hasValue.getValue());
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
    view.draw(this.hasValue.getValue());
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

    if (!this.model.isInterval()) {
      view.hide();
    }

    if (!this.hasValue.getValue()) {
      view.hideValue();
    }
  }

  private updateHorizontalProgress(sliderView: SliderView): void {
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

    const isInterval = this.model.isInterval();
    const positionMin = sliderView.getBoundLeft();
    const positionFrom = this.pointerFromView.getLeft() + this.pointerFromView.getWidth() / 2;
    let start;
    let end;

    if (isInterval) {
      const positionTo = this.pointerToView.getLeft() + this.pointerToView.getWidth() / 2;
      start = positionFrom - positionMin;
      end = positionTo;
    } else {
      start = 0;
      end = positionFrom;
    }
    const width = Math.abs(end - start - positionMin);
    const startInPercent = (start / sliderView.getWidth()) * 100;
    const widthInPercent = (width / sliderView.getWidth()) * 100;
    sliderView.drawHorizontalProgress(startInPercent, widthInPercent);
  }

  private updateVerticalProgress(sliderView: SliderView): void {
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

    const isInterval = this.model.isInterval();
    const positionMax = sliderView.getBoundBottom();
    const positionFrom = positionMax - this.pointerFromView.getTop() - this.pointerFromView.getHeight() / 2;
    let start;
    let end;

    if (isInterval) {
      const positionTo = positionMax - this.pointerToView.getTop() - this.pointerToView.getHeight() / 2;
      start = positionFrom;
      end = positionTo;
    } else {
      start = 0;
      end = positionFrom;
    }
    const height = Math.abs(start - end);
    const startInPercent = (start / sliderView.getHeight()) * 100;
    const heightInPercent = (height / sliderView.getHeight()) * 100;
    sliderView.drawVerticalProgress(startInPercent, heightInPercent);
  }

  private updateProgress(sliderView: SliderView): void {
    if (this.isVertical.getValue()) {
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
    sliderView.clear();

    if (this.isVertical.getValue()) {
      sliderView.drawVertical();
    } else {
      sliderView.drawHorizontal();
    }
    this.setupScale(scaleView);

    if (!this.hasScale.getValue()) {
      this.scaleView.hide();
    }
    this.initPointerFrom(pointerFromView);
    this.initPointerTo(pointerToView);
    this.updateProgress(sliderView);
    sliderView.setClickSliderBarListener(this.sliderBarClickListener);
  }

  private setupScale(view: ScaleView): void {
    if (!this.sliderView) throw new Error('Slider view is not defined.');

    const items: Array<ScaleItem> = [];
    const min = this.model.getMin();
    const max = this.model.getMax();
    const sliderWidth = this.sliderView.getWidth();
    const sliderHeight = this.sliderView.getHeight();
    const step = this.model.getStep();
    const count = Math.floor((max - min) / step);
    const isVertical = this.isVertical.getValue();
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

  private scaleClickListener = (view: ScaleView, value: number): void => {
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

    const isInterval = this.model.isInterval();
    const from = this.model.getFrom();
    const to = this.model.getTo();
    let pointerView;

    if (isInterval) {
      const differenceBetweenValueAndFrom = Math.abs(value - from);
      const differenceBetweenValueAndTo = Math.abs(value - to);

      if (differenceBetweenValueAndFrom <= differenceBetweenValueAndTo) {
        pointerView = this.pointerFromView;
      } else {
        pointerView = this.pointerToView;
      }
    } else {
      pointerView = this.pointerFromView;
    }

    if (pointerView) {
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

  private sliderBarClickListener = (view: SliderView, x: number, y: number): void => {
    if (this.pointerFromView) {
      let positionFrom;
      let pointerView;

      if (this.model.isInterval()) {
        if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

        let positionTo;
        let differenceBetweenValueAndFrom;
        let differenceBetweenValueAndTo;
        if (this.isVertical.getValue()) {
          positionFrom = this.pointerFromView.getTop() - this.pointerFromView.getHeight() / 2;
          positionTo = this.pointerToView.getTop() - this.pointerToView.getHeight() / 2;
          differenceBetweenValueAndFrom = Math.abs(y - positionFrom);
          differenceBetweenValueAndTo = Math.abs(y - positionTo);
        } else {
          positionFrom = this.pointerFromView.getLeft() + this.pointerFromView.getWidth() / 2;
          positionTo = this.pointerToView.getLeft() + this.pointerToView.getWidth() / 2;
          differenceBetweenValueAndFrom = Math.abs(x - positionFrom);
          differenceBetweenValueAndTo = Math.abs(x - positionTo);
        }
        if (differenceBetweenValueAndFrom <= differenceBetweenValueAndTo) {
          pointerView = this.pointerFromView;
        } else {
          pointerView = this.pointerToView;
        }
      } else {
        pointerView = this.pointerFromView;
      }
      this.setPointerPosition(pointerView, x, y);
    }
  };

  private setPointerPosition(view: PointerView, x: number, y: number) {
    if (this.isVertical.getValue()) {
      this.setPointerY(view, y);
    } else {
      this.setPointerX(view, x);
    }
    this.calculateValue(view);

    if (!this.sliderView) throw new Error('Slider view is not defined.');
    this.updateProgress(this.sliderView);
  }

  private calculateValue(view: PointerView): void {
    if (!this.sliderView) throw new Error('Slider view is not defined.');

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

    if (this.isVertical.getValue()) {
      const positionY = view.getTop() + pointerHalfHeight - this.sliderView.getBoundTop();
      const stepHeight = this.sliderView.getHeight() / stepsTotal;

      if (Math.floor(positionY) === 0) {
        value = max;
      } else {
        value = Math.round((this.sliderView.getHeight() - positionY) / stepHeight) * step + min;
      }
    } else {
      const positionX = view.getLeft() + pointerHalfWidth - this.sliderView.getBoundLeft();
      const stepWidth = this.sliderView.getWidth() / stepsTotal;

      if (Math.floor(positionX) < Math.floor(this.sliderView.getWidth())) {
        value = Math.round(positionX / stepWidth) * step + min;
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
  }

  public setMin(value: number): void {
    const max = this.model.getMax();
    const step = this.model.getStep();

    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');
    if (!this.scaleView) throw new Error('Scale view is not defined.');

    this.model.setMin(value >= max - step ? max - step : value);
    this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
  }

  public setMax(value: number): void {
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');
    if (!this.scaleView) throw new Error('Scale view is not defined.');

    const min = this.model.getMin();
    const step = this.model.getStep();
    this.model.setMax(value <= min + step ? min + step : value);
    this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
  }

  public setStep(value: number): void {
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');
    if (!this.scaleView) throw new Error('Scale view is not defined.');

    this.model.setStep(value);
    this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
  }

  public setValueFrom(value: number): void {
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');

    this.setupPositionByValue(this.pointerFromView, value);
    this.calculateValue(this.pointerFromView);
    this.updateProgress(this.sliderView);
  }

  public setValueTo(value: number): void {
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

    if (this.model.isInterval()) {
      this.setupPositionByValue(this.pointerToView, value);
      this.calculateValue(this.pointerToView);
      this.updateProgress(this.sliderView);
    }
  }

  public setScale(value: boolean): void {
    this.hasScale.setValue(value);
    if (this.scaleView) {
      if (value) {
        this.scaleView.show();
      } else {
        this.scaleView.hide();
      }
    }
  }

  public setPointerValue(value: boolean): void {
    this.hasValue.setValue(value);
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

    if (value) {
      this.pointerFromView.showValue();

      if (this.model.isInterval()) {
        this.pointerToView.showValue();
      } else {
        this.pointerToView.hideValue();
      }
    } else {
      this.pointerFromView.hideValue();
      this.pointerToView.hideValue();
    }
  }

  public setHasInterval(value: boolean): void {
    this.model.setInterval(value);
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

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

      if (this.hasValue.getValue()) {
        this.pointerToView.showValue();
      } else {
        this.pointerToView.hideValue();
      }
    } else {
      this.pointerToView.hide();
      this.pointerToView.hideValue();
    }
    this.updateProgress(this.sliderView);
  }

  public setIsVerticalOrientation(value: boolean): void {
    this.isVertical.setValue(value);
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');
    if (!this.scaleView) throw new Error('Scale view is not defined.');

    this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
  }

  setValueFromListener(listener: (value: number) => void): void {
    this.model.attachValueFrom(listener);
  }

  setMinListener(listener: (value: number) => void): void {
    this.model.attachMin(listener);
  }

  setMaxListener(listener: (value: number) => void): void {
    this.model.attachMax(listener);
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
      let positionMin;
      let positionMax;
      let centerOfPointer;

      if (this.isVertical.getValue()) {
        positionMin = this.sliderView.getBoundTop();
        positionMax = this.sliderView.getBoundBottom();
        centerOfPointer = (((value - min) * (positionMin - positionMax)) / (max - min)) + positionMax;
        this.setPointerY(view, centerOfPointer);
      } else {
        positionMin = this.sliderView.getBoundLeft();
        positionMax = this.sliderView.getBoundRight();
        centerOfPointer = (((value - min) * (positionMax - positionMin)) / (max - min)) + positionMin;
        this.setPointerX(view, centerOfPointer);
      }
      if (centerOfPointer) {
        return centerOfPointer;
      }
    }
    return undefined;
  }

  private setPointerX(view: PointerView, x: number) {
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

    let positionX = x - this.sliderView.getBoundLeft();
    const xMin = 0;
    const xMax = this.sliderView.getWidth();
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    const stepCount = (max - min) / step;
    const stepX = this.sliderView.getWidth() / stepCount;
    const stepsTotal = (max - min) / step;
    const stepWidth = this.sliderView.getWidth() / stepsTotal;
    const isInterval = this.model.isInterval();
    positionX = Math.round(positionX / stepX) * stepX;

    if (isInterval) {
      if (view === this.pointerFromView) {
        const pointerToX = ((this.model.getTo() - min) / step) * stepWidth;

        if (positionX > pointerToX - stepWidth) {
          positionX = pointerToX - stepWidth;
        }
      } else {
        const pointerFromX = ((this.model.getFrom() - min) / step) * stepWidth;

        if (positionX < pointerFromX + stepWidth) {
          positionX = pointerFromX + stepWidth;
        }
      }
    }
    if (positionX > xMax) {
      positionX = xMax;
    } else if (positionX < xMin) {
      positionX = xMin;
    }
    const percent = (positionX / this.sliderView.getWidth()) * 100;
    view.setX(percent);
  }

  private setPointerY(view: PointerView, y: number) {
    if (!this.sliderView) throw new Error('Slider view is not defined.');
    if (!this.pointerFromView) throw new Error('Pointer from view is not defined.');
    if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

    let positionY = y - this.sliderView.getBoundTop();
    const yMin = 0;
    const yMax = this.sliderView.getHeight();
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    const stepCount = (max - min) / step;
    const stepY = this.sliderView.getHeight() / stepCount;
    const stepHeight = this.sliderView.getHeight() / stepCount;
    const offset = this.sliderView.getHeight() - Math.floor(stepCount) * stepHeight;
    const isInterval = this.model.isInterval();
    positionY = Math.round((positionY - offset) / stepY) * stepY + offset;

    if (isInterval) {
      if (view === this.pointerFromView) {
        const pointerToY = Math.abs(((this.model.getTo() - max) / step) * stepHeight);
        if (positionY < pointerToY + stepHeight) {
          positionY = pointerToY + stepHeight;
        }
      } else {
        const pointerFromY = Math.abs(((this.model.getFrom() - max) / step)) * stepHeight;

        if (positionY > pointerFromY - stepHeight) {
          positionY = pointerFromY - stepHeight;
        }
      }
    }
    if (positionY > yMax) {
      positionY = yMax;
    } else if (positionY < yMin) {
      positionY = yMin;
    }
    const percent = (positionY / this.sliderView.getHeight()) * 100;
    view.setY(percent);
  }
}

export default Presenter;
