import MainView from './MainView';
import ScaleItem from '../ScaleView/ScaleItem';
import ScaleView from '../ScaleView/ScaleView';
import SliderView from '../SliderView/SliderView';
import PointerView from '../PointerView/PointerView';
import Util from '../../util/Util';

class MainViewImpl implements MainView {
  private readonly MAX_SCALE_ITEMS_STEP = 26;

  private readonly POINTER_TOP_Z_INDEX = 4;

  private readonly POINTER_BOTTOM_Z_INDEX = 3;

  private readonly sliderView: SliderView;

  private readonly scaleView: ScaleView;

  private readonly pointerFromView: PointerView;

  private readonly pointerToView: PointerView;

  private valueFromListener?: (value: number) => void = undefined;

  private valueToListener?: (value: number) => void = undefined;

  // ------------------------------

  private min = 0;

  private max = 0;

  private valueFrom = 0;

  private valueTo = 0;

  private step = 0;

  private isInterval = false;

  // ------------------------------

  private isVertical = false;

  private hasScale = false;

  private hasValue = false;

  private cursorOffset = 0;

  constructor(sliderView: SliderView, scaleView: ScaleView, pointerFromView: PointerView, pointerToView: PointerView) {
    if (!sliderView) throw new Error('Slider view is not defined');
    if (!scaleView) throw new Error('Scale view is not defined');
    if (!pointerFromView) throw new Error('Pointer from view is not defined');
    if (!pointerToView) throw new Error('Pointer to view is not defined');

    this.sliderView = sliderView;
    this.scaleView = scaleView;
    this.pointerFromView = pointerFromView;
    this.pointerToView = pointerToView;
  }

  public clear(): void {
    this.sliderView.clear();
  }

  public setupScale(min: number, max: number, step: number): void {
    const items: Array<ScaleItem> = [];
    const sliderWidth = this.sliderView.getWidth();
    const sliderHeight = this.sliderView.getHeight();
    const count = Math.floor((max - min) / step);
    const stepWidth = this.isVertical ? (sliderHeight / count) : (sliderWidth / count);
    const itemStep = this.getItemsStep(stepWidth);

    for (let i = 0; i <= count; i += itemStep) {
      const value = min + step * i;
      const rounded = Util.roundWithEpsilon(value);
      const percent = ((value - min) * 100) / (max - min);
      items.push(new ScaleItem(rounded, percent));
    }
    this.scaleView.addScaleItems(items, this.isVertical);
    this.scaleView.setClickListener(this.scaleClickListener);
  }

  public initPointerFrom(value: number): void {
    this.valueFrom = value;
    this.pointerFromView.draw(this.hasValue);
    this.pointerFromView.setDownEventListener(this.pointerDownEventListener);
    this.pointerFromView.setMoveEventListener(this.pointerMoveEventListener);
    this.pointerFromView.setUpEventListener(this.pointerUpEventListener);
    this.setupPositionFromByValue(value);
    this.calculateValueFrom();
  }

  public initPointerTo(value: number, isInterval: boolean): void {
    this.valueTo = value;
    this.pointerToView.draw(this.hasValue);
    this.pointerToView.setDownEventListener(this.pointerDownEventListener);
    this.pointerToView.setMoveEventListener(this.pointerMoveEventListener);
    this.pointerToView.setUpEventListener(this.pointerUpEventListener);
    this.setupPositionToByValue(value);
    this.calculateValueTo();

    if (!isInterval) {
      this.pointerToView.hide();
    }
    if (!this.hasValue) {
      this.pointerToView.hideValue();
    }
  }

  public handleSliderBarClick(): void {
    this.sliderView.setClickSliderBarListener(this.sliderBarClickListener);
  }

  public updateProgress(): void {
    if (this.isVertical) {
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
    this.valueFrom = value;
    this.pointerFromView.setValue(value);
  }

  public setValueTo(value: number): void {
    this.valueTo = value;
    this.pointerToView.setValue(value);
  }

  public setMin(value: number): void {
    this.min = value;
  }

  public setMax(value: number): void {
    this.max = value;
  }

  public setStep(value: number): void {
    this.step = value;
  }

  public setIsInterval(isInterval: boolean): void {
    this.isInterval = isInterval;
  }

  public setIsVertical(isVertical: boolean): void {
    this.isVertical = isVertical;
  }

  public setHasScale(hasScale: boolean): void {
    this.hasScale = hasScale;
  }

  public setHasValue(hasValue: boolean): void {
    this.hasValue = hasValue;
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
    if (this.isVertical) {
      const viewY = view.getTop() + view.getHeight() / 2;
      this.cursorOffset = viewY - y;
    } else {
      const viewX = view.getLeft() + view.getWidth() / 2;
      this.cursorOffset = viewX - x;
    }
    this.setPointerPosition(view, x, y);

    if (this.isInterval) {
      if (view === this.pointerFromView) {
        this.pointerFromView.setZOrder(this.POINTER_TOP_Z_INDEX);
        this.pointerToView.setZOrder(this.POINTER_BOTTOM_Z_INDEX);
      } else {
        this.pointerFromView.setZOrder(this.POINTER_BOTTOM_Z_INDEX);
        this.pointerToView.setZOrder(this.POINTER_TOP_Z_INDEX);
      }
    }
  };

  private pointerMoveEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private pointerUpEventListener = (view: PointerView, x: number, y: number): void => {
    this.setPointerPosition(view, x, y);
  };

  private setPointerPosition(view: PointerView, x: number, y: number) {
    if (this.isVertical) {
      this.setPointerY(view, y + this.cursorOffset);
    } else {
      this.setPointerX(view, x + this.cursorOffset);
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
    const stepCount = (this.max - this.min) / this.step;
    const stepX = this.sliderView.getWidth() / stepCount;
    const stepsTotal = (this.max - this.min) / this.step;
    const stepWidth = this.sliderView.getWidth() / stepsTotal;
    positionX = Math.round(positionX / stepX) * stepX;

    if (this.isInterval) {
      if (view === this.pointerFromView) {
        const pointerToX = ((this.valueTo - this.min) / this.step) * stepWidth;

        if (positionX > pointerToX - stepWidth) {
          positionX = pointerToX - stepWidth;
        }
      } else {
        const pointerFromX = ((this.valueFrom - this.min) / this.step) * stepWidth;

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
    const yMin = 0;
    const yMax = this.sliderView.getHeight();
    const stepCount = (this.max - this.min) / this.step;
    const stepY = this.sliderView.getHeight() / stepCount;
    const stepHeight = this.sliderView.getHeight() / stepCount;
    const offset = this.sliderView.getHeight() - Math.floor(stepCount) * stepHeight;
    positionY = Math.round((positionY - offset) / stepY) * stepY + offset;

    if (this.isInterval) {
      if (view === this.pointerFromView) {
        const pointerToY = Math.abs(((this.valueTo - this.max) / this.step) * stepHeight);
        if (positionY < pointerToY + stepHeight) {
          positionY = pointerToY + stepHeight;
        }
      } else {
        const pointerFromY = Math.abs(((this.valueFrom - this.max) / this.step)) * stepHeight;

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

    if (this.isInterval) {
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

    if (this.isInterval) {
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

    if (this.isInterval) {
      const differenceBetweenValueAndFrom = Math.abs(value - this.valueFrom);
      const differenceBetweenValueAndTo = Math.abs(value - this.valueTo);

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

      if (this.isInterval) {
        if (!this.pointerToView) throw new Error('Pointer to view is not defined.');

        let positionTo;
        let differenceBetweenValueAndFrom;
        let differenceBetweenValueAndTo;

        if (this.isVertical) {
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

    const pointerHalfWidth = view.getWidth() / 2;
    const pointerHalfHeight = view.getHeight() / 2;
    const stepsTotal = (this.max - this.min) / this.step;
    let value;

    if (this.isVertical) {
      const positionY = view.getTop() + pointerHalfHeight - this.sliderView.getBoundTop();
      const stepHeight = this.sliderView.getHeight() / stepsTotal;

      if (Math.floor(positionY) === 0) {
        value = this.max;
      } else {
        value = Math.round((this.sliderView.getHeight() - positionY) / stepHeight) * this.step + this.min;
      }
    } else {
      const positionX = view.getLeft() + pointerHalfWidth - this.sliderView.getBoundLeft();
      const stepWidth = this.sliderView.getWidth() / stepsTotal;

      if (Math.floor(positionX) < Math.floor(this.sliderView.getWidth())) {
        value = Math.round(positionX / stepWidth) * this.step + this.min;
      } else {
        value = this.max;
      }
    }
    const rounded = Util.roundWithEpsilon(value);

    if (view === this.pointerFromView) {
      if (this.isInterval) {
        this.valueFromListener(rounded > this.valueTo ? this.valueTo : rounded);
      } else {
        this.valueFromListener(rounded);
      }
    } else {
      this.valueToListener(rounded < this.valueFrom ? this.valueFrom : rounded);
    }
  }

  private setupPositionByValue(view: PointerView, value: number): number | undefined {
    let positionMin;
    let positionMax;
    let centerOfPointer;

    if (this.isVertical) {
      positionMin = this.sliderView.getBoundTop();
      positionMax = this.sliderView.getBoundBottom();
      centerOfPointer = (((value - this.min) * (positionMin - positionMax)) / (this.max - this.min)) + positionMax;
      this.setPointerY(view, centerOfPointer);
    } else {
      positionMin = this.sliderView.getBoundLeft();
      positionMax = this.sliderView.getBoundRight();
      centerOfPointer = (((value - this.min) * (positionMax - positionMin)) / (this.max - this.min)) + positionMin;
      this.setPointerX(view, centerOfPointer);
    }
    if (centerOfPointer) {
      return centerOfPointer;
    }
    return undefined;
  }
}

export default MainViewImpl;
