interface SliderView {
  clear(): void;
  drawHorizontal(): void;
  drawVertical(): void;
  getBoundLeft(): number;
  getBoundTop(): number;
  getBoundRight(): number;
  getBoundBottom(): number;
  getWidth(): number;
  getHeight(): number;
}

export default SliderView;
