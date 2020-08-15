import './jquery-interfaces.ts';
import './styles/slider.scss';
import Presenter from './presenter/Presenter';
import Model from './model/Model';
import SliderViewImpl from './view/impl/SliderViewImpl';
import PointerViewImpl from './view/impl/PointerViewImpl';
import ScaleViewImpl from './view/impl/ScaleViewImpl';
import Configuration from './model/Configuration';

(function ($) {
  let root: JQuery<HTMLElement>;
  let presenter: Presenter;

  const methods = {
    init(config: Configuration): void {
      if (!root) {
        throw new Error('Root JQuery element is not defined');
      }
      const element = root[0];
      const model = new Model(config);
      presenter = new Presenter(model);
      const sliderView = new SliderViewImpl(element, presenter);
      const pointerFromView = new PointerViewImpl('from', element, presenter);
      const pointerToView = new PointerViewImpl('to', element, presenter);
      const scaleView = new ScaleViewImpl(element, presenter);
      presenter.init(sliderView, pointerFromView, pointerToView, scaleView);
    },
    setStep(value: number): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setStep(value);
    },
    setMin(value: number): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setMin(value);
    },
    setMax(value: number): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setMax(value);
    },
    setFrom(value: number): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setValueFrom(value);
    },
    setTo(value: number): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setValueTo(value);
    },
    setScale(value: boolean): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setScale(value);
    },
    setPointerValue(value: boolean): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setPointerValue(value);
    },
    setType(isInterval: boolean): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setHasInterval(isInterval);
    },
    setOrientation(isVertical: boolean): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setIsVerticalOrientation(isVertical);
    },
    setMinListener(listener: (value: number) => void): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setMinListener(listener);
    },
    setMaxListener(listener: (value: number) => void): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setMaxListener(listener);
    },
    setFromListener(listener: (value: number) => void): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setValueFromListener(listener);
    },
    setToListener(listener: (value: number) => void): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setValueToListener(listener);
    },
    setStepListener(listener: (value: number) => void): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setStepListener(listener);
    },
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
