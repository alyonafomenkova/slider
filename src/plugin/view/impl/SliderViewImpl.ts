import SliderView from '../SliderView';
import Presenter from '../../presenter/Presenter';
import Util from '../../util/Util';

class SliderViewImpl implements SliderView {
  private readonly container: Element;

  private readonly presenter: Presenter;

  private sliderBarClickListener?: (view: SliderView, x: number, y: number) => void = undefined;

  constructor(container: Element, presenter: Presenter) {
    this.container = container;
    this.presenter = presenter;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  drawHorizontal(): void {
    Util.createElement(this.container, 'slider__bar slider__bar--horizontal');
    Util.addClassName(this.container, 'slider--horizontal');
    Util.removeClassName(this.container, 'slider--vertical');
    Util.createElement(this.container, 'slider__progress');
    this.setupClickListeners();
  }

  drawVertical(): void {
    Util.createElement(this.container, 'slider__bar slider__bar--vertical');
    Util.addClassName(this.container, 'slider--vertical');
    Util.removeClassName(this.container, 'slider--horizontal');
    Util.createElement(this.container, 'slider__progress');
    this.setupClickListeners();
  }

  drawHorizontalProgress(left: number, width: number): void {
    const progress = this.container.querySelector('.slider__progress') as HTMLElement;
    if (progress) {
      progress.style.left = `${left}%`;
      progress.style.width = `${width}%`;
    }
  }

  drawVerticalProgress(bottom: number, height: number): void {
    const progress = this.container.querySelector('.slider__progress') as HTMLElement;
    if (progress) {
      progress.style.bottom = `${bottom}%`;
      progress.style.height = `${height}%`;
    }
  }

  getBoundLeft(): number {
    return this.container.getBoundingClientRect().left;
  }

  getBoundTop(): number {
    return this.container.getBoundingClientRect().top;
  }

  getBoundRight(): number {
    return this.container.getBoundingClientRect().right;
  }

  getBoundBottom(): number {
    return this.container.getBoundingClientRect().bottom;
  }

  getWidth(): number {
    return this.container.getBoundingClientRect().width;
  }

  getHeight(): number {
    return this.container.getBoundingClientRect().height;
  }

  setClickSliderBarListener(listener: (view: SliderView, x: number, y: number) => void): void {
    this.sliderBarClickListener = listener;
  }

  private setupClickListeners(): void {
    const sliderBar = this.container.querySelector('.slider__bar') as HTMLElement;
    const progressBar = this.container.querySelector('.slider__progress') as HTMLElement;
    sliderBar.addEventListener('click', this.handleSliderBarClick);
    progressBar.addEventListener('click', this.handleSliderBarClick);
  }

  private handleSliderBarClick = (evt: MouseEvent): void => {
    if (this.sliderBarClickListener) {
      this.sliderBarClickListener(this, evt.clientX, evt.clientY);
    }
  }
}

export default SliderViewImpl;
