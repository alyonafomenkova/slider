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
    const { min, max, step, from, to } = configuration;
    const isCorrectFrom = from >= min && from <= max;
    const isCorrectTo = to > min && to <= max;

    if (min >= max) {
      throw new Error('Min must be less than max!');
    }
    if (step <= 0) {
      throw new Error('Step must be more than 0!');
    }
    if (step > max - min) {
      throw new Error('Step must be less than max - min!');
    }
    if (!isCorrectFrom) {
      throw new Error('CurrentValueFrom must be less than max, but more than min!');
    }
    if (!isCorrectTo) {
      throw new Error('CurrentValueTo must be less than max, but more than min!');
    }
    if (to < from) {
      throw new Error('CurrentValueTo must be more than currentValueFrom!');
    }
  }

  public attachMin(observer: (value: number) => void): void {
    this.min.attach(observer);
  }

  public attachMax(observer: (value: number) => void): void {
    this.max.attach(observer);
  }

  public attachStep(observer: (value: number) => void): void {
    this.step.attach(observer);
  }

  public attachValueFrom(observer: (value: number) => void): void {
    this.from.attach(observer);
  }

  public attachValueTo(observer: (value: number) => void): void {
    this.to.attach(observer);
  }

  public attachInterval(observer: (value: boolean) => void): void {
    this.hasInterval.attach(observer);
  }

  public getMin(): number {
    return this.min.getValue();
  }

  public setMin(value: number): void {
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
    const isIntervalLessThanStep = min <= max && max - min < step;

    if (from < min) {
      this.from.setValue(min);
    }
    from = this.from.getValue();

    if (to < from) {
      this.to.setValue(from);
    }

    if (isIntervalLessThanStep) {
      this.step.setValue(max - min);
    }
    if (value > max) {
      this.min.setValue(max);
    }
  }

  public getMax(): number {
    return this.max.getValue();
  }

  public setMax(value: number): void {
    const min = this.min.getValue();
    const from = this.from.getValue();
    const to = this.to.getValue();
    const step = this.step.getValue();
    const isIntervalLessThanStep = value > min && value - min < step;

    if (value > to) {
      this.max.setValue(value);
    } else {
      this.to.setValue(value);
      this.max.setValue(value);
    }
    if (value < from) {
      this.from.setValue(value);
    }
    if (isIntervalLessThanStep) {
      this.step.setValue(value - min);
    }
  }

  public getStep(): number {
    return this.step.getValue();
  }

  public setStep(value: number): void {
    const min = Math.abs(this.min.getValue());
    const max = Math.abs(this.max.getValue());
    if (value <= 0) {
      const isInteger = Number.isInteger(max - min);
      this.step.setValue(isInteger ? 1 : (max - min) / 10);
    } else {
      this.step.setValue(max - min > value ? value : max - min);
    }
  }

  public getFrom(): number {
    return this.from.getValue();
  }

  public setFrom(value: number): void {
    const min = this.min.getValue();
    const max = this.max.getValue();
    const to = this.to.getValue();
    const step = this.step.getValue();
    const hasInterval = this.hasInterval.getValue();

    if (value > max) {
      this.from.setValue(max);
    } else if (value < min) {
      this.from.setValue(min);
    } else {
      this.from.setValue(value);
    }
    if (hasInterval) {
      if (value < min) {
        this.from.setValue(min);
      } else if (value === to) {
        this.from.setValue(to - step);
      } else if (value > to) {
        this.from.setValue(to);
      } else {
        this.from.setValue(value);
      }
    }
  }

  public getTo(): number {
    return this.to.getValue();
  }

  public setTo(value: number): void {
    const min = this.min.getValue();
    const max = this.max.getValue();
    const from = this.from.getValue();
    const step = this.step.getValue();
    const hasInterval = this.hasInterval.getValue();

    if (value > max) {
      this.to.setValue(max);
    } else if (value < min) {
      this.to.setValue(min);
    } else {
      this.to.setValue(value);
    }

    if (hasInterval) {
      if (value > max) {
        this.to.setValue(max);
      } else if (value === from) {
        this.to.setValue(from + step);
      } else if (value < from) {
        this.to.setValue(from);
      } else {
        this.to.setValue(value);
      }
    }
  }

  public isInterval(): boolean {
    return this.hasInterval.getValue();
  }

  public setInterval(value: boolean): void {
    this.hasInterval.setValue(value);
  }
}

export default Model;
