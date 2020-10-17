import './settings-panel.scss';

class SettingsPanel {
  private panel: Element;

  private inputMin?: Element;

  private inputMax?: Element;

  private inputStep?: Element;

  private inputFrom?: Element;

  private inputTo?: Element;

  private inputScale?: Element;

  private inputPointerValue?: Element;

  private inputsType?: NodeList;

  private inputsOrientation?: NodeList;

  private minListener?: (value: number) => void;

  private maxListener?: (value: number) => void;

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
    this.inputMin = this.panel.querySelector('.settings-panel__values-input_kind_min') as Element;
    this.inputMax = this.panel.querySelector('.settings-panel__values-input_kind_max') as Element;
    this.inputStep = this.panel.querySelector('.settings-panel__values-input_kind_step') as Element;
    this.inputFrom = this.panel.querySelector('.settings-panel__values-input_kind_from') as Element;
    this.inputTo = this.panel.querySelector('.settings-panel__values-input_kind_to') as Element;
    this.inputScale = this.panel.querySelector('input[name=scale]') as Element;
    this.inputPointerValue = this.panel.querySelector('input[name=value]') as Element;
    this.inputsType = this.panel.querySelectorAll('input[name=type]');
    this.inputMin.addEventListener('change', this.handleMinInput);
    this.inputMax.addEventListener('change', this.handleMaxInput);
    this.inputStep.addEventListener('change', this.handleStepInput);
    this.inputFrom.addEventListener('change', this.handleFromInput);
    this.inputTo.addEventListener('change', this.handleInputTo);
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
    const inputTo = this.panel.querySelector('.settings-panel__values-label_kind_to') as HTMLInputElement;
    if (inputTo) {
      if (value) {
        inputTo.style.display = 'inline';
      } else {
        inputTo.style.display = 'none';
      }
    }
  }

  private handleMinInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const number = parseFloat(value);
    const isCorrectValue = !Number.isNaN(number);

    if (isCorrectValue) {
      if (this.minListener) {
        this.minListener(number);
      }
    }
  };

  private handleMaxInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const number = parseFloat(value);
    const isCorrectValue = !Number.isNaN(number);

    if (isCorrectValue) {
      if (this.maxListener) {
        this.maxListener(number);
      }
    }
  };

  private handleStepInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const number = parseFloat(value);
    const isCorrectValue = !Number.isNaN(number);

    if (isCorrectValue) {
      if (this.stepListener) {
        this.stepListener(number);
      }
    }
  };

  private handleFromInput = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const number = parseFloat(value);
    const isCorrectValue = !Number.isNaN(number);

    if (isCorrectValue) {
      if (this.fromValueListener) {
        this.fromValueListener(number);
      }
    }
  };

  private handleInputTo = (evt: Event): void => {
    const { value } = evt.target as HTMLInputElement;
    const number = parseFloat(value);
    const isCorrectValue = !Number.isNaN(number);

    if (isCorrectValue) {
      if (this.toValueListener) {
        this.toValueListener(number);
      }
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
      const isInterval = (evt.target as HTMLInputElement).classList.contains('settings-panel__input_type_interval');
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
      const isVertical = (evt.target as HTMLInputElement).classList.contains('settings-panel__input_orientation_vertical');
      this.orientationListener(isVertical);
    }
  };

  public setMinValue(value: number): void {
    if (!this.inputMin) {
      throw new Error('Input min is not defined');
    }
    if (this.inputFrom) {
      (this.inputFrom as HTMLInputElement).min = value.toString();
    }
    if (this.inputTo) {
      (this.inputTo as HTMLInputElement).min = value.toString();
    }
    (this.inputMin as HTMLInputElement).value = value.toString();
  }

  public setMaxValue(value: number): void {
    if (!this.inputMax) {
      throw new Error('Input max is not defined');
    }
    if (this.inputFrom) {
      (this.inputFrom as HTMLInputElement).max = value.toString();
    }
    if (this.inputTo) {
      (this.inputTo as HTMLInputElement).max = value.toString();
    }
    (this.inputMax as HTMLInputElement).value = value.toString();
  }

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

  public setMinListener(listener: (value: number) => void): void {
    this.minListener = listener;
  }

  public setMaxListener(listener: (value: number) => void): void {
    this.maxListener = listener;
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

  public setOrientationListener(listener: (value: boolean) => void): void {
    this.orientationListener = listener;
  }
}

export default SettingsPanel;
