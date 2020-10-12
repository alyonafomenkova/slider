import Util from '../../util/Util';
class PointerViewImpl {
    constructor(id, container) {
        this.hasValue = undefined;
        this.pointerContainer = undefined;
        this.downEventListener = undefined;
        this.moveEventListener = undefined;
        this.upEventListener = undefined;
        this.handleMouseDown = (evt) => {
            if (this.downEventListener) {
                this.downEventListener(this, evt.clientX, evt.clientY);
            }
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
        };
        this.handleMouseMove = (evt) => {
            if (this.moveEventListener) {
                this.moveEventListener(this, evt.clientX, evt.clientY);
            }
        };
        this.handleMouseUp = (evt) => {
            if (this.upEventListener) {
                this.upEventListener(this, evt.clientX, evt.clientY);
            }
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
        };
        this.container = container;
    }
    show() {
        if (this.pointerContainer) {
            this.pointerContainer.style.visibility = 'visible';
        }
        else {
            throw new Error('Pointer container is not defined.');
        }
    }
    hide() {
        if (this.pointerContainer) {
            this.pointerContainer.style.visibility = 'hidden';
        }
        else {
            throw new Error('Pointer container is not defined.');
        }
    }
    showValue() {
        if (this.pointerContainer) {
            const valueContainer = this.pointerContainer.querySelector('.slider__value');
            valueContainer.style.visibility = 'visible';
        }
        else {
            throw new Error('Pointer container is not defined.');
        }
    }
    hideValue() {
        if (this.pointerContainer) {
            const valueContainer = this.pointerContainer.querySelector('.slider__value');
            valueContainer.style.visibility = 'hidden';
        }
        else {
            throw new Error('Pointer container is not defined.');
        }
    }
    draw(hasValue) {
        const template = '<div class="slider__pointer"></div>';
        this.pointerContainer = Util.createElement(this.container, 'slider__pointer-container', template);
        this.setupMouseListeners();
        this.hasValue = hasValue;
        Util.createElement(this.pointerContainer, 'slider__value');
        if (!hasValue) {
            this.hideValue();
        }
    }
    setValue(value) {
        if (this.pointerContainer) {
            const container = this.pointerContainer.querySelector('.slider__value');
            if (container) {
                container.innerHTML = String(value);
            }
        }
        else {
            throw new Error('Pointer container is not defined.');
        }
    }
    setX(value) {
        if (this.pointerContainer) {
            this.pointerContainer.style.transform = 'translate(-50%, 0)';
            this.pointerContainer.style.left = `${value}%`;
        }
    }
    setY(value) {
        if (this.pointerContainer) {
            this.pointerContainer.style.transform = 'translate(0, -50%)';
            this.pointerContainer.style.top = `${value}%`;
        }
    }
    getWidth() {
        if (this.pointerContainer) {
            return this.pointerContainer.getBoundingClientRect().width;
        }
        return 0;
    }
    getHeight() {
        if (this.pointerContainer) {
            return this.pointerContainer.getBoundingClientRect().height;
        }
        return 0;
    }
    getLeft() {
        if (this.pointerContainer) {
            return this.pointerContainer.getBoundingClientRect().left;
        }
        return 0;
    }
    getTop() {
        if (this.pointerContainer) {
            return this.pointerContainer.getBoundingClientRect().top;
        }
        return 0;
    }
    setDownEventListener(listener) {
        this.downEventListener = listener;
    }
    setMoveEventListener(listener) {
        this.moveEventListener = listener;
    }
    setUpEventListener(listener) {
        this.upEventListener = listener;
    }
    setupMouseListeners() {
        if (this.pointerContainer) {
            const pointer = this.pointerContainer.querySelector('.slider__pointer');
            pointer.addEventListener('mousedown', this.handleMouseDown);
        }
        else {
            throw new Error('Pointer container is not defined.');
        }
    }
}
export default PointerViewImpl;
//# sourceMappingURL=PointerViewImpl.js.map