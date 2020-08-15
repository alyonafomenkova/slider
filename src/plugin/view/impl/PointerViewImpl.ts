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

  public show(): void {
    if (this.pointerContainer) {
      this.pointerContainer.style.visibility = 'visible';
    } else {
      throw new Error('Pointer container undefined');
    }
  }

  public hide(): void {
    if (this.pointerContainer) {
      this.pointerContainer.style.visibility = 'hidden';
    } else {
      throw new Error('Pointer container undefined');
    }
  }

  public showValue(): void {
    const containers = this.container.querySelectorAll('.slider__value');
    if (containers.length > 0) {
      containers.forEach((container) => {
        const element = container as HTMLElement;
        element.style.visibility = 'visible';
      });
    }
  }

  public hideValue(): void {
    const containers = this.container.querySelectorAll('.slider__value');
    if (containers.length > 0) {
      containers.forEach((container) => {
        const element = container as HTMLElement;
        element.style.visibility = 'hidden';
      });
    }
  }

  draw(hasValue: boolean): void {
    const template = '<div class="slider__pointer"></div>';
    this.pointerContainer = Util.createElement(this.container, 'slider__pointer-container', template);
    this.setupMouseListeners();
    this.hasValue = hasValue;
    Util.createElement(this.pointerContainer, 'slider__value');

    if (!hasValue) {
      this.hideValue();
    }
  }

  setValue(value: number): void {
    if (this.pointerContainer) {
      const container = this.pointerContainer.querySelector('.slider__value');

      if (container) {
        container.innerHTML = String(value);
      }
    } else {
      throw new Error('Pointer container is undefined.');
    }
  }

  setX(value: number): void {
    if (this.pointerContainer) {
      this.pointerContainer.style.transform = 'translate(-50%, 0)';
      this.pointerContainer.style.left = `${value}%`;
    }
  }

  setY(value: number): void {
    if (this.pointerContainer) {
      this.pointerContainer.style.transform = 'translate(0, -50%)';
      this.pointerContainer.style.top = `${value}%`;
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
