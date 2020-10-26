import Configuration from '../model/Configuration';
import Model from '../model/Model';
import Subject from '../model/Subject';
import MainView from '../view/MainView/MainView';
import ViewModel from '../view/MainView/ViewModel';

class Presenter {
  private readonly model: Model;

  private readonly view: MainView;

  private readonly viewModel: ViewModel;

  private isVertical: Subject<boolean>;

  private hasValue: Subject<boolean>;

  private hasScale: Subject<boolean>;

  constructor(model: Model, view: MainView, viewModel: ViewModel, configuration: Configuration) {
    this.model = model;
    this.view = view;
    this.viewModel = viewModel;
    this.isVertical = new Subject(configuration.isVertical);
    this.hasValue = new Subject(configuration.hasValue);
    this.hasScale = new Subject(configuration.hasScale);
  }

  private setupView() {
    this.viewModel.setMin(this.model.getMin());
    this.viewModel.setMax(this.model.getMax());
    this.viewModel.setStep(this.model.getStep());
    this.viewModel.setIsVertical(this.isVertical.getValue());
    this.viewModel.setHasScale(this.hasScale.getValue());
    this.viewModel.setHasValue(this.hasValue.getValue());
    this.viewModel.setIsInterval(this.model.isInterval());
    this.view.setValueFrom(this.model.getFrom());
    this.view.setValueTo(this.model.getTo());
    this.view.setValueFromListener((value: number) => { this.model.setFrom(value); });
    this.view.setValueToListener((value: number) => { this.model.setTo(value); });
  }

  private observeValues() {
    this.model.attachMin((value: number): void => { this.viewModel.setMin(value); });
    this.model.attachMax((value: number): void => { this.viewModel.setMax(value); });
    this.model.attachStep((value: number): void => { this.viewModel.setStep(value); });
    this.model.attachValueFrom((value: number): void => { this.view.setValueFrom(value); });
    this.model.attachValueTo((value: number): void => { this.view.setValueTo(value); });
    this.model.attachInterval((value: boolean): void => { this.viewModel.setIsInterval(value); });
    this.isVertical.attach((value: boolean): void => { this.viewModel.setIsVertical(value); });
    this.hasValue.attach((value: boolean): void => { this.viewModel.setHasValue(value); });
    this.hasScale.attach((value: boolean): void => { this.viewModel.setHasScale(value); });
  }

  public init(): void {
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
}

export default Presenter;
