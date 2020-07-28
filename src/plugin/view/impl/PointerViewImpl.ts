import PointerView from '../PointerView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class PointerViewImpl implements PointerView {
  private readonly container: Element;

  private readonly presenter: Presenter;

  private pointerContainer?: HTMLElement = undefined;

  private pressed = false;

  private isVertical = false;

  constructor(container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  draw(isVertical: boolean, hasValue: boolean): void {
    const template = '<div class="slider__pointer"></div>';
    this.pointerContainer = Util.createElement(this.container, 'slider__pointer-container', template);
    this.isVertical = isVertical;
    this.setupMouseListeners();
    if (hasValue) {
      Util.createElement(this.pointerContainer, 'slider__value');
    }
  }

  private setupMouseListeners(): void {
    const pointer = this.container.querySelector('.slider__pointer') as HTMLElement;
    pointer.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseDown = (): void => {
    this.pressed = true;
  };

  private handleMouseMove = (evt: MouseEvent): void => {
    if (this.pressed && this.pointerContainer) {
      const pointerHalfWidth = this.pointerContainer.offsetWidth / 2;
      const pointerHalfHeight = this.pointerContainer.offsetHeight / 2;
      let posX = evt.clientX - this.getSliderBounds().left - pointerHalfWidth;
      let posY = evt.clientY - this.getSliderBounds().top - pointerHalfHeight;
      if (posX < -pointerHalfWidth) {
        posX = -pointerHalfWidth;
      } else if (posX > this.getSliderBounds().width - pointerHalfWidth) {
        posX = this.getSliderBounds().width - pointerHalfWidth;
      }
      if (posY < -pointerHalfHeight) {
        posY = -pointerHalfHeight;
      } else if (posY > this.getSliderBounds().height - pointerHalfHeight) {
        posY = this.getSliderBounds().height - pointerHalfHeight;
      }
      if (this.isVertical) {
        this.pointerContainer.style.top = `${posY}px`;
      } else {
        this.pointerContainer.style.left = `${posX}px`;
      }
    }
  };

  private handleMouseUp = (): void => {
    this.pressed = false;
  };

  private getSliderBounds(): DOMRect {
    return this.container.getBoundingClientRect();
  }
}

export default PointerViewImpl;
