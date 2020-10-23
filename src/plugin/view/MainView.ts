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
}

export default MainView;
