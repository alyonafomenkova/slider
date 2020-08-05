import ScaleItem from './ScaleItem';

interface ScaleView {
  clear(): void;
  addItems(items: Array<ScaleItem>, isVertical: boolean): void;
  setClickListener(listener: (view: ScaleView, value: number) => void): void;
}

export default ScaleView;
