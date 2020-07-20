import Configuration from './Configuration';
import Subject from './Subject';

class Model {
  private min: Subject<number>;

  private max: Subject<number>;

  private step: Subject<number>;

  private from: Subject<number>;

  private to: Subject<number>;

  private isVertical: Subject<boolean>;

  private hasInterval: Subject<boolean>;

  private hasPointer: Subject<boolean>;

  private hasScale: Subject<boolean>;

  constructor(public configuration: Configuration) {
    Model.validateConfiguration(configuration);
    this.min = new Subject(configuration.min);
    this.max = new Subject(configuration.max);
    this.step = new Subject(configuration.step);
    this.from = new Subject(configuration.from);
    this.to = new Subject(configuration.to);
    this.isVertical = new Subject(configuration.isVertical);
    this.hasInterval = new Subject(configuration.hasInterval);
    this.hasPointer = new Subject(configuration.hasPointer);
    this.hasScale = new Subject(configuration.hasScale);
  }

  private static validateConfiguration(configuration: Configuration): void {
    if (configuration.min >= configuration.max) {
      throw new Error('Min must be less than max!');
    }
    if (configuration.step <= 0) {
      throw new Error('Step must be more than 0!');
    }
    if (configuration.step > configuration.max - configuration.min) {
      throw new Error('Step must be less than max - min!');
    }
    if (configuration.from < configuration.min || configuration.from > configuration.max) {
      throw new Error('CurrentValueFrom must be less than max, but more than min!');
    }
    if (configuration.to < configuration.min || configuration.to > configuration.max) {
      throw new Error('CurrentValueTo must be less than max, but more than min!');
    }
    if (configuration.to < configuration.from) {
      throw new Error('CurrentValueTo must be more than currentValueFrom!');
    }
  }

  attachMin(observer: (value: number) => void): void {
    this.min.attach(observer);
  }

  attachMax(observer: (value: number) => void): void {
    this.max.attach(observer);
  }

  attachStep(observer: (value: number) => void): void {
    this.step.attach(observer);
  }

  attachValueFrom(observer: (value: number) => void): void {
    this.from.attach(observer);
  }

  attachValueTo(observer: (value: number) => void): void {
    this.to.attach(observer);
  }

  attachOrientation(observer: (value: boolean) => void): void {
    this.isVertical.attach(observer);
  }

  attachInterval(observer: (value: boolean) => void): void {
    this.hasInterval.attach(observer);
  }

  attachPointer(observer: (value: boolean) => void): void {
    this.hasPointer.attach(observer);
  }

  attachScale(observer: (value: boolean) => void): void {
    this.hasScale.attach(observer);
  }

  setMin(value: number): void {
    const max = this.max.getValue();
    let from = this.from.getValue();
    const to = this.to.getValue();
    const step = this.step.getValue();

    if (value > max) {
      this.min.setValue(max);
    } else {
      this.min.setValue(value);
    }
    const min = this.min.getValue();

    if (from < min) {
      this.from.setValue(min);
    }
    from = this.from.getValue();

    if (to < from) {
      this.to.setValue(from);
    }
    if (min <= max && max - min < step) {
      this.step.setValue(max - min);
    }
    if (value > max) {
      this.min.setValue(max);
    }
  }

  setMax(value: number): void {
    const min = this.min.getValue();
    const from = this.from.getValue();
    const to = this.to.getValue();
    const step = this.step.getValue();

    if (value > to) {
      this.max.setValue(value);
    } else {
      this.to.setValue(value);
      this.max.setValue(value);
    }
    if (value < from) {
      this.from.setValue(value);
    }
    if (value > min && value - min < step) {
      this.step.setValue(value - min);
    }
  }

  setStep(value: number): void {
    if (value <= 0) {
      throw new Error('Step must be > 0!');
    }
    const min = this.min.getValue();
    const max = this.max.getValue();
    this.step.setValue(max - min > value ? value : max - min);
  }

  setFrom(value: number): void {
    const max = this.max.getValue();
    const step = this.step.getValue();
    const to = this.to.getValue();
    const from = Math.round(value / step) * step;
    const hasInterval = this.hasInterval.getValue();

    if (hasInterval) {
      if (value > to) {
        this.from.setValue(to);
      } else {
        this.from.setValue(from);
      }
    } else if (value > max) {
      this.from.setValue(max);
    } else {
      this.from.setValue(from);
    }
  }

  setTo(value: number): void {
    const max = this.max.getValue();
    const from = this.from.getValue();
    const step = this.step.getValue();
    const to = Math.round(value / step) * step;

    if (value < from) {
      this.to.setValue(from);
    } else {
      this.to.setValue(to);
    }
    if (value > max) {
      this.to.setValue(max);
    }
  }

  setVertical(value: boolean): void {
    this.isVertical.setValue(value);
  }

  setInterval(value: boolean): void {
    this.hasInterval.setValue(value);
  }

  setPointer(value: boolean): void {
    this.hasPointer.setValue(value);
  }

  setScale(value: boolean): void {
    this.hasScale.setValue(value);
  }
}

export default Model;
