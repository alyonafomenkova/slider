import './settings-panel.scss';

class SettingsPanel {
  private panel: Element;

  private inputStep?: Element;

  private inputFrom?: Element;

  private inputTo?: Element;

  private inputScale?: Element;

  private stepListener?: (value: number) => void;

  private fromValueListener?: (value: number) => void;

  private toValueListener?: (value: number) => void;

  private scaleListener?: (value: boolean) => void;

  constructor(panel: Element) {
    this.panel = panel;
  }

  public init(): void {
    this.inputStep = this.panel.querySelector('.settings-panel__values-input--step') as Element;
    this.inputFrom = this.panel.querySelector('.settings-panel__values-input--from') as Element;
    this.inputTo = this.panel.querySelector('.settings-panel__values-input--to') as Element;
    this.inputScale = this.panel.querySelector('input[name=scale]') as Element;
    this.inputStep.addEventListener('input', this.handleStepInput);
    this.inputFrom.addEventListener('input', this.handleFromInput);
    this.inputTo.addEventListener('input', this.handleInputTo);
    this.inputScale.addEventListener('change', this.handleScaleInput);
  }

  private handleStepInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const num = parseFloat(value);

    if (!Number.isNaN(num) && this.stepListener) {
      this.stepListener(num);
    }
  };

  private handleFromInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const num = parseFloat(value);

    if (!Number.isNaN(num) && this.fromValueListener) {
      this.fromValueListener(num);
    }
  };

  private handleInputTo = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const num = parseFloat(value);

    if (!Number.isNaN(num) && this.toValueListener) {
      this.toValueListener(num);
    }
  };

  private handleScaleInput = (evt: Event): void => {
    const value = (evt.target as HTMLInputElement).checked;
    if (this.scaleListener) {
      this.scaleListener(value);
    }
  };

  public setFromValue(value: number): void {
    if (!this.inputFrom) {
      throw new Error('Input from is not defined');
    }
    (this.inputFrom as HTMLInputElement).value = value.toString();
  }

  public setToValue(value: number): void {
    if (!this.inputTo) {
      throw new Error('Input to is not defined');
    }
    (this.inputTo as HTMLInputElement).value = value.toString();
  }

  public setFromValueListener(listener: (value: number) => void): void {
    this.fromValueListener = listener;
  }

  public setToValueListener(listener: (value: number) => void): void {
    this.toValueListener = listener;
  }

  public setStepListener(listener: (value: number) => void): void {
    this.stepListener = listener;
  }

  public setStep(value: number): void {
    if (this.inputStep) {
      (this.inputStep as HTMLInputElement).value = value.toString();
    }
    if (this.inputFrom) {
      (this.inputFrom as HTMLInputElement).step = value.toString();
    }
    if (this.inputTo) {
      (this.inputTo as HTMLInputElement).step = value.toString();
    }
  }

  public setScaleListener(listener: (value: boolean) => void): void {
    this.scaleListener = listener;
  }
}

export default SettingsPanel;
