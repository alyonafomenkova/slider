import './settings-panel.scss';

class SettingsPanel {
  private panel: Element;

  private inputFrom?: Element;

  private fromValueListener?: (value: number) => void;

  constructor(panel: Element) {
    this.panel = panel;
  }

  init(): void {
    this.inputFrom = this.panel.querySelector('.settings-panel__values-input--from') as Element;
    this.inputFrom.addEventListener('input', this.handleFromInput);
  }

  private handleFromInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const num = parseFloat(value);

    if (!Number.isNaN(num) && this.fromValueListener) {
      this.fromValueListener(num);
    }
  };

  setFromValueListener(listener: (value: number) => void): void {
    this.fromValueListener = listener;
  }
}

export default SettingsPanel;
