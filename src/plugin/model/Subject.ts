class Subject<T> {
  private observers: ((value: T) => void) [] = [];

  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
    this.observers.forEach((observer) => {
      observer(value);
    });
  }

  attach(observer: (value: T) => void): void {
    if (this.observers.includes(observer)) {
      // eslint-disable-next-line no-console
      console.log('Observer already attached.');
    } else {
      this.observers.push(observer);
      observer(this.value);
    }
  }

  detach(observer: (value: T) => void): void {
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
