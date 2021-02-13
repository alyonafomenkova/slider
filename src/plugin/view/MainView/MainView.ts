interface MainView {

  setMin(value: number): void;
  setMax(value: number): void;
  setStep(value: number): void;
  setIsVertical(value: boolean): void;
  setHasScale(value: boolean): void;
  setHasValue(value: boolean): void;
  setIsInterval(value: boolean): void;

  clear(): void;
  setupScale(): void;
  initPointerFrom(value: number): void;
  initPointerTo(value: number): void;
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
  setValueFromListener(listener: (value: number) => void): void;
  setValueToListener(listener: (value: number) => void): void;
}

export default MainView;
