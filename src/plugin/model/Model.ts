import Configuration from './Configuration';
import Subject from './Subject';

class Model {
  private min: Subject<number>;
  private max: Subject<number>;
  private step: Subject<number>;
  private currentValueFrom: Subject<number>;
  private currentValueTo: Subject<number>;
  private isVertical: Subject<boolean>;
  private hasInterval: Subject<boolean>;
  private hasPointer: Subject<boolean>;
  private hasScale: Subject<boolean>;

  constructor(public configuration: Configuration) {
    this.min = new Subject(configuration.min);
    this.max = new Subject(configuration.max);
    this.step = new Subject(configuration.step);
    this.currentValueFrom = new Subject(configuration.currentValueFrom);
    this.currentValueTo = new Subject(configuration.currentValueTo);
    this.isVertical = new Subject(configuration.isVertical);
    this.hasInterval = new Subject(configuration.hasInterval);
    this.hasPointer = new Subject(configuration.hasPointer);
    this.hasScale = new Subject(configuration.hasScale);
  }

  attachMin(observer: (value: number) => void) {
    observer(this.min.getValue());
  }

  attachMax(observer: (value: number) => void) {
    observer(this.max.getValue());
  }

  attachStep(observer: (value: number) => void) {
    observer(this.step.getValue());
  }

  attachValueFrom(observer: (value: number) => void) {
    observer(this.currentValueFrom.getValue());
  }

  attachValueTo(observer: (value: number) => void) {
    observer(this.currentValueTo.getValue());
  }

  attachOrientation(observer: (value: boolean) => void) {
    observer(this.isVertical.getValue());
  }

  attachInterval(observer: (value: boolean) => void) {
    observer(this.hasInterval.getValue());
  }

  attachPointer(observer: (value: boolean) => void) {
    observer(this.hasPointer.getValue());
  }

  attachScale(observer: (value: boolean) => void) {
    observer(this.hasScale.getValue());
  }

  setMin(value: number) {
    // TODO: доделать валидацию, тесты
    const max = this.max.getValue();
    value <= max ? this.min.setValue(value) : this.min.setValue(max);
  }

  setMax(value: number) {
    // TODO: доделать валидацию, тесты
    const min = this.min.getValue();
    value >= min ? this.max.setValue(value) : this.max.setValue(min);
  }

  setStep(value: number) {
    // TODO: доделать валидацию, тесты
    const min = this.min.getValue();
    const max = this.max.getValue();
    const step = this.step.getValue();
    if (value >= min && value <= max) {
      this.max.setValue(step);
    }
  }

  setValueFrom(value: number) {
    // TODO: доделать валидацию, тесты
    this.currentValueFrom.setValue(value);
  }

  setValueTo(value: number) {
    // TODO: доделать валидацию, тесты
    this.currentValueTo.setValue(value);
  }

  setOrientation(value: boolean) {
    // TODO: доделать валидацию, тесты
    this.isVertical.setValue(value);
  }

  setInterval(value: boolean) {
    // TODO: доделать валидацию, тесты
    this.hasInterval.setValue(value);
  }

  setPointer(value: boolean) {
    // TODO: доделать валидацию, тесты
    this.hasPointer.setValue(value);
  }

  setScale(value: boolean) {
    // TODO: доделать валидацию, тесты
    this.hasScale.setValue(value);
  }
}

export default Model;
