import ScaleView from '../ScaleView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';
import ScaleItem from "../ScaleItem";

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

  addItems(items: Array<ScaleItem>, isVertical: boolean): void {
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
  }
}

export default ScaleViewImpl;
