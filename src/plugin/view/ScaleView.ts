import ScaleItem from './ScaleItem';

interface ScaleView {
  clear(): void;
  addItems(items: Array<ScaleItem>, isVertical: boolean): void;
}

export default ScaleView;
