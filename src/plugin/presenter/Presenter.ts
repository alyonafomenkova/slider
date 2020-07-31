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

    pointerFromView.draw(this.model.isValue());
    pointerFromView.setDownEventListener(this.pointerDownEventListener);
    pointerFromView.setMoveEventListener(this.pointerMoveEventListener);
    pointerFromView.setUpEventListener(this.pointerUpEventListener);

    this.model.attachValueFrom((value: number): void => {
      if (this.pointerFromView) {
        this.pointerFromView.setValue(value);
        console.log(`[attachValueFrom] Value from = ${value}`); //
      }
    });

    this.model.attachValueTo((value: number): void => {
      console.log(`[attachValueTo] Value to = ${value}`);
    });
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
    const value = this.calculateValue(view);
    if (this.model.isVerticalOrientation()) {
      console.log('setPointerPosition value: ', value);//
      this.setPointerY(view, y);
    } else {
      console.log('setPointerPosition value: ', value);//
      this.setPointerX(view, x);
    }
  }

  private calculateValue = (view: PointerView): number | undefined => {
    if (this.sliderView) {
      const pointerHalfWidth = view.getWidth() / 2;
      const pointerHalfHeight = view.getHeight() / 2;
      const min = this.model.getMin();
      const max = this.model.getMax();
      let centerOfPointer;
      let posMin;
      let posMax;
      let value;

      if (this.model.isVerticalOrientation()) {
        centerOfPointer = view.getTop() + pointerHalfHeight;
        posMin = this.sliderView.getBoundTop();
        posMax = this.sliderView.getBoundBottom();
        value = (((max - min) * (centerOfPointer - posMax)) / (posMin - posMax)) + min;
      } else {
        centerOfPointer = view.getLeft() + pointerHalfWidth;
        posMin = this.sliderView.getBoundLeft();
        posMax = this.sliderView.getBoundRight();
        value = (((max - min) * (centerOfPointer - posMin)) / (posMax - posMin)) + min;
      }
      if (value) {
        if (view === this.pointerFromView) {
          this.model.setFrom(value);
        } else {
          this.model.setTo(value);
        }
        return value;
      }
    }
    return undefined;
  };

  private setPointerX(view: PointerView, x: number) {
    if (this.sliderView) {
      const pointerHalfWidth = view.getWidth() / 2;
      let posX = x - this.sliderView.getBoundLeft() - pointerHalfWidth;

      if (posX < -pointerHalfWidth) {
        posX = -pointerHalfWidth;
      } else if (posX > this.sliderView.getWidth() - pointerHalfWidth) {
        posX = this.sliderView.getWidth() - pointerHalfWidth;
      }
      view.setX(posX);
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
