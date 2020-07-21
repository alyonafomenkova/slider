import SliderView from '../SliderView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class SliderViewImpl implements SliderView {
  private readonly container: Element;

  private presenter: Presenter;

  constructor(container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  drawHorizontal(): void {
    const bar = document.createElement('div');
    bar.className = 'slider__bar slider__bar--horizontal';
    this.container.appendChild(bar);
    Util.addClassName(this.container, 'slider--horizontal');
  }

  drawVertical(): void {
    const bar = document.createElement('div');
    bar.className = 'slider__bar slider__bar--vertical';
    this.container.appendChild(bar);
    Util.addClassName(this.container, 'slider--vertical');
  }
}

export default SliderViewImpl;
