class Subject<T> {
  private observers: ((value: T) => void) [] = [];
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  setValue(value: T) {
    this.value = value;
    this.observers.forEach((observer) => {
      observer(value);
    });
  }

  attach(observer: (value: T) => void) {
    if (this.observers.includes(observer)) {
      console.log('Observer already attached.');
    } else {
      this.observers.push(observer);
      observer(this.value);
    }
  }

  detach(observer: (value: T) => void) {
    const index = this.observers.indexOf(observer);

    if (index === -1) {
      console.log('Observer not found.');
    } else {
      this.observers.splice(index, 1);
    }
  }
}

export default Subject;
