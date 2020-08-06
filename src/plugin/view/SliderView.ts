interface SliderView {
  clear(): void;
  drawHorizontal(): void;
  drawVertical(): void;
  drawHorizontalProgress(left: number, width: number): void;
  drawVerticalProgress(bottom: number, height: number): void;
  getBoundLeft(): number;
  getBoundTop(): number;
  getBoundRight(): number;
  getBoundBottom(): number;
  getWidth(): number;
  getHeight(): number;
}

export default SliderView;
