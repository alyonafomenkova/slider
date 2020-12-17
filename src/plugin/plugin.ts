import SliderViewImpl from './view/SliderView/SliderViewImpl';
import PointerViewImpl from './view/PointerView/PointerViewImpl';
import ScaleViewImpl from './view/ScaleView/ScaleViewImpl';
import MainViewImpl from './view/MainView/MainViewImpl';
import ViewModel from './view/MainView/ViewModel';
import Model from './model/Model';
import Configuration from './model/Configuration';
import defaultConfiguration from './model/defaultConfiguration';
import Presenter from './presenter/Presenter';
import './jquery-interfaces.ts';
import './styles/slider.scss';

(function ($) {
  const presenters = new Map<string, Presenter>();

  const getElement = (element: any): JQuery<HTMLElement> => (element as JQuery<HTMLElement>);

  const getId = (element: any): string => getElement(element)[0].id;

  const getPresenter = (element: any): Presenter => {
    const id = getId(element);
    const presenter = presenters.get(id);
    if (!presenter) {
      throw new Error(`No presenter mapping found for ID = ${id}`);
    }
    return presenter;
  };

  const methods = {
    init(config: Configuration): void {
      const element = getElement(this)[0];
      const model = new Model(config || defaultConfiguration);
      const viewModel = new ViewModel();
      const sliderView = new SliderViewImpl(element);
      const pointerFromView = new PointerViewImpl('from', element);
      const pointerToView = new PointerViewImpl('to', element);
      const scaleView = new ScaleViewImpl(element);
      const mainView = new MainViewImpl(viewModel, sliderView, scaleView, pointerFromView, pointerToView);
      const presenter = new Presenter(model, mainView, viewModel, config || defaultConfiguration);
      presenter.init();
      presenters.set(element.id, presenter);
    },
    setStep(value: number) { getPresenter(this).setStep(value); },
    setMin(value: number) { getPresenter(this).setMin(value); },
    setMax(value: number) { getPresenter(this).setMax(value); },
    setFrom(value: number) { getPresenter(this).setValueFrom(value); },
    setTo(value: number) { getPresenter(this).setValueTo(value); },
    setScale(value: boolean) { getPresenter(this).setScale(value); },
    setPointerValue(value: boolean) { getPresenter(this).setPointerValue(value); },
    setType(isInterval: boolean) { getPresenter(this).setHasInterval(isInterval); },
    setOrientation(isVertical: boolean) { getPresenter(this).setIsVerticalOrientation(isVertical); },
    setMinListener(listener: (value: number) => void) { getPresenter(this).setMinListener(listener); },
    setMaxListener(listener: (value: number) => void) { getPresenter(this).setMaxListener(listener); },
    setFromListener(listener: (value: number) => void) { getPresenter(this).setValueFromListener(listener); },
    setToListener(listener: (value: number) => void) { getPresenter(this).setValueToListener(listener); },
    setStepListener(listener: (value: number) => void) { getPresenter(this).setStepListener(listener); },
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.setMin = function setMin(value: number): JQuery {
    methods.setMin.call(this, value);
    return this;
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.setMax = function setMax(value: number): JQuery {
    methods.setMax.call(this, value);
    return this;
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.setFrom = function setFrom(value: number): JQuery {
    methods.setFrom.call(this, value);
    return this;
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.setTo = function setTo(value: number): JQuery {
    methods.setTo.call(this, value);
    return this;
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.runForSlider = function (method: string, ...args: any): JQuery {
    if (this.length === 0) {
      throw new Error('Cannot be initialized on a non-existent element!');
    }

    if (method === 'init') {
      methods.init.apply(this, args);
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
