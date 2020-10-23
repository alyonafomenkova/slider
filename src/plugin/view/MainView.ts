interface MainView {
  clear(): void;
  setupScale(): void;
  initPointerFrom(): void;
  initPointerTo(): void;
  handleSliderBarClick(): void;
  updateProgress(): void;
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
  setupPositionFromByValue(value: number): void;
  setupPositionToByValue(value: number): void;
  calculateValueFrom(): void;
  calculateValueTo(): void;
  setValueFrom(value: number): void;
  setValueTo(value: number): void;
  setMin(value: number): void;
  setMax(value: number): void;
  setStep(value: number): void;
  setIsInterval(isInterval: boolean): void;
  setIsVertical(isVertical: boolean): void;
  setHasScale(hasScale: boolean): void;
  setHasValue(hasValue: boolean): void;
  setValueFromListener(listener: (value: number) => void): void;
  setValueToListener(listener: (value: number) => void): void;
}

export default MainView;
