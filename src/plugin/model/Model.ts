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
    this.validateConfigaration(configuration);
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

  private validateConfigaration(configuration: Configuration): void {
    if (configuration.min >= configuration.max) {
      throw new Error(`Min must be less than max!`);
    }
    if (configuration.step <= 0) {
      throw new Error(`Step must be more than 0!`);
    }
    if (configuration.step > configuration.max - configuration.min) {
      throw new Error(`Step must be less than max - min!`);
    }
    if (configuration.currentValueFrom < configuration.min || configuration.currentValueFrom > configuration.max) {
      throw new Error(`CurrentValueFrom must be less than max, but more than min!`);
    }
    if (configuration.currentValueTo < configuration.min || configuration.currentValueTo > configuration.max) {
      throw new Error(`CurrentValueTo must be less than max, but more than min!`);
    }
    if (configuration.currentValueTo < configuration.currentValueFrom) {
      throw new Error(`CurrentValueTo must be more than currentValueFrom!`);
    }
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

  attachOrientation(observer: (value: boolean) => void) {
    this.isVertical.attach(observer);
  }

  attachInterval(observer: (value: boolean) => void) {
    this.hasInterval.attach(observer);
  }

  attachPointer(observer: (value: boolean) => void) {
    this.hasPointer.attach(observer);
  }

  attachScale(observer: (value: boolean) => void) {
    this.hasScale.attach(observer);
  }

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

  setMax(value: number) {
    const min = this.min.getValue();
    const from = this.currentValueFrom.getValue();
    const to = this.currentValueTo.getValue();
    const step = this.step.getValue();

    if (value > to) {
      this.max.setValue(value);
    } else {
      this.currentValueTo.setValue(value);
      this.max.setValue(value);
    }
    if (value < from) {
      this.currentValueFrom.setValue(value);
    }
    if (value > min && value - min < step) {
      this.step.setValue(value - min);
    }
  }

  setStep(value: number) {
    if (value <= 0) {
      throw new Error("Step must be > 0!");
    }
    const min = this.min.getValue();
    const max = this.max.getValue();
    this.step.setValue(max - min > value ? value : max - min);
  }

  setFrom(value: number) {
    const max = this.max.getValue();
    const step = this.step.getValue();
    const to = this.currentValueTo.getValue();
    const from = Math.round(value / step) * step;
    const hasInterval = this.hasInterval.getValue();

    if (hasInterval) {
      if (value > to) {
        this.currentValueFrom.setValue(to)
      } else {
        this.currentValueFrom.setValue(from);
      }
    } else {
      if (value > max) {
        this.currentValueFrom.setValue(max);
      } else {
        this.currentValueFrom.setValue(from);
      }
    }
  }

  setTo(value: number) {
    const max = this.max.getValue();
    const from = this.currentValueFrom.getValue();
    const step =  this.step.getValue();
    const to = Math.round(value / step) * step;

    if (value < from) {
      this.currentValueTo.setValue(from);
    } else {
      this.currentValueTo.setValue(to);
    }
    if (value > max) {
      this.currentValueTo.setValue(max);
    }
  }

  setVertical(value: boolean) {
    this.isVertical.setValue(value);
  }

  setInterval(value: boolean) {
    this.hasInterval.setValue(value);
  }

  setPointer(value: boolean) {
    this.hasPointer.setValue(value);
  }

  setScale(value: boolean) {
    this.hasScale.setValue(value);
  }
}

export default Model;
