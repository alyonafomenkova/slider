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

  init(sliderView: SliderView, pointerFromView: PointerView, pointerToView: PointerView, scaleView: ScaleView): void {
    this.sliderView = sliderView;
    this.pointerFromView = pointerFromView;
    this.pointerToView = pointerToView;

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
    }
  }

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
  }

  private calculateValue(view: PointerView): void {
    if (this.sliderView) {
      const pointerHalfWidth = view.getWidth() / 2;
      const pointerHalfHeight = view.getHeight() / 2;
      const min = this.model.getMin();
      const max = this.model.getMax();
      const step = this.model.getStep();
      let value;

      if (this.model.isVerticalOrientation()) {
        const posY = view.getTop() + pointerHalfHeight - this.sliderView.getBoundTop();
        const stepsTotal = (max - min) / step;
        const stepHeight = this.sliderView.getHeight() / stepsTotal;

        if (posY < this.sliderView.getHeight()) {
          value = max - Math.round(posY / stepHeight) * step;
        } else {
          value = min;
        }
      } else {
        const posX = view.getLeft() + pointerHalfWidth - this.sliderView.getBoundLeft();
        const stepsTotal = (max - min) / step;
        const stepWidth = this.sliderView.getWidth() / stepsTotal;

        if (posX < this.sliderView.getWidth()) {
          value = Math.round(posX / stepWidth) * step + min;
        } else {
          value = max;
        }
      }
      const rounded = Util.roundWithEpsilon(value);

      if (view === this.pointerFromView) {
        this.model.setFrom(rounded);
      } else {
        this.model.setTo(rounded);
      }
    } else {
      throw new Error('Slider view is undefined');
    }
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
      if (centerOfPointer) { return centerOfPointer; }
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
      posX = Math.round(posX / stepX) * stepX;

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
      posY = Math.round(posY / stepY) * stepY;

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
