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
  slider.runForSlider('setMinListener', (min: number): void => {
    panel.setMinValue(min);
  });
  slider.runForSlider('setMaxListener', (max: number): void => {
    panel.setMaxValue(max);
  });
  slider.runForSlider('setFromListener', (from: number): void => {
    panel.setFromValue(from);
  });
  slider.runForSlider('setToListener', (to: number): void => {
    panel.setToValue(to);
  });
  slider.runForSlider('setStepListener', (step: number): void => {
    panel.setStep(step);
  });
  panel.setMinListener((value: number): void => {
    slider.runForSlider('setMin', value);
  });
  panel.setMaxListener((value: number): void => {
    slider.runForSlider('setMax', value);
  });
  panel.setStepListener((value: number): void => {
    slider.runForSlider('setStep', value);
  });
  panel.setScaleListener((value: boolean): void => {
    slider.runForSlider('setScale', value);
  });
  panel.setPointerValueListener((value: boolean): void => {
    slider.runForSlider('setPointerValue', value);
  });
  panel.setTypeListener((value: boolean): void => {
    slider.runForSlider('setType', value);
  });
  panel.setOrientationListener((value: boolean): void => {
    slider.runForSlider('setOrientation', value);
  });
}
