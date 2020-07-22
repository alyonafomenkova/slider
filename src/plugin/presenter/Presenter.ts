import Model from '../model/Model';
import SliderView from '../view/SliderView';
import PointerView from '../view/PointerView';

class Presenter {
  private model: Model;

  private sliderView?: SliderView;

  private pointerFromView?: PointerView;

  private pointerToView?: PointerView;

  constructor(model: Model) {
    this.model = model;
  }

  init(sliderView: SliderView, pointerFromView: PointerView, pointerToView: PointerView): void {
    this.sliderView = sliderView;
    this.pointerFromView = pointerFromView;
    this.pointerToView = pointerToView;

    if (this.model.configuration.isVertical) {
      this.sliderView.clear();
      this.sliderView.drawVertical();
    } else {
      this.sliderView.clear();
      this.sliderView.drawHorizontal();
    }

    this.pointerFromView.drawPointer();
    console.log('Pointer from отрисован!'); // DEBUG
    if (this.model.configuration.hasValue) {
      this.pointerFromView.drawValue();
      console.log('Value from отрисован!'); // DEBUG
    }
  }
}

export default Presenter;
