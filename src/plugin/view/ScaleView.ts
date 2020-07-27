interface ScaleView {
  clear(): void;
  draw(min: number, max: number, isVertical: boolean): void;
}

export default ScaleView;
