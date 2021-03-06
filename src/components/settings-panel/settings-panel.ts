import Configuration from '../../plugin/model/Configuration';
import './settings-panel.scss';

class SettingsPanel {
  private panel: HTMLElement;

  private inputMin?: HTMLInputElement;

  private inputMax?: HTMLInputElement;

  private inputStep?: HTMLInputElement;

  private inputFrom?: HTMLInputElement;

  private inputTo?: HTMLInputElement;

  private inputScale?: HTMLInputElement;

  private inputPointerValue?: HTMLInputElement;

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

  constructor(panel: HTMLElement) {
    this.panel = panel;
  }

  public init(config?: Configuration): void {
    this.inputMin = this.panel.querySelector('.js-settings-panel__values-input_kind_min') as HTMLInputElement;
    this.inputMax = this.panel.querySelector('.js-settings-panel__values-input_kind_max') as HTMLInputElement;
    this.inputStep = this.panel.querySelector('.js-settings-panel__values-input_kind_step') as HTMLInputElement;
    this.inputFrom = this.panel.querySelector('.js-settings-panel__values-input_kind_from') as HTMLInputElement;
    this.inputTo = this.panel.querySelector('.js-settings-panel__values-input_kind_to') as HTMLInputElement;
    this.inputScale = this.panel.querySelector('input[name=scale]') as HTMLInputElement;
    this.inputPointerValue = this.panel.querySelector('input[name=value]') as HTMLInputElement;
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

    const isVisibleValueTo = config && config.hasInterval;
    if (isVisibleValueTo) {
      this.showValueTo();
    } else this.hideValueTo();
  }

  public setMinValue(value: number): void {
    if (!this.inputMin) {
      throw new Error('Input min is not defined');
    }
    if (this.inputFrom) {
      this.inputFrom.min = value.toString();
    }
    if (this.inputTo) {
      this.inputTo.min = value.toString();
    }
    this.inputMin.value = value.toString();
  }

  public setMaxValue(value: number): void {
    if (!this.inputMax) {
      throw new Error('Input max is not defined');
    }
    this.inputMax.value = value.toString();
  }

  public setFromValue(value: number): void {
    if (!this.inputFrom) {
      throw new Error('Input from is not defined');
    }
    this.inputFrom.value = value.toString();
  }

  public setToValue(value: number): void {
    if (!this.inputTo) {
      throw new Error('Input to is not defined');
    }
    this.inputTo.value = value.toString();
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
      this.inputStep.value = value.toString();
    }
    if (this.inputFrom) {
      this.inputFrom.step = value.toString();
    }
    if (this.inputTo) {
      this.inputTo.step = value.toString();
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

  private showValueTo() {
    const valueToContainer = this.panel.querySelector('.js-settings-panel__values-label_kind_to');
    if (!valueToContainer) {
      throw new Error('Container for value to not defined');
    }
    valueToContainer.classList.add('settings-panel__values-label_visible');
    valueToContainer.classList.remove('settings-panel__values-label_hidden');
  }

  private hideValueTo() {
    const valueToContainer = this.panel.querySelector('.js-settings-panel__values-label_kind_to');
    if (!valueToContainer) {
      throw new Error('Container for value to not defined');
    }
    valueToContainer.classList.add('settings-panel__values-label_hidden');
    valueToContainer.classList.remove('settings-panel__values-label_visible');
  }

  private isValueTo(value: boolean) {
    const inputTo = this.panel.querySelector('.js-settings-panel__values-label_kind_to') as HTMLInputElement;
    if (inputTo) {
      if (value) {
        this.showValueTo();
      } else {
        this.hideValueTo();
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
}

export default SettingsPanel;
