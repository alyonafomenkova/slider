import Configuration from './Configuration';
import Subject from './Subject';

class Model {
  private min: Subject<number>;

  private max: Subject<number>;

  private step: Subject<number>;

  private from: Subject<number>;

  private to: Subject<number>;

  private hasInterval: Subject<boolean>;

  constructor(configuration: Configuration) {
    Model.validateConfiguration(configuration);
    this.min = new Subject(configuration.min);
    this.max = new Subject(configuration.max);
    this.step = new Subject(configuration.step);
    this.from = new Subject(configuration.from);
    this.to = new Subject(configuration.to);
    this.hasInterval = new Subject(configuration.hasInterval);
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

  attachInterval(observer: (value: boolean) => void): void {
    this.hasInterval.attach(observer);
  }

  getMin(): number {
    return this.min.getValue();
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

  getMax(): number {
    return this.max.getValue();
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

  getStep(): number {
    return this.step.getValue();
  }

  setStep(value: number): void {
    if (value <= 0) {
      throw new Error('Step must be > 0!');
    }
    const min = this.min.getValue();
    const max = this.max.getValue();
    this.step.setValue(max - min > value ? value : max - min);
  }

  getFrom(): number {
    return this.from.getValue();
  }

  setFrom(value: number): void {
    const min = this.min.getValue();
    const max = this.max.getValue();
    const to = this.to.getValue();
    const hasInterval = this.hasInterval.getValue();

    if (value > max) {
      this.from.setValue(max);
    } else if (value < min) {
      this.from.setValue(min);
    } else {
      this.from.setValue(value);
    }
    if (hasInterval) { // TODO поправить тесты
      if (value === to) {
        throw new Error('From must be < to!');
      }
      if (value > to) {
        this.from.setValue(to);
      } else {
        this.from.setValue(value);
      }
    }
  }

  getTo(): number {
    return this.to.getValue();
  }

  setTo(value: number): void {
    const min = this.min.getValue();
    const max = this.max.getValue();
    const from = this.from.getValue();
    const hasInterval = this.hasInterval.getValue();

    if (value > max) {
      this.to.setValue(max);
    } else if (value < min) {
      this.to.setValue(min);
    } else {
      this.to.setValue(value);
    }

    if (hasInterval) { // TODO поправить тесты
      if (value === from) {
        throw new Error('To must be > from!');
      }
      if (value < from) {
        this.to.setValue(from);
      } else {
        this.to.setValue(value);
      }
    }
  }

  isInterval(): boolean {
    return this.hasInterval.getValue();
  }

  setInterval(value: boolean): void {
    this.hasInterval.setValue(value);
  }
}

export default Model;
