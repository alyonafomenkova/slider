import ScaleView from '../ScaleView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class ScaleViewImpl implements ScaleView {
  private readonly container: Element;

  private readonly presenter: Presenter;

  constructor(container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  drawScale(): void {
    const template = `
      <span class="slider__scale-value">0</span>
      <span class="slider__scale-value">1</span>
      <span class="slider__scale-value">2</span>
      <span class="slider__scale-value">3</span>
      <span class="slider__scale-value">4</span>
      <span class="slider__scale-value">5</span>`.trim();
    Util.createElement(this.container, 'slider__scale', template);
  }
}

export default ScaleViewImpl;
