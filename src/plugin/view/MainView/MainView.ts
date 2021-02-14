interface MainView {

  setMin(value: number): void;
  setMax(value: number): void;
  setStep(value: number): void;
  setIsVertical(value: boolean): void;
  setHasScale(value: boolean): void;
  setHasValue(value: boolean): void;

  clear(): void;
  setupScale(min: number, max: number, step: number): void;
  initPointerFrom(
    value: number,
    min: number, max: number, step: number,
    isInterval: boolean,
    to: number,
  ): void;
  initPointerTo(
    value: number,
    isInterval: boolean,
    min: number, max: number, step: number,
    from: number,
  ): void;
  handleSliderBarClick(): void;
  updateProgress(isInterval: boolean): void;
  drawVertical(): void;
  drawHorizontal(): void;
  showScale(): void;
  hideScale(): void;
  showPointerFromValue(): void;
  hidePointerFromValue(): void;
  showPointerToValue(): void;
  hidePointerToValue(): void;
  showPointerTo(): void;
  hidePointerTo(): void;
  setupPositionFromByValue(value: number, min: number, max: number, step: number, to: number): void;
  setupPositionToByValue(value: number, min: number, max: number, step: number, from: number): void;
  calculateValueFrom(min: number, max: number, step: number, isInterval: boolean, from: number, to: number): void;
  calculateValueTo(min: number, max: number, step: number, isInterval: boolean, from: number, to: number): void;
  setValueFrom(value: number): void;
  setValueTo(value: number): void;
  setPositionByValue(value: number, min: number, max: number, step: number, from: number, to: number): void;
  setValueFromListener(listener: (value: number) => void): void;
  setValueToListener(listener: (value: number) => void): void;
  setScaleClickListener(listener: (value: number) => void): void;
}

export default MainView;
