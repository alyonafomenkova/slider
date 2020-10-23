import ScaleView from '../ScaleView';
import MainView from '../MainView';
import SliderView from '../SliderView';
import PointerView from '../PointerView';

class MainViewImpl implements MainView {
  private readonly sliderView: SliderView;

  private readonly scaleView: ScaleView;

  private readonly pointerFromView: PointerView;

  private readonly pointerToView: PointerView;

  constructor(sliderView: SliderView, scaleView: ScaleView, pointerFromView: PointerView, pointerToView: PointerView) {
    if (!sliderView) throw new Error('Slider view is not defined');
    if (!scaleView) throw new Error('Scale view is not defined');
    if (!pointerFromView) throw new Error('Pointer from view is not defined');
    if (!pointerToView) throw new Error('Pointer to view is not defined');

    this.sliderView = sliderView;
    this.scaleView = scaleView;
    this.pointerFromView = pointerFromView;
    this.pointerToView = pointerToView;
  }

  public clear(): void {
    this.sliderView.clear();
  }

  public setupScale(): void {
    //
  }

  public initSliderClicks(): void {
    //
  }

  public initPointerFrom(): void {
    //
  }

  public initPointerTo(): void {
    //
  }

  public handleSliderBarClick(): void {
    //
  }

  public updateProgress(): void {
    //
  }

  public drawVertical(): void {
    this.sliderView.drawVertical();
  }

  public drawHorizontal(): void {
    this.sliderView.drawHorizontal();
  }

  public showScale(): void {
    this.scaleView.show();
  }

  public hideScale(): void {
    this.scaleView.hide();
  }

  public showPointerFromValue(): void {
    this.pointerFromView.showValue();
  }

  public hidePointerFromValue(): void {
    this.pointerFromView.hideValue();
  }

  public showPointerToValue(): void {
    this.pointerToView.showValue();
  }

  public hidePointerToValue(): void {
    this.pointerToView.hideValue();
  }

  public showPointerTo(): void {
    this.pointerToView.show();
  }

  public hidePointerTo(): void {
    this.pointerToView.hide();
  }

  public setupPositionFromByValue(value: number): void {
    //
  }

  public setupPositionToByValue(value: number): void {
    //
  }

  public calculateValueFrom(): void {
    //
  }

  public calculateValueTo(): void {
    //
  }
}

export default MainViewImpl;
