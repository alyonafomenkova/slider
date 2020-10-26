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

  public setMin(value: number): void {
    this.min = value;
  }

  public getMin(): number {
    return this.min;
  }

  public setMax(value: number): void {
    this.max = value;
  }

  public getMax(): number {
    return this.max;
  }

  public setStep(value: number): void {
    this.step = value;
  }

  public getStep(): number {
    return this.step;
  }

  public setValueFrom(value: number): void {
    this.valueFrom = value;
  }

  public getValueFrom(): number {
    return this.valueFrom;
  }

  public setValueTo(value: number): void {
    this.valueTo = value;
  }

  public getValueTo(): number {
    return this.valueTo;
  }

  public setIsInterval(value: boolean): void {
    this.isInterval = value;
  }

  public getIsInterval(): boolean {
    return this.isInterval;
  }

  public setIsVertical(isVertical: boolean): void {
    this.isVertical = isVertical;
  }

  public getIsVertical(): boolean {
    return this.isVertical;
  }

  public setHasScale(hasScale: boolean): void {
    this.hasScale = hasScale;
  }

  public getHasScale(): boolean {
    return this.hasScale;
  }

  public setHasValue(hasValue: boolean): void {
    this.hasValue = hasValue;
  }

  public getHasValue(): boolean {
    return this.hasValue;
  }
}

export default ViewModel;
