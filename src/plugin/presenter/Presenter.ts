import Model from '../model/Model';
import SliderView from '../view/SliderView';
import PointerView from '../view/PointerView';
import ScaleView from '../view/ScaleView';

class Presenter {
  private model: Model;

  private sliderView?: SliderView;

  private pointerFromView?: PointerView;

  private pointerToView?: PointerView;

  private scaleView?: ScaleView;

  constructor(model: Model) {
    this.model = model;
  }

  init(
    sliderView: SliderView, pointerFromView: PointerView,
    pointerToView: PointerView, scaleView: ScaleView,
  ): void {
    this.sliderView = sliderView;
    this.pointerFromView = pointerFromView;
    this.pointerToView = pointerToView;
    this.scaleView = scaleView;

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
    if (this.model.configuration.hasScale) {
      this.scaleView.drawScale();
      console.log('Scale отрисован!'); // DEBUG
    }
  }
}

export default Presenter;
