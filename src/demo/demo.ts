import './demo.scss';
import SettingsPanel from '../components/settings-panel/settings-panel';
import '../plugin/plugin.ts';

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

const panelContainer = document.querySelector('#panel-0');

if (panelContainer) {
  const slider = $('#slider-0').runForSlider('init', horizontalConfiguration);
  const panel = new SettingsPanel(panelContainer);

  panel.init();
  panel.setFromValueListener((value: number): void => {
    slider.runForSlider('setFrom', value);
  });
  panel.setToValueListener((value: number): void => {
    slider.runForSlider('setTo', value);
  });
}
