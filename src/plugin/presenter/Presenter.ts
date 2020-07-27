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
      if (this.model.configuration.hasScale) {
        this.scaleView.draw(17, 77, true);
        console.log('Scale отрисован!'); // DEBUG
      }
    } else {
      this.sliderView.clear();
      this.sliderView.drawHorizontal();
      if (this.model.configuration.hasScale) {
        this.scaleView.draw(17, 77, false);
        console.log('Scale отрисован!'); // DEBUG
      }
    }

    this.pointerFromView.draw(this.model.configuration.isVertical, this.model.configuration.hasValue);
    console.log('Pointer from отрисован!'); // DEBUG
  }
}

export default Presenter;
