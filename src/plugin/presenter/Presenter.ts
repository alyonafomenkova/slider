import Model from '../model/Model';
import SliderView from '../view/SliderView';
import PointerView from '../view/PointerView';
import ScaleView from '../view/ScaleView';

class Presenter {
  private model: Model;

  private sliderView?: SliderView = undefined;

  constructor(model: Model) {
    this.model = model;
  }

  init(sliderView: SliderView, pointerFromView: PointerView, pointerToView: PointerView, scaleView: ScaleView): void {
    this.sliderView = sliderView;

    if (this.model.isVerticalOrientation()) {
      sliderView.clear();
      sliderView.drawVertical();
      if (this.model.isScale()) {
        scaleView.draw(17, 77, true);
      }
    } else {
      sliderView.clear();
      sliderView.drawHorizontal();
      if (this.model.isScale()) {
        scaleView.draw(17, 77, false);
      }
    }

    pointerFromView.draw(this.model.isValue());
    pointerFromView.setDownEventListener(this.pointerDownEventListener);
    pointerFromView.setMoveEventListener(this.pointerMoveEventListener);
    pointerFromView.setUpEventListener(this.pointerUpEventListener);
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
  }

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
