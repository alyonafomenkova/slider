import './jquery-interfaces.ts';
import './styles/slider.scss';
import Presenter from './presenter/Presenter';
import Model from './model/Model';
import SliderViewImpl from './view/impl/SliderViewImpl';
import PointerViewImpl from './view/impl/PointerViewImpl';
import ScaleViewImpl from './view/impl/ScaleViewImpl';
import Configuration from './model/Configuration';
import defaultConfiguration from './model/defaultConfiguration';

(function ($) {
  let root: JQuery<HTMLElement>;
  let presenter: Presenter;

  const methods = {
    init(config: Configuration): void {
      if (!root) {
        throw new Error('Root JQuery element is not defined');
      }
      if (!config) {
        console.log('No custom configuration defined. Using default one');
      }
      const element = root[0];
      const model = new Model(config || defaultConfiguration);
      presenter = new Presenter(model, config || defaultConfiguration);
      const sliderView = new SliderViewImpl(element, presenter);
      const pointerFromView = new PointerViewImpl('from', element, presenter);
      const pointerToView = new PointerViewImpl('to', element, presenter);
      const scaleView = new ScaleViewImpl(element, presenter);
      presenter.init(sliderView, pointerFromView, pointerToView, scaleView);
    },
    setStep(value: number) { presenter.setStep(value); },
    setMin(value: number) { presenter.setMin(value); },
    setMax(value: number) { presenter.setMax(value); },
    setFrom(value: number) { presenter.setValueFrom(value); },
    setTo(value: number) { presenter.setValueTo(value); },
    setScale(value: boolean) { presenter.setScale(value); },
    setPointerValue(value: boolean) { presenter.setPointerValue(value); },
    setType(isInterval: boolean) { presenter.setHasInterval(isInterval); },
    setOrientation(isVertical: boolean) { presenter.setIsVerticalOrientation(isVertical); },
    setMinListener(listener: (value: number) => void) { presenter.setMinListener(listener); },
    setMaxListener(listener: (value: number) => void) { presenter.setMaxListener(listener); },
    setFromListener(listener: (value: number) => void) { presenter.setValueFromListener(listener); },
    setToListener(listener: (value: number) => void) { presenter.setValueToListener(listener); },
    setStepListener(listener: (value: number) => void) { presenter.setStepListener(listener); },
  };

  $.fn.runForSlider = function (method: string, ...args: any): JQuery {
    root = this;

    if (method === 'init') {
      methods.init.apply(this, args);
    } else if (method === 'setMin') {
      methods.setMin.apply(this, args);
    } else if (method === 'setMax') {
      methods.setMax.apply(this, args);
    } else if (method === 'setFrom') {
      methods.setFrom.apply(this, args);
    } else if (method === 'setTo') {
      methods.setTo.apply(this, args);
    } else if (method === 'setMinListener') {
      methods.setMinListener.apply(this, args);
    } else if (method === 'setMaxListener') {
      methods.setMaxListener.apply(this, args);
    } else if (method === 'setFromListener') {
      methods.setFromListener.apply(this, args);
    } else if (method === 'setToListener') {
      methods.setToListener.apply(this, args);
    } else if (method === 'setStepListener') {
      methods.setStepListener.apply(this, args);
    } else if (method === 'setStep') {
      methods.setStep.apply(this, args);
    } else if (method === 'setScale') {
      methods.setScale.apply(this, args);
    } else if (method === 'setPointerValue') {
      methods.setPointerValue.apply(this, args);
    } else if (method === 'setType') {
      methods.setType.apply(this, args);
    } else if (method === 'setOrientation') {
      methods.setOrientation.apply(this, args);
    } else {
      throw new Error(`Unknown method name: ${method}`);
    }
    return this;
  };
}(jQuery));
