class Subject<T> {
  private observers: ((value: T) => void) [] = [];

  private lastValue: T;

  constructor(value: T) {
    this.lastValue = value;
  }

  public getValue(): T {
    return this.lastValue;
  }

  public setValue(value: T): void {
    this.lastValue = value;
    this.observers.forEach((observer) => {
      observer(value);
    });
  }

  public attach(observer: (value: T) => void): void {
    if (this.observers.includes(observer)) {
      // eslint-disable-next-line no-console
      console.log('Observer already attached.');
    } else {
      this.observers.push(observer);
      observer(this.lastValue);
    }
  }

  public detach(observer: (value: T) => void): void {
    const index = this.observers.indexOf(observer);

    if (index === -1) {
      // eslint-disable-next-line no-console
      console.log('Observer not found.');
    } else {
      this.observers.splice(index, 1);
    }
  }
}

export default Subject;
