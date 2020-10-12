import Subject from '../model/Subject';
import ScaleItem from '../view/ScaleItem';
import Util from '../util/Util';
class Presenter {
    constructor(model, configuration) {
        this.MAX_SCALE_ITEMS_STEP = 26;
        this.sliderView = undefined;
        this.pointerFromView = undefined;
        this.pointerToView = undefined;
        this.scaleView = undefined;
        this.scaleClickListener = (view, value) => {
            if (!this.pointerFromView || !this.pointerToView) {
                throw new Error('Either pointerFromView or pointerToView is not defined');
            }
            const isInterval = this.model.isInterval();
            const from = this.model.getFrom();
            const to = this.model.getTo();
            let pointerView;
            if (isInterval) {
                const diffBetweenValueAndFrom = Math.abs(value - from);
                const diffBetweenValueAndTo = Math.abs(value - to);
                if (diffBetweenValueAndFrom <= diffBetweenValueAndTo) {
                    pointerView = this.pointerFromView;
                }
                else {
                    pointerView = this.pointerToView;
                }
            }
            else {
                pointerView = this.pointerFromView;
            }
            if (this.sliderView && pointerView) {
                this.setupPositionByValue(pointerView, value);
                this.calculateValue(pointerView);
                this.updateProgress(this.sliderView);
            }
        };
        this.pointerDownEventListener = (view, x, y) => {
            this.setPointerPosition(view, x, y);
        };
        this.pointerMoveEventListener = (view, x, y) => {
            this.setPointerPosition(view, x, y);
        };
        this.pointerUpEventListener = (view, x, y) => {
            this.setPointerPosition(view, x, y);
        };
        this.sliderBarClickListener = (view, x, y) => {
            if (this.pointerFromView) {
                let posFrom;
                let pointerView;
                if (this.pointerToView && this.model.isInterval()) {
                    let posTo;
                    let diffBetweenValueAndFrom;
                    let diffBetweenValueAndTo;
                    if (this.isVertical.getValue()) {
                        posFrom = this.pointerFromView.getTop() - this.pointerFromView.getHeight() / 2;
                        posTo = this.pointerToView.getTop() - this.pointerToView.getHeight() / 2;
                        diffBetweenValueAndFrom = Math.abs(y - posFrom);
                        diffBetweenValueAndTo = Math.abs(y - posTo);
                    }
                    else {
                        posFrom = this.pointerFromView.getLeft() + this.pointerFromView.getWidth() / 2;
                        posTo = this.pointerToView.getLeft() + this.pointerToView.getWidth() / 2;
                        diffBetweenValueAndFrom = Math.abs(x - posFrom);
                        diffBetweenValueAndTo = Math.abs(x - posTo);
                    }
                    if (diffBetweenValueAndFrom <= diffBetweenValueAndTo) {
                        pointerView = this.pointerFromView;
                    }
                    else {
                        pointerView = this.pointerToView;
                    }
                }
                else {
                    pointerView = this.pointerFromView;
                }
                this.setPointerPosition(pointerView, x, y);
            }
        };
        this.model = model;
        this.isVertical = new Subject(configuration.isVertical);
        this.hasValue = new Subject(configuration.hasValue);
        this.hasScale = new Subject(configuration.hasScale);
    }
    initPointerFrom(view) {
        view.draw(this.hasValue.getValue());
        view.setDownEventListener(this.pointerDownEventListener);
        view.setMoveEventListener(this.pointerMoveEventListener);
        view.setUpEventListener(this.pointerUpEventListener);
        this.model.attachValueFrom((value) => {
            if (this.pointerFromView) {
                this.pointerFromView.setValue(value);
            }
        });
        this.setupPositionByValue(view, this.model.getFrom());
        this.calculateValue(view);
    }
    initPointerTo(view) {
        view.draw(this.hasValue.getValue());
        view.setDownEventListener(this.pointerDownEventListener);
        view.setMoveEventListener(this.pointerMoveEventListener);
        view.setUpEventListener(this.pointerUpEventListener);
        this.model.attachValueTo((value) => {
            if (this.pointerToView) {
                this.pointerToView.setValue(value);
            }
        });
        this.setupPositionByValue(view, this.model.getTo());
        this.calculateValue(view);
        if (!this.model.isInterval()) {
            view.hide();
        }
        if (!this.hasValue.getValue()) {
            view.hideValue();
        }
    }
    updateHorizontalProgress(sliderView) {
        if (!this.pointerFromView || !this.pointerToView) {
            throw new Error('Either pointerFromView or pointerToView is not defined');
        }
        const isInterval = this.model.isInterval();
        const posMin = sliderView.getBoundLeft();
        const posFrom = this.pointerFromView.getLeft() + this.pointerFromView.getWidth() / 2;
        let start;
        let end;
        if (isInterval) {
            const posTo = this.pointerToView.getLeft() + this.pointerToView.getWidth() / 2;
            start = posFrom - posMin;
            end = posTo;
        }
        else {
            start = 0;
            end = posFrom;
        }
        const width = Math.abs(end - start - posMin);
        const startInPercent = (start / sliderView.getWidth()) * 100;
        const widthInPercent = (width / sliderView.getWidth()) * 100;
        sliderView.drawHorizontalProgress(startInPercent, widthInPercent);
    }
    updateVerticalProgress(sliderView) {
        if (!this.pointerFromView || !this.pointerToView) {
            throw new Error('Either pointerFromView or pointerToView is not defined');
        }
        const isInterval = this.model.isInterval();
        const posMax = sliderView.getBoundBottom();
        const posFrom = posMax - this.pointerFromView.getTop() - this.pointerFromView.getHeight() / 2;
        let start;
        let end;
        if (isInterval) {
            const posTo = posMax - this.pointerToView.getTop() - this.pointerToView.getHeight() / 2;
            start = posFrom;
            end = posTo;
        }
        else {
            start = 0;
            end = posFrom;
        }
        const height = Math.abs(start - end);
        const startInPercent = (start / sliderView.getHeight()) * 100;
        const heightInPercent = (height / sliderView.getHeight()) * 100;
        sliderView.drawVerticalProgress(startInPercent, heightInPercent);
    }
    updateProgress(sliderView) {
        if (this.isVertical.getValue()) {
            this.updateVerticalProgress(sliderView);
        }
        else {
            this.updateHorizontalProgress(sliderView);
        }
    }
    init(sliderView, pointerFromView, pointerToView, scaleView) {
        this.sliderView = sliderView;
        this.pointerFromView = pointerFromView;
        this.pointerToView = pointerToView;
        this.scaleView = scaleView;
        sliderView.clear();
        if (this.isVertical.getValue()) {
            sliderView.drawVertical();
        }
        else {
            sliderView.drawHorizontal();
        }
        this.setupScale(scaleView);
        if (!this.hasScale.getValue()) {
            this.scaleView.hide();
        }
        this.initPointerFrom(pointerFromView);
        this.initPointerTo(pointerToView);
        this.updateProgress(sliderView);
        sliderView.setClickSliderBarListener(this.sliderBarClickListener);
    }
    setupScale(view) {
        if (this.sliderView) {
            const items = [];
            const min = this.model.getMin();
            const max = this.model.getMax();
            const sliderWidth = this.sliderView.getWidth();
            const sliderHeight = this.sliderView.getHeight();
            const step = this.model.getStep();
            const count = Math.floor((max - min) / step);
            const isVertical = this.isVertical.getValue();
            const stepWidth = isVertical ? (sliderHeight / count) : (sliderWidth / count);
            const itemStep = this.getItemsStep(stepWidth);
            for (let i = 0; i <= count; i += itemStep) {
                const value = min + step * i;
                const rounded = Util.roundWithEpsilon(value);
                const percent = ((value - min) * 100) / (max - min);
                items.push(new ScaleItem(rounded, percent));
            }
            view.addItems(items, isVertical);
            view.setClickListener(this.scaleClickListener);
        }
    }
    getItemsStep(stepWidth) {
        let step = 1;
        let width = stepWidth;
        while (width < this.MAX_SCALE_ITEMS_STEP) {
            width *= 2;
            step *= 2;
        }
        return step;
    }
    setPointerPosition(view, x, y) {
        if (this.isVertical.getValue()) {
            this.setPointerY(view, y);
        }
        else {
            this.setPointerX(view, x);
        }
        this.calculateValue(view);
        if (!this.sliderView) {
            throw new Error('sliderView is undefined');
        }
        this.updateProgress(this.sliderView);
    }
    calculateValue(view) {
        if (this.sliderView) {
            const pointerHalfWidth = view.getWidth() / 2;
            const pointerHalfHeight = view.getHeight() / 2;
            const min = this.model.getMin();
            const max = this.model.getMax();
            const step = this.model.getStep();
            const from = this.model.getFrom();
            const to = this.model.getTo();
            const isInterval = this.model.isInterval();
            const stepsTotal = (max - min) / step;
            let value;
            if (this.isVertical.getValue()) {
                const posY = view.getTop() + pointerHalfHeight - this.sliderView.getBoundTop();
                const stepHeight = this.sliderView.getHeight() / stepsTotal;
                if (Math.floor(posY) === 0) {
                    value = max;
                }
                else {
                    value = Math.round((this.sliderView.getHeight() - posY) / stepHeight) * step + min;
                }
            }
            else {
                const posX = view.getLeft() + pointerHalfWidth - this.sliderView.getBoundLeft();
                const stepWidth = this.sliderView.getWidth() / stepsTotal;
                if (Math.floor(posX) < Math.floor(this.sliderView.getWidth())) {
                    value = Math.round(posX / stepWidth) * step + min;
                }
                else {
                    value = max;
                }
            }
            const rounded = Util.roundWithEpsilon(value);
            if (view === this.pointerFromView) {
                if (isInterval) {
                    this.model.setFrom(rounded > to ? to : rounded);
                }
                else {
                    this.model.setFrom(rounded);
                }
            }
            else {
                this.model.setTo(rounded < from ? from : rounded);
            }
        }
        else {
            throw new Error('Slider view is undefined');
        }
    }
    setMin(value) {
        const max = this.model.getMax();
        const step = this.model.getStep();
        if (this.pointerFromView && this.pointerToView) {
            if (this.sliderView && this.scaleView) {
                this.model.setMin(value >= max - step ? max - step : value);
                this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
            }
        }
    }
    setMax(value) {
        if (this.pointerFromView && this.pointerToView) {
            if (this.sliderView && this.scaleView) {
                const min = this.model.getMin();
                const step = this.model.getStep();
                this.model.setMax(value <= min + step ? min + step : value);
                this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
            }
        }
    }
    setStep(value) {
        if (this.pointerFromView && this.pointerToView) {
            if (this.sliderView && this.scaleView) {
                this.model.setStep(value);
                this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
            }
        }
    }
    setValueFrom(value) {
        if (!this.pointerFromView) {
            throw new Error('Pointer view from not defined');
        }
        if (!this.sliderView) {
            throw new Error('Slider view is not defined');
        }
        this.setupPositionByValue(this.pointerFromView, value);
        this.calculateValue(this.pointerFromView);
        this.updateProgress(this.sliderView);
    }
    setValueTo(value) {
        if (!this.pointerToView) {
            throw new Error('Pointer view to not defined');
        }
        if (!this.sliderView) {
            throw new Error('Slider view is not defined');
        }
        if (this.model.isInterval()) {
            this.setupPositionByValue(this.pointerToView, value);
            this.calculateValue(this.pointerToView);
            this.updateProgress(this.sliderView);
        }
    }
    setScale(value) {
        this.hasScale.setValue(value);
        if (this.scaleView) {
            if (value) {
                this.scaleView.show();
            }
            else {
                this.scaleView.hide();
            }
        }
    }
    setPointerValue(value) {
        this.hasValue.setValue(value);
        if (this.pointerFromView && this.pointerToView) {
            if (value) {
                this.pointerFromView.showValue();
                if (this.model.isInterval()) {
                    this.pointerToView.showValue();
                }
                else {
                    this.pointerToView.hideValue();
                }
            }
            else {
                this.pointerFromView.hideValue();
                this.pointerToView.hideValue();
            }
        }
    }
    setHasInterval(value) {
        this.model.setInterval(value);
        if (this.sliderView && this.pointerToView) {
            if (value) {
                const from = this.model.getFrom();
                const to = this.model.getTo();
                const step = this.model.getStep();
                const max = this.model.getMax();
                if (from === max) {
                    this.model.setFrom(max - step);
                    this.model.setTo(max);
                    this.setValueFrom(max - step);
                    this.setValueTo(max);
                }
                else if (from >= to) {
                    this.model.setTo(from + step);
                    this.setValueTo(from + step);
                }
                this.pointerToView.show();
                if (this.hasValue.getValue()) {
                    this.pointerToView.showValue();
                }
                else {
                    this.pointerToView.hideValue();
                }
            }
            else {
                this.pointerToView.hide();
                this.pointerToView.hideValue();
            }
            this.updateProgress(this.sliderView);
        }
    }
    setIsVerticalOrientation(value) {
        this.isVertical.setValue(value);
        if (this.pointerFromView && this.pointerToView) {
            if (this.sliderView && this.scaleView) {
                this.init(this.sliderView, this.pointerFromView, this.pointerToView, this.scaleView);
            }
        }
    }
    setValueFromListener(listener) {
        this.model.attachValueFrom(listener);
    }
    setMinListener(listener) {
        this.model.attachMin(listener);
    }
    setMaxListener(listener) {
        this.model.attachMax(listener);
    }
    setValueToListener(listener) {
        this.model.attachValueTo(listener);
    }
    setStepListener(listener) {
        this.model.attachStep(listener);
    }
    setupPositionByValue(view, value) {
        if (this.sliderView) {
            const min = this.model.getMin();
            const max = this.model.getMax();
            let posMin;
            let posMax;
            let centerOfPointer;
            if (this.isVertical.getValue()) {
                posMin = this.sliderView.getBoundTop();
                posMax = this.sliderView.getBoundBottom();
                centerOfPointer = (((value - min) * (posMin - posMax)) / (max - min)) + posMax;
                this.setPointerY(view, centerOfPointer);
            }
            else {
                posMin = this.sliderView.getBoundLeft();
                posMax = this.sliderView.getBoundRight();
                centerOfPointer = (((value - min) * (posMax - posMin)) / (max - min)) + posMin;
                this.setPointerX(view, centerOfPointer);
            }
            if (centerOfPointer) {
                return centerOfPointer;
            }
        }
        return undefined;
    }
    setPointerX(view, x) {
        if (!this.pointerFromView || !this.pointerToView) {
            throw new Error('Either pointerFromView or pointerToView is not defined');
        }
        if (this.sliderView) {
            let posX = x - this.sliderView.getBoundLeft();
            const xMin = 0;
            const xMax = this.sliderView.getWidth();
            const min = this.model.getMin();
            const max = this.model.getMax();
            const step = this.model.getStep();
            const stepCount = (max - min) / step;
            const stepX = this.sliderView.getWidth() / stepCount;
            const stepsTotal = (max - min) / step;
            const stepWidth = this.sliderView.getWidth() / stepsTotal;
            const isInterval = this.model.isInterval();
            posX = Math.round(posX / stepX) * stepX;
            if (isInterval) {
                if (view === this.pointerFromView) {
                    const pointerToX = ((this.model.getTo() - min) / step) * stepWidth;
                    if (posX > pointerToX - stepWidth) {
                        posX = pointerToX - stepWidth;
                    }
                }
                else {
                    const pointerFromX = ((this.model.getFrom() - min) / step) * stepWidth;
                    if (posX < pointerFromX + stepWidth) {
                        posX = pointerFromX + stepWidth;
                    }
                }
            }
            if (posX > xMax) {
                posX = xMax;
            }
            else if (posX < xMin) {
                posX = xMin;
            }
            const percent = (posX / this.sliderView.getWidth()) * 100;
            view.setX(percent);
        }
    }
    setPointerY(view, y) {
        if (!this.pointerFromView || !this.pointerToView) {
            throw new Error('Either pointerFromView or pointerToView is not defined');
        }
        if (this.sliderView) {
            let posY = y - this.sliderView.getBoundTop();
            const yMin = 0;
            const yMax = this.sliderView.getHeight();
            const min = this.model.getMin();
            const max = this.model.getMax();
            const step = this.model.getStep();
            const stepCount = (max - min) / step;
            const stepY = this.sliderView.getHeight() / stepCount;
            const stepHeight = this.sliderView.getHeight() / stepCount;
            const offset = this.sliderView.getHeight() - Math.floor(stepCount) * stepHeight;
            const isInterval = this.model.isInterval();
            posY = Math.round((posY - offset) / stepY) * stepY + offset;
            if (isInterval) {
                if (view === this.pointerFromView) {
                    const pointerToY = Math.abs(((this.model.getTo() - max) / step) * stepHeight);
                    if (posY < pointerToY + stepHeight) {
                        posY = pointerToY + stepHeight;
                    }
                }
                else {
                    const pointerFromY = Math.abs(((this.model.getFrom() - max) / step)) * stepHeight;
                    if (posY > pointerFromY - stepHeight) {
                        posY = pointerFromY - stepHeight;
                    }
                }
            }
            if (posY > yMax) {
                posY = yMax;
            }
            else if (posY < yMin) {
                posY = yMin;
            }
            const percent = (posY / this.sliderView.getHeight()) * 100;
            view.setY(percent);
        }
    }
}
export default Presenter;
//# sourceMappingURL=Presenter.js.map