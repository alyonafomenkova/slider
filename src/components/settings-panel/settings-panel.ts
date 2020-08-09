import './settings-panel.scss';

class SettingsPanel {
  private panel: Element;

  private inputFrom?: Element;

  private inputTo?: Element;

  private fromValueListener?: (value: number) => void;

  private toValueListener?: (value: number) => void;

  constructor(panel: Element) {
    this.panel = panel;
  }

  init(): void {
    this.inputFrom = this.panel.querySelector('.settings-panel__values-input--from') as Element;
    this.inputTo = this.panel.querySelector('.settings-panel__values-input--to') as Element;
    this.inputFrom.addEventListener('input', this.handleFromInput);
    this.inputTo.addEventListener('input', this.handleInputTo);
  }

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

  setFromValueListener(listener: (value: number) => void): void {
    this.fromValueListener = listener;
  }

  setToValueListener(listener: (value: number) => void): void {
    this.toValueListener = listener;
  }
}

export default SettingsPanel;
