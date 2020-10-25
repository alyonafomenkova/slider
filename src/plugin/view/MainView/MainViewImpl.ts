import MainView from './MainView';
import ViewModel from './ViewModel';
import ScaleItem from '../ScaleView/ScaleItem';
import ScaleView from '../ScaleView/ScaleView';
import SliderView from '../SliderView/SliderView';
import PointerView from '../PointerView/PointerView';
import Util from '../../util/Util';

class MainViewImpl implements MainView {
  private readonly MAX_SCALE_ITEMS_STEP = 26;

  private readonly viewModel: ViewModel;

  private readonly sliderView: SliderView;

  private readonly scaleView: ScaleView;

  private readonly pointerFromView: PointerView;

  private readonly pointerToView: PointerView;

  private valueFromListener?: (value: number) => void = undefined;

  private valueToListener?: (value: number) => void = undefined;

  constructor(
    viewModel: ViewModel,
    sliderView: SliderView,
    scaleView: ScaleView,
    pointerFromView: PointerView,
    pointerToView: PointerView,
  ) {
    if (!viewModel) throw new Error('View model is not defined');
    if (!sliderView) throw new Error('Slider view is not defined');
    if (!scaleView) throw new Error('Scale view is not defined');
    if (!pointerFromView) throw new Error('Pointer from view is not defined');
    if (!pointerToView) throw new Error('Pointer to view is not defined');

    this.viewModel = viewModel;
    this.sliderView = sliderView;
    this.scaleView = scaleView;
    this.pointerFromView = pointerFromView;
    this.pointerToView = pointerToView;
  }

  public clear(): void {
    this.sliderView.clear();
  }

  public setupScale(): void {
    const items: Array<ScaleItem> = [];
    const sliderWidth = this.sliderView.getWidth();
    const sliderHeight = this.sliderView.getHeight();
    const count = Math.floor((this.viewModel.getMax() - this.viewModel.getMin()) / this.viewModel.getStep());
    const stepWidth = this.viewModel.getIsVertical() ? (sliderHeight / count) : (sliderWidth / count);
    const itemStep = this.getItemsStep(stepWidth);

    for (let i = 0; i <= count; i += itemStep) {
      const value = this.viewModel.getMin() + this.viewModel.getStep() * i;
      const rounded = Util.roundWithEpsilon(value);
      const percent = ((value - this.viewModel.getMin()) * 100) / (this.viewModel.getMax() - this.viewModel.getMin());
      items.push(new ScaleItem(rounded, percent));
    }
    this.scaleView.addItems(items, this.viewModel.getIsVertical());
    this.scaleView.setClickListener(this.scaleClickListener);
  }

  public initPointerFrom(value: number): void {
    this.viewModel.setValueFrom(value);
    this.pointerFromView.draw(this.viewModel.getHasValue());
    this.pointerFromView.setDownEventListener(this.pointerDownEventListener);
    this.pointerFromView.setMoveEventListener(this.pointerMoveEventListener);
    this.pointerFromView.setUpEventListener(this.pointerUpEventListener);
    this.setupPositionFromByValue(this.viewModel.getValueFrom());
    this.calculateValueFrom();
  }

  public initPointerTo(value: number): void {
    this.viewModel.setValueTo(value);

    this.pointerToView.draw(this.viewModel.getHasValue());
    this.pointerToView.setDownEventListener(this.pointerDownEventListener);
    this.pointerToView.setMoveEventListener(this.pointerMoveEventListener);
    this.pointerToView.setUpEventListener(this.pointerUpEventListener);
    this.setupPositionToByValue(this.viewModel.getValueTo());
    this.calculateValueTo();

    if (!this.viewModel.getIsInterval()) {
      this.pointerToView.hide();
    }
    if (!this.viewModel.getHasValue()) {
      this.pointerToView.hideValue();
    }
  }

  public handleSliderBarClick(): void {
    this.sliderView.setClickSliderBarListener(this.sliderBarClickListener);
  }

  public updateProgress(): void {
    if (this.viewModel.getIsVertical()) {
      this.updateVerticalProgress();
    } else {
      this.updateHorizontalProgress();
    }
  }

  public drawVertical(): void {
    this.sliderView.drawVertical();
  }

  public drawHorizontal(): void {
    this.sliderView.drawHorizontal();
  }

  public showScale(): void {
    this.scaleView.show();
  }

  public hideScale(): void {
    this.scaleView.hide();
  }

  public showPointerFromValue(): void {
    this.pointerFromView.showValue();
  }

  public hidePointerFromValue(): void {
    this.pointerFromView.hideValue();
  }

  public showPointerToValue(): void {
    this.pointerToView.showValue();
  }

  public hidePointerToValue(): void {
    this.pointerToView.hideValue();
  }

  public showPointerTo(): void {
    this.pointerToView.show();
  }

  public hidePointerTo(): void {
    this.pointerToView.hide();
  }

  public setupPositionFromByValue(value: number): void {
    this.setupPositionByValue(this.pointerFromView, value);
  }

  public setupPositionToByValue(value: number): void {
    this.setupPositionByValue(this.pointerToView, value);
  }

  public calculateValueFrom(): void {
    this.calculateValue(this.pointerFromView);
  }

  public calculateValueTo(): void {
    this.calculateValue(this.pointerToView);
  }

  public setValueFrom(value: number): void {
    this.viewModel.setValueFrom(value);
    this.pointerFromView.setValue(value);
  }

  public setValueTo(value: number): void {
    this.viewModel.setValueTo(value);
    this.pointerToView.setValue(value);
  }

  public setValueFromListener(listener: (value: number) => void): void {
    this.valueFromListener = listener;
  }

  public setValueToListener(listener: (value: number) => void): void {
    this.valueToListener = listener;
  }

  private getItemsStep(stepWidth: number): number {
    let step = 1;
    let width = stepWidth;

    while (width < this.MAX_SCALE_ITEMS_STEP) {
      width *= 2;
      step *= 2;
    }
    return step;
  }

  private pointerDownEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private pointerMoveEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private pointerUpEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private setPointerPosition(view: PointerView, x: number, y: number) {
    if (this.viewModel.getIsVertical()) {
      this.setPointerY(view, y);
    } else {
      this.setPointerX(view, x);
    }
    if (view === this.pointerFromView) {
      this.calculateValueFrom();
    } else {
      this.calculateValueTo();
    }
    this.updateProgress();
  }

  private setPointerX(view: PointerView, x: number) {
    let positionX = x - this.sliderView.getBoundLeft();
    const xMin = 0;
    const xMax = this.sliderView.getWidth();
    const stepCount = (this.viewModel.getMax() - this.viewModel.getMin()) / this.viewModel.getStep();
    const stepX = this.sliderView.getWidth() / stepCount;
    const stepsTotal = (this.viewModel.getMax() - this.viewModel.getMin()) / this.viewModel.getStep();
    const stepWidth = this.sliderView.getWidth() / stepsTotal;
    positionX = Math.round(positionX / stepX) * stepX;

    if (this.viewModel.getIsInterval()) {
      if (view === this.pointerFromView) {
        const pointerToX = ((this.viewModel.getValueTo() - this.viewModel.getMin()) / this.viewModel.getStep()) * stepWidth;

        if (positionX > pointerToX - stepWidth) {
          positionX = pointerToX - stepWidth;
        }
      } else {
        const pointerFromX = ((this.viewModel.getValueFrom() - this.viewModel.getMin()) / this.viewModel.getStep()) * stepWidth;

        if (positionX < pointerFromX + stepWidth) {
          positionX = pointerFromX + stepWidth;
        }
      }
    }
    if (positionX > xMax) {
      positionX = xMax;
    } else if (positionX < xMin) {
      positionX = xMin;
    }
    const percent = (positionX / this.sliderView.getWidth()) * 100;
    view.setX(percent);
  }

  private setPointerY(view: PointerView, y: number) {
    let positionY = y - this.sliderView.getBoundTop();
    const max = this.viewModel.getMax();
    const min = this.viewModel.getMin();
    const step = this.viewModel.getStep();
    const yMin = 0;
    const yMax = this.sliderView.getHeight();
    const stepCount = (max - min) / step;
    const stepY = this.sliderView.getHeight() / stepCount;
    const stepHeight = this.sliderView.getHeight() / stepCount;
    const offset = this.sliderView.getHeight() - Math.floor(stepCount) * stepHeight;
    positionY = Math.round((positionY - offset) / stepY) * stepY + offset;

    if (this.viewModel.getIsInterval()) {
      if (view === this.pointerFromView) {
        const pointerToY = Math.abs(((this.viewModel.getValueTo() - max) / step) * stepHeight);
        if (positionY < pointerToY + stepHeight) {
          positionY = pointerToY + stepHeight;
        }
      } else {
        const pointerFromY = Math.abs(((this.viewModel.getValueFrom() - max) / step)) * stepHeight;

        if (positionY > pointerFromY - stepHeight) {
          positionY = pointerFromY - stepHeight;
        }
      }
    }
    if (positionY > yMax) {
      positionY = yMax;
    } else if (positionY < yMin) {
      positionY = yMin;
    }
    const percent = (positionY / this.sliderView.getHeight()) * 100;
    view.setY(percent);
  }

  private updateHorizontalProgress(): void {
    const positionMin = this.sliderView.getBoundLeft();
    const positionFrom = this.pointerFromView.getLeft() + this.pointerFromView.getWidth() / 2;
    let start;
    let end;

    if (this.viewModel.getIsInterval()) {
      const positionTo = this.pointerToView.getLeft() + this.pointerToView.getWidth() / 2;
      start = positionFrom - positionMin;
      end = positionTo;
    } else {
      start = 0;
      end = positionFrom;
    }
    const width = Math.abs(end - start - positionMin);
    const startInPercent = (start / this.sliderView.getWidth()) * 100;
    const widthInPercent = (width / this.sliderView.getWidth()) * 100;
    this.sliderView.drawHorizontalProgress(startInPercent, widthInPercent);
  }

  private updateVerticalProgress(): void {
    const positionMax = this.sliderView.getBoundBottom();
    const positionFrom = positionMax - this.pointerFromView.getTop() - this.pointerFromView.getHeight() / 2;
    let start;
    let end;

    if (this.viewModel.getIsInterval()) {
      const positionTo = positionMax - this.pointerToView.getTop() - this.pointerToView.getHeight() / 2;
      start = positionFrom;
      end = positionTo;
    } else {
      start = 0;
      end = positionFrom;
    }
    const height = Math.abs(start - end);
    const startInPercent = (start / this.sliderView.getHeight()) * 100;
    const heightInPercent = (height / this.sliderView.getHeight()) * 100;
    this.sliderView.drawVerticalProgress(startInPercent, heightInPercent);
  }

  private scaleClickListener = (view: ScaleView, value: number): void => {
    let pointerView;

    if (this.viewModel.getIsInterval()) {
      const differenceBetweenValueAndFrom = Math.abs(value - this.viewModel.getValueFrom());
      const differenceBetweenValueAndTo = Math.abs(value - this.viewModel.getValueTo());

      if (differenceBetweenValueAndFrom <= differenceBetweenValueAndTo) {
        pointerView = this.pointerFromView;
      } else {
        pointerView = this.pointerToView;
      }
    } else {
      pointerView = this.pointerFromView;
    }
    if (pointerView === this.pointerFromView) {
      this.setupPositionFromByValue(value);
      this.calculateValueFrom();
    } else {
      this.setupPositionToByValue(value);
      this.calculateValueTo();
    }
    this.updateProgress();
  };

  private sliderBarClickListener = (view: SliderView, x: number, y: number): void => {
    if (this.pointerFromView) {
      let positionFrom;
      let pointerView;

      if (this.viewModel.getIsInterval()) {
        if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

        let positionTo;
        let differenceBetweenValueAndFrom;
        let differenceBetweenValueAndTo;

        if (this.viewModel.getIsVertical()) {
          positionFrom = this.pointerFromView.getTop() - this.pointerFromView.getHeight() / 2;
          positionTo = this.pointerToView.getTop() - this.pointerToView.getHeight() / 2;
          differenceBetweenValueAndFrom = Math.abs(y - positionFrom);
          differenceBetweenValueAndTo = Math.abs(y - positionTo);
        } else {
          positionFrom = this.pointerFromView.getLeft() + this.pointerFromView.getWidth() / 2;
          positionTo = this.pointerToView.getLeft() + this.pointerToView.getWidth() / 2;
          differenceBetweenValueAndFrom = Math.abs(x - positionFrom);
          differenceBetweenValueAndTo = Math.abs(x - positionTo);
        }
        if (differenceBetweenValueAndFrom <= differenceBetweenValueAndTo) {
          pointerView = this.pointerFromView;
        } else {
          pointerView = this.pointerToView;
        }
      } else {
        pointerView = this.pointerFromView;
      }
      this.setPointerPosition(pointerView, x, y);
    }
  };

  private calculateValue(view: PointerView): void {
    if (!this.valueFromListener) throw new Error('No listener assigned for value from');
    if (!this.valueToListener) throw new Error('No listener assigned for value to');

    const min = this.viewModel.getMin();
    const max = this.viewModel.getMax();
    const step = this.viewModel.getStep();
    const pointerHalfWidth = view.getWidth() / 2;
    const pointerHalfHeight = view.getHeight() / 2;
    const stepsTotal = (max - min) / step;
    let value;

    if (this.viewModel.getIsVertical()) {
      const positionY = view.getTop() + pointerHalfHeight - this.sliderView.getBoundTop();
      const stepHeight = this.sliderView.getHeight() / stepsTotal;

      if (Math.floor(positionY) === 0) {
        value = max;
      } else {
        value = Math.round((this.sliderView.getHeight() - positionY) / stepHeight) * step + min;
      }
    } else {
      const positionX = view.getLeft() + pointerHalfWidth - this.sliderView.getBoundLeft();
      const stepWidth = this.sliderView.getWidth() / stepsTotal;

      if (Math.floor(positionX) < Math.floor(this.sliderView.getWidth())) {
        value = Math.round(positionX / stepWidth) * step + min;
      } else {
        value = max;
      }
    }
    const rounded = Util.roundWithEpsilon(value);
    const valueFrom = this.viewModel.getValueFrom();
    const valueTo = this.viewModel.getValueTo();

    if (view === this.pointerFromView) {
      if (this.viewModel.getIsInterval()) {
        this.valueFromListener(rounded > valueTo ? valueTo : rounded);
      } else {
        this.valueFromListener(rounded);
      }
    } else {
      this.valueToListener(rounded < valueFrom ? valueFrom : rounded);
    }
  }

  private setupPositionByValue(view: PointerView, value: number): number | undefined {
    const min = this.viewModel.getMin();
    const max = this.viewModel.getMax();
    let positionMin;
    let positionMax;
    let centerOfPointer;

    if (this.viewModel.getIsVertical()) {
      positionMin = this.sliderView.getBoundTop();
      positionMax = this.sliderView.getBoundBottom();
      centerOfPointer = (((value - min) * (positionMin - positionMax)) / (max - min)) + positionMax;
      this.setPointerY(view, centerOfPointer);
    } else {
      positionMin = this.sliderView.getBoundLeft();
      positionMax = this.sliderView.getBoundRight();
      centerOfPointer = (((value - min) * (positionMax - positionMin)) / (max - min)) + positionMin;
      this.setPointerX(view, centerOfPointer);
    }
    if (centerOfPointer) {
      return centerOfPointer;
    }
    return undefined;
  }
}

export default MainViewImpl;
