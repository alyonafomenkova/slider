import './settings-panel.scss';

class SettingsPanel {
  private panel: Element;

  private inputStep?: Element;

  private inputFrom?: Element;

  private inputTo?: Element;

  private stepListener?: (value: number) => void;

  private fromValueListener?: (value: number) => void;

  private toValueListener?: (value: number) => void;

  constructor(panel: Element) {
    this.panel = panel;
  }

  init(): void {
    this.inputStep = this.panel.querySelector('.settings-panel__values-input--step') as Element;
    this.inputFrom = this.panel.querySelector('.settings-panel__values-input--from') as Element;
    this.inputTo = this.panel.querySelector('.settings-panel__values-input--to') as Element;
    this.inputStep.addEventListener('input', this.handleStepInput);
    this.inputFrom.addEventListener('input', this.handleFromInput);
    this.inputTo.addEventListener('input', this.handleInputTo);
  }

  private handleStepInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const num = parseFloat(value);
    console.log('[handleStepInput]');//

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

  private handleInputTo = (evt: Event):void => {
    const { value } = evt.target as HTMLInputElement;
    const num = parseFloat(value);

    if (!Number.isNaN(num) && this.toValueListener) {
      this.toValueListener(num);
    }
  };

  setFromValue(value: number): void {
    if (!this.inputFrom) {
      throw new Error('Input from is not defined');
    }
    (this.inputFrom as HTMLInputElement).value = value.toString();
  }

  setToValue(value: number): void {
    if (!this.inputTo) {
      throw new Error('Input to is not defined');
    }
    (this.inputTo as HTMLInputElement).value = value.toString();
  }

  setFromValueListener(listener: (value: number) => void): void {
    this.fromValueListener = listener;
  }

  setToValueListener(listener: (value: number) => void): void {
    this.toValueListener = listener;
  }

  setStepListener(listener: (value: number) => void): void {
    this.stepListener = listener;
  }

  setStep(value: number): void {
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
}

export default SettingsPanel;
