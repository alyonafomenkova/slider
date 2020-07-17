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
    this.min.attach(observer);
  }

  attachMax(observer: (value: number) => void) {
    this.max.attach(observer);
  }

  attachStep(observer: (value: number) => void) {
    this.step.attach(observer);
  }

  attachValueFrom(observer: (value: number) => void) {
    this.currentValueFrom.attach(observer);
  }

  attachValueTo(observer: (value: number) => void) {
    this.currentValueTo.attach(observer);
  }

  // attachOrientation(observer: (value: boolean) => void) {
  //   this.isVertical.attach(observer);
  // }
  //
  // attachInterval(observer: (value: boolean) => void) {
  //   this.hasInterval.attach(observer);
  // }
  //
  // attachPointer(observer: (value: boolean) => void) {
  //   this.hasPointer.attach(observer);
  // }
  //
  // attachScale(observer: (value: boolean) => void) {
  //   this.hasScale.attach(observer);
  // }

  setMin(value: number) {
    const max = this.max.getValue();
    let from = this.currentValueFrom.getValue();
    const to = this.currentValueTo.getValue();
    const step = this.step.getValue();

    if (value > max) {
      this.min.setValue(max);
    } else {
      this.min.setValue(value);
    }
    const min = this.min.getValue();

    if (from < min) {
      this.currentValueFrom.setValue(min);
    }
    from = this.currentValueFrom.getValue();

    if (to < from) {
      this.currentValueTo.setValue(from);
    }
    if (min <= max && max - min < step) {
      this.step.setValue(max - min);
    }
    if (value > max) {
      this.min.setValue(max);
    }
  }

  // setMax(value: number) {
  //   // TODO: доделать валидацию, тесты
  //   const min = this.min.getValue();
  //   value >= min ? this.max.setValue(value) : this.max.setValue(min);
  // }
  //
  // setStep(value: number) {
  //   // TODO: доделать валидацию, тесты
  //   const min = this.min.getValue();
  //   const max = this.max.getValue();
  //   const step = this.step.getValue();
  //   if (value >= min && value <= max) {
  //     this.max.setValue(step);
  //   }
  // }
  //
  // setValueFrom(value: number) {
  //   // TODO: доделать валидацию, тесты
  //   this.currentValueFrom.setValue(value);
  // }
  //
  // setValueTo(value: number) {
  //   // TODO: доделать валидацию, тесты
  //   this.currentValueTo.setValue(value);
  // }
  //
  // setOrientation(value: boolean) {
  //   // TODO: доделать валидацию, тесты
  //   this.isVertical.setValue(value);
  // }
  //
  // setInterval(value: boolean) {
  //   // TODO: доделать валидацию, тесты
  //   this.hasInterval.setValue(value);
  // }
  //
  // setPointer(value: boolean) {
  //   // TODO: доделать валидацию, тесты
  //   this.hasPointer.setValue(value);
  // }
  //
  // setScale(value: boolean) {
  //   // TODO: доделать валидацию, тесты
  //   this.hasScale.setValue(value);
  // }
}

export default Model;
