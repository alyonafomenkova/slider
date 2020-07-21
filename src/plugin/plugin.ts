import './jquery-interfaces.ts';
import './styles/slider.scss';
import Presenter from './presenter/Presenter';
import Model from './model/Model';
import defaultConfiguration from './model/defaultConfiguration';
import SliderViewImpl from './view/impl/SliderViewImpl';

const verticalConfiguration = {
  min: 0,
  max: 100,
  step: 10,
  from: 20,
  to: 70,
  isVertical: true,
  hasInterval: true,
  hasPointer: true,
  hasScale: true,
};

// объект jQuery оборачиваем в IIFE,
// чтобы знак $ не был переопределён другой библиотекой во время выполнения

// eslint-disable-next-line func-names
(function ($) {
  // создаём свойство-функцию для объекта jQuery. Имя нового свойства -  имя нашего плагина
  // eslint-disable-next-line func-names
  $.fn.sliderPlugin = function (): JQuery {
    return this.each((index, element) => {
      //const model = new Model(verticalConfiguration);
      const model = new Model(defaultConfiguration);
      const presenter = new Presenter(model);
      const sliderView = new SliderViewImpl(element, presenter);
      presenter.init(sliderView);
    });
  };
}(jQuery));
