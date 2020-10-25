class ViewModel {
  private min = 0;

  private max = 0;

  private valueFrom = 0;

  private valueTo = 0;

  private step = 0;

  private isInterval = false;

  private isVertical = false;

  private hasScale = false;

  private hasValue = false;

  setMin(value: number): void {
    this.min = value;
  }

  getMin(): number {
    return this.min;
  }

  setMax(value: number): void {
    this.max = value;
  }

  getMax(): number {
    return this.max;
  }

  setStep(value: number): void {
    this.step = value;
  }

  getStep(): number {
    return this.step;
  }

  setValueFrom(value: number): void {
    this.valueFrom = value;
  }

  getValueFrom(): number {
    return this.valueFrom;
  }

  setValueTo(value: number): void {
    this.valueTo = value;
  }

  getValueTo(): number {
    return this.valueTo;
  }

  setIsInterval(value: boolean): void {
    this.isInterval = value;
  }

  getIsInterval(): boolean {
    return this.isInterval;
  }

  setIsVertical(isVertical: boolean): void {
    this.isVertical = isVertical;
  }

  getIsVertical(): boolean {
    return this.isVertical;
  }

  setHasScale(hasScale: boolean): void {
    this.hasScale = hasScale;
  }

  getHasScale(): boolean {
    return this.hasScale;
  }

  setHasValue(hasValue: boolean): void {
    this.hasValue = hasValue;
  }

  getHasValue(): boolean {
    return this.hasValue;
  }
}

export default ViewModel;
