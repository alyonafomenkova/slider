import ScaleView from '../ScaleView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class ScaleViewImpl implements ScaleView {
  private readonly ELEMENT_SPACE_COEFFICIENT = 0.025;

  private readonly container: Element;

  private readonly presenter: Presenter;

  constructor(container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  draw(min: number, max: number, isVertical: boolean): void {
    if (min >= max) {
      throw Error('Min must be < max');
    }
    const count = this.getElementsCount(isVertical);
    this.buildElements(min, max, count);
    this.alignElements(isVertical);
  }

  private getElementsCount(isVertical: boolean): number {
    if (isVertical) {
      return Math.floor((this.container as HTMLElement).offsetHeight * this.ELEMENT_SPACE_COEFFICIENT);
    }
    return Math.floor((this.container as HTMLElement).offsetWidth * this.ELEMENT_SPACE_COEFFICIENT);
  }

  private buildElements(min: number, max: number, count: number): void {
    let template = '';

    for (let i = 0; i < count; i++) {
      const value = i * ((max - min) / (count - 1)) + min;
      // TODO: кол-во нулей в precision = макс кол-ву чисел после запятой у min ИЛИ у max, по умолчанию 100
      const precision = 10;
      const rounded = Math.round((value + Number.EPSILON) * precision) / precision; // TODO: изучить
      template += `
        <div class="slider__scale-item">
          <div class="slider__scale-division"></div>
          <span class="slider__scale-value">${rounded}</span>
        </div>`.trim();
    }
    Util.createElement(this.container, 'slider__scale', template);
  }

  private alignElements(isVertical: boolean): void {
    const elements = this.container.getElementsByClassName('slider__scale-item');

    for (let i = 0; i < elements.length; i++) {
      const percent = (100 / (elements.length - 1)) * i;
      if (isVertical) {
        (elements[i] as HTMLElement).style.bottom = `${percent}%`;
      } else {
        (elements[i] as HTMLElement).style.left = `${percent}%`;
      }
    }
  }
}

export default ScaleViewImpl;
