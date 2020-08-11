interface PointerView {
  show(): void;
  hide(): void;
  showValue(): void;
  hideValue(): void;
  draw(hasValue: boolean): void;
  setX(value: number): void;
  setY(value: number): void;
  setValue (value: number): void;
  getWidth(): number;
  getHeight(): number;
  getLeft(): number;
  getTop(): number;
  setDownEventListener(listener: (view: PointerView, x: number, y: number) => void): void;
  setMoveEventListener(listener: (view: PointerView, x: number, y: number) => void): void;
  setUpEventListener(listener: (view: PointerView, x: number, y: number) => void): void;
}

export default PointerView;
