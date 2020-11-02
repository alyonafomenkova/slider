import ScaleItem from './ScaleItem';

interface ScaleView {
  show(): void;
  hide(): void;
  addScaleItems(scaleItems: Array<ScaleItem>, isVertical: boolean): void;
  setClickListener(listener: (view: ScaleView, value: number) => void): void;
}

export default ScaleView;
