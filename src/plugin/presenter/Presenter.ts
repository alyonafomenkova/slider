import Model from '../model/Model';
import SliderView from '../view/SliderView';
import PointerView from '../view/PointerView';
import ScaleView from '../view/ScaleView';

class Presenter {
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
    const min = this.model.getMin();
    const max = this.model.getMax();

    if (this.model.isVerticalOrientation()) {
      sliderView.clear();
      sliderView.drawVertical();
      if (this.model.isScale()) {
        scaleView.draw(min, max, true);
      }
    } else {
      sliderView.clear();
      sliderView.drawHorizontal();
      if (this.model.isScale()) {
        scaleView.draw(min, max, false);
      }
    }

    this.initPointerFrom(pointerFromView);
    this.initPointerTo(pointerToView);
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
      let centerOfPointer;
      let posMin;
      let posMax;
      let value;

      if (this.model.isVerticalOrientation()) {
        // centerOfPointer = view.getTop() + pointerHalfHeight;
        // posMin = this.sliderView.getBoundTop();
        // posMax = this.sliderView.getBoundBottom();
        // value = (((max - min) * (centerOfPointer - posMax)) / (posMin - posMax)) + min;
        value = -1;
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

      if (view === this.pointerFromView) {
        this.model.setFrom(value);
      } else {
        this.model.setTo(value);
      }
    } else {
      throw new Error('Slider view is undefined');
    }
  }

  private setupPositionByValue(view: PointerView, value: number): number | undefined {
    if (this.sliderView) {
      console.log('calculatePosition');
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
      const pointerHalfWidth = view.getWidth() / 2;
      let posX = x - this.sliderView.getBoundLeft();
      const xMin = 0;
      const xMax = this.sliderView.getWidth();
      const stepCount = (this.model.getMax() - this.model.getMin()) / this.model.getStep();
      const stepX = this.sliderView.getWidth() / stepCount;

      if (posX < xMax) {
        posX = Math.round(posX / stepX) * stepX;
      } else {
        posX = xMax;
      }
      if (posX < xMin) {
        posX = xMin;
      }
      view.setX(posX - pointerHalfWidth);
    }
  }

  private setPointerY(view: PointerView, y: number) {
    if (this.sliderView) {
      const pointerHalfHeight = view.getHeight() / 2;
      let posY = y - this.sliderView.getBoundTop() - pointerHalfHeight;

      if (posY < -pointerHalfHeight) {
        posY = -pointerHalfHeight;
      } else if (posY > this.sliderView.getHeight() - pointerHalfHeight) {
        posY = this.sliderView.getHeight() - pointerHalfHeight;
      }
      view.setY(posY);
    }
  }
}

export default Presenter;
