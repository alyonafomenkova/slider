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

  getBoundLeft(): number {
    return this.container.getBoundingClientRect().left;
  }

  getBoundTop(): number {
    return this.container.getBoundingClientRect().top;
  }

  getBoundRight(): number {
    return this.container.getBoundingClientRect().right;
  }

  getBoundBottom(): number {
    return this.container.getBoundingClientRect().bottom;
  }

  getWidth(): number {
    return this.container.getBoundingClientRect().width;
  }

  getHeight(): number {
    return this.container.getBoundingClientRect().height;
  }
}

export default SliderViewImpl;
