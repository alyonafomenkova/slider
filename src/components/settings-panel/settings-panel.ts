import './settings-panel.scss';

class SettingsPanel {
  private panel: Element;

  private inputStep?: Element;

  private inputFrom?: Element;

  private inputTo?: Element;

  private inputScale?: Element;

  private inputPointerValue?: Element;

  private inputsType?: NodeList;

  private inputsOrientation?: NodeList;

  private stepListener?: (value: number) => void;

  private fromValueListener?: (value: number) => void;

  private toValueListener?: (value: number) => void;

  private scaleListener?: (value: boolean) => void;

  private pointerValueListener?: (value: boolean) => void;

  private typeListener?: (value: boolean) => void;

  private orientationListener?: (value: boolean) => void;

  constructor(panel: Element) {
    this.panel = panel;
  }

  public init(): void {
    this.inputStep = this.panel.querySelector('.settings-panel__values-input--step') as Element;
    this.inputFrom = this.panel.querySelector('.settings-panel__values-input--from') as Element;
    this.inputTo = this.panel.querySelector('.settings-panel__values-input--to') as Element;
    this.inputScale = this.panel.querySelector('input[name=scale]') as Element;
    this.inputPointerValue = this.panel.querySelector('input[name=value]') as Element;
    this.inputsType = this.panel.querySelectorAll('input[name=type]');
    this.inputStep.addEventListener('input', this.handleStepInput);
    this.inputFrom.addEventListener('input', this.handleFromInput);
    this.inputTo.addEventListener('input', this.handleInputTo);
    this.inputScale.addEventListener('change', this.handleScaleInput);
    this.inputPointerValue.addEventListener('change', this.handlePointerValue);
    this.inputsType.forEach((input) => {
      input.addEventListener('change', this.handleType);
    });
    this.inputsOrientation = this.panel.querySelectorAll('input[name=orientation]');
    this.inputsOrientation.forEach((input) => {
      input.addEventListener('change', this.handleOrientation);
    });
  }

  private isValueTo(value: boolean) {
    const inputTo = this.panel.querySelector('.settings-panel__values-label--to') as HTMLInputElement;
    if (inputTo) {
      if (value) {
        inputTo.style.display = 'inline';
      } else {
        inputTo.style.display = 'none';
      }
    }
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

  private handlePointerValue = (evt: Event): void => {
    const value = (evt.target as HTMLInputElement).checked;
    if (this.pointerValueListener) {
      this.pointerValueListener(value);
    }
  };

  private handleType = (evt: Event): void => {
    if (this.typeListener) {
      const isInterval = (evt.target as HTMLInputElement).classList.contains('settings-panel__input-interval');
      if (isInterval) {
        this.typeListener(true);
        this.isValueTo(true);
      } else {
        this.typeListener(false);
        this.isValueTo(false);
      }
    }
  };

  private handleOrientation = (evt: Event): void => {
    if (this.orientationListener) {
      const isVertical = (evt.target as HTMLInputElement).classList.contains('settings-panel__input-vertical');
      this.orientationListener(isVertical);
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

  public setPointerValueListener(listener: (value: boolean) => void): void {
    this.pointerValueListener = listener;
  }

  public setTypeListener(listener: (value: boolean) => void): void {
    this.typeListener = listener;
  }

  public setOrientationListener(listever: (value: boolean) => void): void {
    this.orientationListener = listever;
  }
}

export default SettingsPanel;
