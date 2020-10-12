import './settings-panel.scss';
class SettingsPanel {
    constructor(panel) {
        this.handleMinInput = (evt) => {
            const { value } = evt.target;
            const num = parseFloat(value);
            if (!Number.isNaN(num) && this.minListener) {
                this.minListener(num);
            }
        };
        this.handleMaxInput = (evt) => {
            const { value } = evt.target;
            const num = parseFloat(value);
            if (!Number.isNaN(num) && this.maxListener) {
                this.maxListener(num);
            }
        };
        this.handleStepInput = (evt) => {
            const { value } = evt.target;
            const num = parseFloat(value);
            if (!Number.isNaN(num) && this.stepListener) {
                this.stepListener(num);
            }
        };
        this.handleFromInput = (evt) => {
            const { value } = evt.target;
            const num = parseFloat(value);
            if (!Number.isNaN(num) && this.fromValueListener) {
                this.fromValueListener(num);
            }
        };
        this.handleInputTo = (evt) => {
            const { value } = evt.target;
            const num = parseFloat(value);
            if (!Number.isNaN(num) && this.toValueListener) {
                this.toValueListener(num);
            }
        };
        this.handleScaleInput = (evt) => {
            const value = evt.target.checked;
            if (this.scaleListener) {
                this.scaleListener(value);
            }
        };
        this.handlePointerValue = (evt) => {
            const value = evt.target.checked;
            if (this.pointerValueListener) {
                this.pointerValueListener(value);
            }
        };
        this.handleType = (evt) => {
            if (this.typeListener) {
                const isInterval = evt.target.classList.contains('settings-panel__input_type_interval');
                if (isInterval) {
                    this.typeListener(true);
                    this.isValueTo(true);
                }
                else {
                    this.typeListener(false);
                    this.isValueTo(false);
                }
            }
        };
        this.handleOrientation = (evt) => {
            if (this.orientationListener) {
                const isVertical = evt.target.classList.contains('settings-panel__input_orientation_vertical');
                this.orientationListener(isVertical);
            }
        };
        this.panel = panel;
    }
    init() {
        this.inputMin = this.panel.querySelector('.settings-panel__values-input_kind_min');
        this.inputMax = this.panel.querySelector('.settings-panel__values-input_kind_max');
        this.inputStep = this.panel.querySelector('.settings-panel__values-input_kind_step');
        this.inputFrom = this.panel.querySelector('.settings-panel__values-input_kind_from');
        this.inputTo = this.panel.querySelector('.settings-panel__values-input_kind_to');
        this.inputScale = this.panel.querySelector('input[name=scale]');
        this.inputPointerValue = this.panel.querySelector('input[name=value]');
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
    isValueTo(value) {
        const inputTo = this.panel.querySelector('.settings-panel__values-label_kind_to');
        if (inputTo) {
            if (value) {
                inputTo.style.display = 'inline';
            }
            else {
                inputTo.style.display = 'none';
            }
        }
    }
    setMinValue(value) {
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
    setMaxValue(value) {
        if (!this.inputMax) {
            throw new Error('Input max is not defined');
        }
        if (this.inputFrom) {
            this.inputFrom.max = value.toString();
        }
        if (this.inputTo) {
            this.inputTo.max = value.toString();
        }
        this.inputMax.value = value.toString();
    }
    setFromValue(value) {
        if (!this.inputFrom) {
            throw new Error('Input from is not defined');
        }
        this.inputFrom.value = value.toString();
    }
    setToValue(value) {
        if (!this.inputTo) {
            throw new Error('Input to is not defined');
        }
        this.inputTo.value = value.toString();
    }
    setMinListener(listener) {
        this.minListener = listener;
    }
    setMaxListener(listener) {
        this.maxListener = listener;
    }
    setFromValueListener(listener) {
        this.fromValueListener = listener;
    }
    setToValueListener(listener) {
        this.toValueListener = listener;
    }
    setStepListener(listener) {
        this.stepListener = listener;
    }
    setStep(value) {
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
    setScaleListener(listener) {
        this.scaleListener = listener;
    }
    setPointerValueListener(listener) {
        this.pointerValueListener = listener;
    }
    setTypeListener(listener) {
        this.typeListener = listener;
    }
    setOrientationListener(listener) {
        this.orientationListener = listener;
    }
}
export default SettingsPanel;
//# sourceMappingURL=settings-panel.js.map