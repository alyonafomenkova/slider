import './jquery-interfaces.ts';
import './styles/slider.scss';
import Presenter from './presenter/Presenter';
import Model from './model/Model';
import SliderViewImpl from './view/impl/SliderViewImpl';
import PointerViewImpl from './view/impl/PointerViewImpl';
import ScaleViewImpl from './view/impl/ScaleViewImpl';
import defaultConfiguration from './model/defaultConfiguration';
(function ($) {
    const presenters = new Map();
    const getElement = (element) => element;
    const getId = (element) => getElement(element)[0].id;
    const getPresenter = (element) => {
        const id = getId(element);
        const presenter = presenters.get(id);
        if (!presenter) {
            throw new Error(`No presenter mapping found for ID = ${id}`);
        }
        return presenter;
    };
    const methods = {
        init(config) {
            const element = getElement(this)[0];
            const model = new Model(config || defaultConfiguration);
            const presenter = new Presenter(model, config || defaultConfiguration);
            const sliderView = new SliderViewImpl(element);
            const pointerFromView = new PointerViewImpl('from', element);
            const pointerToView = new PointerViewImpl('to', element);
            const scaleView = new ScaleViewImpl(element);
            presenter.init(sliderView, pointerFromView, pointerToView, scaleView);
            presenters.set(element.id, presenter);
        },
        setStep(value) { getPresenter(this).setStep(value); },
        setMin(value) { getPresenter(this).setMin(value); },
        setMax(value) { getPresenter(this).setMax(value); },
        setFrom(value) { getPresenter(this).setValueFrom(value); },
        setTo(value) { getPresenter(this).setValueTo(value); },
        setScale(value) { getPresenter(this).setScale(value); },
        setPointerValue(value) { getPresenter(this).setPointerValue(value); },
        setType(isInterval) { getPresenter(this).setHasInterval(isInterval); },
        setOrientation(isVertical) { getPresenter(this).setIsVerticalOrientation(isVertical); },
        setMinListener(listener) { getPresenter(this).setMinListener(listener); },
        setMaxListener(listener) { getPresenter(this).setMaxListener(listener); },
        setFromListener(listener) { getPresenter(this).setValueFromListener(listener); },
        setToListener(listener) { getPresenter(this).setValueToListener(listener); },
        setStepListener(listener) { getPresenter(this).setStepListener(listener); },
    };
    // eslint-disable-next-line no-param-reassign
    $.fn.runForSlider = function (method, ...args) {
        if (method === 'init') {
            methods.init.apply(this, args);
        }
        else if (method === 'setMin') {
            methods.setMin.apply(this, args);
        }
        else if (method === 'setMax') {
            methods.setMax.apply(this, args);
        }
        else if (method === 'setFrom') {
            methods.setFrom.apply(this, args);
        }
        else if (method === 'setTo') {
            methods.setTo.apply(this, args);
        }
        else if (method === 'setMinListener') {
            methods.setMinListener.apply(this, args);
        }
        else if (method === 'setMaxListener') {
            methods.setMaxListener.apply(this, args);
        }
        else if (method === 'setFromListener') {
            methods.setFromListener.apply(this, args);
        }
        else if (method === 'setToListener') {
            methods.setToListener.apply(this, args);
        }
        else if (method === 'setStepListener') {
            methods.setStepListener.apply(this, args);
        }
        else if (method === 'setStep') {
            methods.setStep.apply(this, args);
        }
        else if (method === 'setScale') {
            methods.setScale.apply(this, args);
        }
        else if (method === 'setPointerValue') {
            methods.setPointerValue.apply(this, args);
        }
        else if (method === 'setType') {
            methods.setType.apply(this, args);
        }
        else if (method === 'setOrientation') {
            methods.setOrientation.apply(this, args);
        }
        else {
            throw new Error(`Unknown method name: ${method}`);
        }
        return this;
    };
}(jQuery));
//# sourceMappingURL=plugin.js.map