import PointerView from '../PointerView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class PointerViewImpl implements PointerView {
  private readonly container: Element;

  private readonly presenter: Presenter;

  private hasValue?: boolean = undefined;

  private pointerContainer?: HTMLElement = undefined;

  private downEventListener?: (view: PointerView, x: number, y: number) => void = undefined;

  private moveEventListener?: (view: PointerView, x: number, y: number) => void = undefined;

  private upEventListener?: (view: PointerView, x: number, y: number) => void = undefined;

  constructor(id: string, container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  draw(hasValue: boolean): void {
    const template = '<div class="slider__pointer"></div>';
    this.pointerContainer = Util.createElement(this.container, 'slider__pointer-container', template);
    this.setupMouseListeners();
    this.hasValue = hasValue;
    if (hasValue) {
      Util.createElement(this.pointerContainer, 'slider__value');
    }
  }

  setValue(value: number): void {
    if (this.hasValue) {
      if (this.pointerContainer) {
        const container = this.pointerContainer.querySelector('.slider__value');

        if (container) {
          console.log('[VIEW setValue] value:', value);
          container.innerHTML = String(value);
        }
      } else {
        throw new Error('Pointer container is null');
      }
    }
  }

  setX(value: number): void {
    if (this.pointerContainer) {
      this.pointerContainer.style.left = `${value}px`;
    }
  }

  setY(position: number): void {
    if (this.pointerContainer) {
      this.pointerContainer.style.top = `${position}px`;
    }
  }

  getWidth(): number {
    if (this.pointerContainer) {
      return this.pointerContainer.getBoundingClientRect().width;
    }
    return 0;
  }

  getHeight(): number {
    if (this.pointerContainer) {
      return this.pointerContainer.getBoundingClientRect().height;
    }
    return 0;
  }

  getLeft(): number {
    if (this.pointerContainer) {
      return this.pointerContainer.getBoundingClientRect().left;
    }
    return 0;
  }

  getTop(): number {
    if (this.pointerContainer) {
      return this.pointerContainer.getBoundingClientRect().top;
    }
    return 0;
  }

  setDownEventListener(listener: (view: PointerView, x: number, y: number) => void): void {
    this.downEventListener = listener;
  }

  setMoveEventListener(listener: (view: PointerView, x: number, y: number) => void): void {
    this.moveEventListener = listener;
  }

  setUpEventListener(listener: (view: PointerView, x: number, y: number) => void): void {
    this.upEventListener = listener;
  }

  private setupMouseListeners(): void {
    if (this.pointerContainer) {
      const pointer = this.pointerContainer.querySelector('.slider__pointer') as HTMLElement;
      pointer.addEventListener('mousedown', this.handleMouseDown);
    } else {
      throw new Error('Pointer container is null');
    }
  }

  private handleMouseDown = (evt: MouseEvent): void => {
    if (this.downEventListener) {
      this.downEventListener(this, evt.clientX, evt.clientY);
    }
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (evt: MouseEvent): void => {
    if (this.moveEventListener) {
      this.moveEventListener(this, evt.clientX, evt.clientY);
    }
  };

  private handleMouseUp = (evt: MouseEvent): void => {
    if (this.upEventListener) {
      this.upEventListener(this, evt.clientX, evt.clientY);
    }
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };
}

export default PointerViewImpl;
