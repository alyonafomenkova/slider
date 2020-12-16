import Util from '../../util/Util';
import ScaleItem from './ScaleItem';
import ScaleView from './ScaleView';

class ScaleViewImpl implements ScaleView {
  private readonly container: HTMLElement;

  private clickEventListener?: (view: ScaleView, value: number) => void = undefined;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public show(): void {
    const scaleContainer = this.container.querySelector('.slider__scale');
    if (scaleContainer) {
      scaleContainer.classList.remove('slider__scale_hidden');
      scaleContainer.classList.add('slider__scale_visible');
    }
  }

  public hide(): void {
    const scaleContainer = this.container.querySelector('.slider__scale');
    if (scaleContainer) {
      scaleContainer.classList.remove('slider__scale_visible');
      scaleContainer.classList.add('slider__scale_hidden');
    }
  }

  public addScaleItems(scaleItems: Array<ScaleItem>, isVertical: boolean): void {
    let template = '';

    scaleItems.forEach((item) => {
      template += `
      <div class="slider__scale-item">
        <div class="slider__scale-division"></div>
        <span class="slider__scale-value">${item.value}</span>
      </div>`.trim();
    });

    Util.createElement(this.container, 'slider__scale', template);
    const scaleElements = this.container.getElementsByClassName('slider__scale-item');

    for (let i = 0; i < scaleElements.length; i += 1) {
      const percent = scaleItems[i].positionPercent;
      if (isVertical) {
        (scaleElements[i] as HTMLElement).style.bottom = `${percent}%`;
      } else {
        (scaleElements[i] as HTMLElement).style.left = `${percent}%`;
      }
    }
    this.setupClickListeners();
  }

  public setClickListener(listener: (view: ScaleView, value: number) => void): void {
    this.clickEventListener = listener;
  }

  private setupClickListeners(): void {
    if (this.container) {
      const scaleElements = this.container.querySelectorAll('.slider__scale-item');
      scaleElements.forEach((it) => {
        const scaleElement = it as HTMLElement;
        scaleElement.addEventListener('click', this.handleScaleItemClick);
      });
    } else {
      throw new Error('Container is undefined.');
    }
  }

  private handleScaleItemClick = (evt: MouseEvent): void => {
    if (this.clickEventListener) {
      const scaleElement = (evt.target as HTMLElement).closest('.slider__scale-item');
      if (scaleElement) {
        const valueContainer = scaleElement.querySelector('.slider__scale-value');
        if (valueContainer) {
          const value = Number((valueContainer as HTMLElement).innerText);
          this.clickEventListener(this, value);
        }
      }
    }
  };
}

export default ScaleViewImpl;
