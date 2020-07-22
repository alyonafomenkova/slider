import PointerView from '../PointerView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class PointerViewImpl implements PointerView {
  private readonly container: Element;

  private readonly presenter: Presenter;

  constructor(container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  drawPointer(): void {
    const template = '<div class="slider__pointer"></div>';
    Util.createElement(this.container, 'slider__pointer-container', template);
  }

  drawValue(): void {
    const pointerContainer = this.container.querySelector('.slider__pointer-container');
    if (pointerContainer) {
      Util.createElement(pointerContainer, 'slider__value');
    } else {
      throw Error('Pointer container undefined!');
    }
  }
}

export default PointerViewImpl;
