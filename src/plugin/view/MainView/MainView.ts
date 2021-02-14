interface MainView {
  clear(): void;
  setIsVertical(value: boolean): void;
  isVerticalOrientation(): boolean;
  setupScale(min: number, max: number, step: number): void;
  initPointerFrom(
    value: number,
    min: number, max: number, step: number,
    isInterval: boolean,
    to: number, hasValue: boolean,
  ): void;
  initPointerTo(
    value: number,
    isInterval: boolean,
    min: number, max: number, step: number,
    from: number, hasValue: boolean
  ): void;
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
  setPositionByScaleClick(value: number, min: number, max: number, step: number, from: number, to: number): void;
  setPointerPosition(
    isFromPointer: boolean,
    x: number, y: number,
    min: number, max: number, step: number,
    from: number, to: number,
  ): void;
  setPositionBySliderBarClick(
    x: number, y: number,
    min: number, max: number, step: number,
    from: number, to: number,
  ): void;
  setValueFromListener(listener: (value: number) => void): void;
  setValueToListener(listener: (value: number) => void): void;
  setScaleClickListener(listener: (value: number) => void): void;
  setSliderBarClickListener(listener: (x: number, y: number) => void): void;
  setPointerPositionListener(listener: (isFromPointer: boolean, x: number, y: number) => void): void;
}

export default MainView;
