import MainView from '../view/MainView/MainView';
import Model from '../model/Model';

class Presenter {
  private readonly model: Model;

  private readonly view: MainView;

  constructor(model: Model, view: MainView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.view.clear();
    this.setupView();
    this.view.draw();
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    this.view.setupScale(min, max, step);

    if (!this.view.isVisibleScale()) {
      this.view.hideScale();
    }
    const from = this.model.getFrom();
    const to = this.model.getTo();
    const isInterval = this.model.isInterval();

    this.view.initPointerFrom(from, min, max, step, isInterval, to);
    this.view.initPointerTo(to, isInterval, min, max, step, from);
    this.view.updateProgress(isInterval);
    this.observeValues();
  }

  public setMin(value: number): void {
    const max = this.model.getMax();
    const step = this.model.getStep();

    this.model.setMin(value >= max - step ? max - step : value);
    this.init();
  }

  public setMax(value: number): void {
    const min = this.model.getMin();
    const step = this.model.getStep();
    this.model.setMax(value <= min + step ? min + step : value);
    this.init();
  }

  public setStep(value: number): void {
    this.model.setStep(value);
    this.init();
  }

  public setValueFrom(value: number): void {
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    const from = this.model.getFrom();
    const to = this.model.getTo();
    const isInterval = this.model.isInterval();

    this.view.setupPositionFromByValue(value, min, max, step, to);
    this.view.calculateValueFrom(min, max, step, isInterval, from, to);
    this.view.updateProgress(isInterval);
  }

  public setValueTo(value: number): void {
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    const isInterval = this.model.isInterval();
    const from = this.model.getFrom();
    const to = this.model.getTo();

    if (isInterval) {
      this.view.setupPositionToByValue(value, min, max, step, from);
      this.view.calculateValueTo(min, max, step, isInterval, from, to);
      this.view.updateProgress(true);
    }
  }

  public setScale(value: boolean): void {
    this.view.setIsVisibleScale(value);
    if (value) {
      this.view.showScale();
    } else {
      this.view.hideScale();
    }
  }

  public setPointerValue(value: boolean): void {
    this.view.setIsVisibleValue(value);

    if (value) {
      this.view.showPointerFromValue();

      if (this.model.isInterval()) {
        this.view.showPointerToValue();
      } else {
        this.view.hidePointerToValue();
      }
    } else {
      this.view.hidePointerFromValue();
      this.view.hidePointerToValue();
    }
  }

  public setHasInterval(value: boolean): void {
    this.model.setInterval(value);

    if (value) {
      const from = this.model.getFrom();
      const to = this.model.getTo();
      const step = this.model.getStep();
      const max = this.model.getMax();

      if (from === max) {
        this.model.setFrom(max - step);
        this.model.setTo(max);
        this.setValueFrom(max - step);
        this.setValueTo(max);
      } else if (from >= to) {
        this.model.setTo(from + step);
        this.setValueTo(from + step);
      }
      this.view.showPointerTo();

      if (this.view.isVisibleValue()) {
        this.view.showPointerToValue();
      } else {
        this.view.hidePointerToValue();
      }
    } else {
      this.view.hidePointerTo();
      this.view.hidePointerToValue();
    }
    const isInterval = this.model.isInterval();
    this.view.updateProgress(isInterval);
  }

  public setIsVerticalOrientation(value: boolean): void {
    this.view.setIsVertical(value);
    this.init();
  }

  public setValueFromListener(listener: (value: number) => void): void {
    this.model.attachValueFrom(listener);
  }

  public setMinListener(listener: (value: number) => void): void {
    this.model.attachMin(listener);
  }

  public setMaxListener(listener: (value: number) => void): void {
    this.model.attachMax(listener);
  }

  public setValueToListener(listener: (value: number) => void): void {
    this.model.attachValueTo(listener);
  }

  public setStepListener(listener: (value: number) => void): void {
    this.model.attachStep(listener);
  }

  private setupView() {
    this.view.setIsVertical(this.view.isVerticalOrientation());
    this.view.setValueFrom(this.model.getFrom());
    this.view.setValueTo(this.model.getTo());
    this.view.setValueFromListener((value) => this.model.setFrom(value));
    this.view.setValueToListener((value) => this.model.setTo(value));
    this.view.setScaleClickListener((value) => this.setupPositionByScaleClick(value));
    this.view.setSliderBarClickListener((x, y) => this.setupPositionBySliderBarClick(x, y));
    this.view.setPointerPositionListener((isFromPointer, x, y) => this.setPointerPosition(isFromPointer, x, y));
  }

  private setupPositionByScaleClick(value: number): void {
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    const from = this.model.getFrom();
    const to = this.model.getTo();
    this.view.setPositionByScaleClick(value, min, max, step, from, to);
  }

  private setupPositionBySliderBarClick(x: number, y: number): void {
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    const from = this.model.getFrom();
    const to = this.model.getTo();
    this.view.setPositionBySliderBarClick(x, y, min, max, step, from, to);
  }

  private setPointerPosition(isFromPointer: boolean, x: number, y: number): void {
    const min = this.model.getMin();
    const max = this.model.getMax();
    const step = this.model.getStep();
    const from = this.model.getFrom();
    const to = this.model.getTo();
    this.view.setPointerPosition(isFromPointer, x, y, min, max, step, from, to);
  }

  private observeValues() {
    this.model.attachValueFrom((value: number): void => { this.view.setValueFrom(value); });
    this.model.attachValueTo((value: number): void => { this.view.setValueTo(value); });
  }
}

export default Presenter;
