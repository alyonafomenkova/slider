import './jquery-interfaces.ts';
import './styles/slider.scss';
import Presenter from './presenter/Presenter';
import Model from './model/Model';
import defaultConfiguration from './model/defaultConfiguration';
import SliderViewImpl from './view/impl/SliderViewImpl';
import PointerViewImpl from './view/impl/PointerViewImpl';
import ScaleViewImpl from './view/impl/ScaleViewImpl';

const verticalConfiguration = {
  min: 0,
  max: 72,
  step: 10,
  from: 10,
  to: 20,
  isVertical: true,
  hasInterval: true,
  hasValue: true,
  hasScale: true,
};

const horizontalConfiguration = {
  min: 0,
  max: 72,
  step: 10,
  from: 10,
  to: 20,
  isVertical: false,
  hasInterval: true,
  hasValue: true,
  hasScale: true,
};

// объект jQuery оборачиваем в IIFE,
// чтобы знак $ не был переопределён другой библиотекой во время выполнения

// eslint-disable-next-line func-names
(function ($) {
  // создаём свойство-функцию для объекта jQuery. Имя нового свойства -  имя нашего плагина
  // eslint-disable-next-line func-names,no-param-reassign
  $.fn.sliderPlugin = function (): JQuery {
    return this.each((index, element) => {
      const config = index === 0 ? horizontalConfiguration : verticalConfiguration; // DEBUG
      const model = new Model(config);
      const presenter = new Presenter(model);
      const sliderView = new SliderViewImpl(element, presenter);
      const pointerFromView = new PointerViewImpl('from', element, presenter);
      const pointerToView = new PointerViewImpl('to', element, presenter);
      const scaleView = new ScaleViewImpl(element, presenter);
      presenter.init(sliderView, pointerFromView, pointerToView, scaleView);
    });
  };
}(jQuery));
