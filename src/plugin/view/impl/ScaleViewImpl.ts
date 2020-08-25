import Util from '../../util/Util';
import ScaleItem from '../ScaleItem';
import ScaleView from '../ScaleView';

class ScaleViewImpl implements ScaleView {
  private readonly container: Element;

  private clickEventListener?: (view: ScaleView, value: number) => void = undefined;

  constructor(container: Element) {
    this.container = container;
  }

  public show(): void {
    const scaleContainer = this.container.querySelector('.slider__scale') as HTMLElement;
    if (scaleContainer) {
      scaleContainer.style.visibility = 'visible';
    }
  }

  public hide(): void {
    const scaleContainer = this.container.querySelector('.slider__scale') as HTMLElement;
    if (scaleContainer) {
      scaleContainer.style.visibility = 'hidden';
    }
  }

  public addItems(items: Array<ScaleItem>, isVertical: boolean): void {
    let template = '';

    items.forEach((item) => {
      template += `
      <div class="slider__scale-item">
        <div class="slider__scale-division"></div>
        <span class="slider__scale-value">${item.value}</span>
      </div>`.trim();
    });

    Util.createElement(this.container, 'slider__scale', template);
    const elements = this.container.getElementsByClassName('slider__scale-item');

    for (let i = 0; i < elements.length; i++) {
      const percent = items[i].positionPercent;
      if (isVertical) {
        (elements[i] as HTMLElement).style.bottom = `${percent}%`;
      } else {
        (elements[i] as HTMLElement).style.left = `${percent}%`;
      }
    }
    this.setupClickListeners();
  }

  public setClickListener(listener: (view: ScaleView, value: number) => void): void {
    this.clickEventListener = listener;
  }

  private setupClickListeners(): void {
    if (this.container) {
      const items = this.container.querySelectorAll('.slider__scale-item');
      items.forEach((it) => {
        const item = it as HTMLElement;
        item.addEventListener('click', this.handleScaleItemClick);
      });
    } else {
      throw new Error('Container is undefined.');
    }
  }

  private handleScaleItemClick = (evt: MouseEvent): void => {
    if (this.clickEventListener) {
      const item = (evt.target as HTMLElement).closest('.slider__scale-item');
      if (item) {
        const valueContainer = item.querySelector('.slider__scale-value');
        if (valueContainer) {
          const value = Number((valueContainer as HTMLElement).innerText);
          this.clickEventListener(this, value);
        }
      }
    }
  };
}

export default ScaleViewImpl;
