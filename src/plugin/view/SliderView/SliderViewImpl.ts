import Util from '../../util/Util';
import SliderView from './SliderView';

class SliderViewImpl implements SliderView {
  private readonly container: Element;

  private sliderBarClickListener?: (x: number, y: number) => void = undefined;

  constructor(container: Element) {
    this.container = container;
  }

  public clear(): void {
    this.container.innerHTML = '';
  }

  public drawHorizontal(): void {
    Util.createElement(this.container, 'slider__bar slider__bar_view_horizontal');
    Util.addClassName(this.container, 'slider_view_horizontal');
    Util.removeClassName(this.container, 'slider_view_vertical');
    Util.createElement(this.container, 'slider__progress');
    this.setupClickListeners();
  }

  public drawVertical(): void {
    Util.createElement(this.container, 'slider__bar slider__bar_view_vertical');
    Util.addClassName(this.container, 'slider_view_vertical');
    Util.removeClassName(this.container, 'slider_view_horizontal');
    Util.createElement(this.container, 'slider__progress');
    this.setupClickListeners();
  }

  public drawHorizontalProgress(left: number, width: number): void {
    const progress = this.container.querySelector('.slider__progress') as HTMLElement;
    if (progress) {
      progress.style.left = `${left}%`;
      progress.style.width = `${width}%`;
    }
  }

  public drawVerticalProgress(bottom: number, height: number): void {
    const progress = this.container.querySelector('.slider__progress') as HTMLElement;
    if (progress) {
      progress.style.bottom = `${bottom}%`;
      progress.style.height = `${height}%`;
    }
  }

  public getBoundLeft(): number {
    return this.container.getBoundingClientRect().left;
  }

  public getBoundTop(): number {
    return this.container.getBoundingClientRect().top;
  }

  public getBoundRight(): number {
    return this.container.getBoundingClientRect().right;
  }

  public getBoundBottom(): number {
    return this.container.getBoundingClientRect().bottom;
  }

  public getWidth(): number {
    return this.container.getBoundingClientRect().width;
  }

  public getHeight(): number {
    return this.container.getBoundingClientRect().height;
  }

  public setClickSliderBarListener(listener: (x: number, y: number) => void): void {
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
      this.sliderBarClickListener(evt.clientX, evt.clientY);
    }
  }
}

export default SliderViewImpl;
