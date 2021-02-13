interface MainView {

  setMin(value: number): void;
  setMax(value: number): void;
  setStep(value: number): void;
  setIsVertical(value: boolean): void;
  setHasScale(value: boolean): void;
  setHasValue(value: boolean): void;
  setIsInterval(value: boolean): void;

  clear(): void;
  setupScale(min: number, max: number, step: number): void;
  initPointerFrom(value: number, min: number, max: number, step: number): void;
  initPointerTo(value: number, isInterval: boolean, min: number, max: number, step: number): void;
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
  setupPositionFromByValue(value: number, min: number, max: number): void;
  setupPositionToByValue(value: number, min: number, max: number): void;
  calculateValueFrom(min: number, max: number, step: number): void;
  calculateValueTo(min: number, max: number, step: number): void;
  setValueFrom(value: number): void;
  setValueTo(value: number): void;
  setValueFromListener(listener: (value: number) => void): void;
  setValueToListener(listener: (value: number) => void): void;
}

export default MainView;
