import Configuration from '../model/Configuration';
import Model from '../model/Model';
import Subject from '../model/Subject';
import MainView from '../view/MainView/MainView';

class Presenter2 {
  private readonly model: Model;

  private readonly view: MainView;

  private isVertical: Subject<boolean>;

  private hasValue: Subject<boolean>;

  private hasScale: Subject<boolean>;

  constructor(model: Model, view: MainView, configuration: Configuration) {
    this.model = model;
    this.view = view;
    this.isVertical = new Subject(configuration.isVertical);
    this.hasValue = new Subject(configuration.hasValue);
    this.hasScale = new Subject(configuration.hasScale);
  }

  private setupView() {
    this.view.setMin(this.model.getMin());
    this.view.setMax(this.model.getMax());
    this.view.setStep(this.model.getStep());
    this.view.setIsVertical(this.isVertical.getValue());
    this.view.setHasScale(this.hasScale.getValue());
    this.view.setHasValue(this.hasValue.getValue());
    this.view.setIsInterval(this.model.isInterval());
    this.view.setValueFrom(this.model.getFrom());
    this.view.setValueTo(this.model.getTo());
    this.view.setValueFromListener((value: number) => { this.model.setFrom(value); });
    this.view.setValueToListener((value: number) => { this.model.setTo(value); });
  }

  private observeValues() {
    this.model.attachMin((value: number): void => { this.view.setMin(value); });
    this.model.attachMax((value: number): void => { this.view.setMax(value); });
    this.model.attachStep((value: number): void => { this.view.setStep(value); });
    this.model.attachValueFrom((value: number): void => { this.view.setValueFrom(value); });
    this.model.attachValueTo((value: number): void => { this.view.setValueTo(value); });
    this.model.attachInterval((value: boolean): void => { this.view.setIsInterval(value); });
    this.isVertical.attach((value: boolean): void => { this.view.setIsVertical(value); });
    this.hasValue.attach((value: boolean): void => { this.view.setHasValue(value); });
    this.hasScale.attach((value: boolean): void => { this.view.setHasScale(value); });
  }

  init(): void {
    this.view.clear();
    this.setupView();

    if (this.isVertical.getValue()) {
      this.view.drawVertical();
    } else {
      this.view.drawHorizontal();
    }
    this.view.setupScale();

    if (!this.hasScale.getValue()) {
      this.view.hideScale();
    }
    const from = this.model.getFrom();
    const to = this.model.getTo();
    this.view.initPointerFrom(from);
    this.view.initPointerTo(to);
    this.view.updateProgress();
    this.view.handleSliderBarClick();
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
    this.view.setupPositionFromByValue(value);
    this.view.calculateValueFrom();
    this.view.updateProgress();
  }

  public setValueTo(value: number): void {
    if (this.model.isInterval()) {
      this.view.setupPositionToByValue(value);
      this.view.calculateValueTo();
      this.view.updateProgress();
    }
  }

  public setScale(value: boolean): void {
    this.hasScale.setValue(value);
    if (value) {
      this.view.showScale();
    } else {
      this.view.hideScale();
    }
  }

  public setPointerValue(value: boolean): void {
    this.hasValue.setValue(value);

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

      if (this.hasValue.getValue()) {
        this.view.showPointerToValue();
      } else {
        this.view.hidePointerToValue();
      }
    } else {
      this.view.hidePointerTo();
      this.view.hidePointerToValue();
    }
    this.view.updateProgress();
  }

  public setIsVerticalOrientation(value: boolean): void {
    this.isVertical.setValue(value);
    this.init();
  }

  setValueFromListener(listener: (value: number) => void): void {
    this.model.attachValueFrom(listener);
  }

  setMinListener(listener: (value: number) => void): void {
    this.model.attachMin(listener);
  }

  setMaxListener(listener: (value: number) => void): void {
    this.model.attachMax(listener);
  }

  setValueToListener(listener: (value: number) => void): void {
    this.model.attachValueTo(listener);
  }

  setStepListener(listener: (value: number) => void): void {
    this.model.attachStep(listener);
  }
}

export default Presenter2;
