import Model from '../model/Model';
import SliderView from '../view/SliderView';

class Presenter {
  private model: Model;

  private sliderView?: SliderView;

  constructor(model: Model) {
    this.model = model;
  }

  init(sliderView: SliderView): void {
    this.sliderView = sliderView;

    if (this.model.configuration.isVertical) {
      this.sliderView.clear();
      this.sliderView.drawVertical();
    } else {
      this.sliderView.clear();
      this.sliderView.drawHorizontal();
    }
  }

  // foo(): void {
  //   if (this.sliderView) {
  //     this.sliderView.drawVertical();
  //   } else {
  //     throw Error('Slider view not assigned'); // К собеседованию: без new
  //   }
  // }
}

export default Presenter;
