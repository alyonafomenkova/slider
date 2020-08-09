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
    setFromListener(listener: (value: number) => void): void {
      if (!presenter) {
        throw new Error('Presenter is not defined. Init slider first');
      }
      presenter.setValueFromListener(listener);
    },
  };

  $.fn.runForSlider = function (method: string, ...args: any): JQuery {
    root = this;

    if (method === 'init') {
      methods.init.apply(this, args);
    } else if (method === 'setFrom') {
      methods.setFrom.apply(this, args);
    } else if (method === 'setTo') {
      methods.setTo.apply(this, args);
    } else if (method === 'setFromListener') {
      methods.setFromListener.apply(this, args);
    } else {
      throw new Error(`Unknown method name: ${method}`);
    }
    return this;
  };
}(jQuery));
