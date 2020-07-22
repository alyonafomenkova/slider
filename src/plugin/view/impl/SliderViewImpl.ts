import SliderView from '../SliderView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class SliderViewImpl implements SliderView {
  private readonly container: Element;

  private readonly presenter: Presenter;

  constructor(container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  drawHorizontal(): void {
    Util.createElement(this.container, 'slider__bar slider__bar--horizontal');
    Util.addClassName(this.container, 'slider--horizontal');
  }

  drawVertical(): void {
    Util.createElement(this.container, 'slider__bar slider__bar--vertical');
    Util.addClassName(this.container, 'slider--vertical');
  }
}

export default SliderViewImpl;
