import SettingsPanel from '../components/settings-panel/settings-panel';
import Configuration from '../plugin/model/Configuration';
import '../plugin/plugin.ts';
import './demo.scss';
import defaultConfiguration from '../plugin/model/defaultConfiguration';

const configuration0 = {
  min: -5,
  max: 105,
  step: 10,
  from: 5,
  to: 90,
  isVertical: false,
  hasInterval: false,
  hasValue: true,
  hasScale: true,
};

const configuration1 = {
  min: 0,
  max: 20,
  step: 2,
  from: 0,
  to: 10,
  isVertical: true,
  hasInterval: false,
  hasValue: true,
  hasScale: true,
};

const configuration2 = {
  min: 10,
  max: 20,
  step: 2,
  from: 12,
  to: 18,
  isVertical: true,
  hasInterval: true,
  hasValue: true,
  hasScale: true,
};

const createPanelWithSlider = (panelId: string, sliderId: string, config?: Configuration) => {
  const container = document.querySelector(panelId) as HTMLElement;
  if (!container) {
    throw new Error(`Container not found for panel ID = ${panelId}`);
  }
  const slider = $(sliderId).initSlider(config || defaultConfiguration);
  const panel = new SettingsPanel(container);

  panel.init(config);
  panel.setFromValueListener((value: number) => { slider.setFrom(value); });
  panel.setToValueListener((value: number) => { slider.setTo(value); });
  panel.setMinListener((value: number) => { slider.setMin(value); });
  panel.setMaxListener((value: number) => { slider.setMax(value); });
  panel.setStepListener((value: number) => { slider.setStep(value); });
  panel.setScaleListener((value: boolean) => { slider.setScale(value); });
  panel.setPointerValueListener((value: boolean) => { slider.setPointerValue(value); });
  panel.setTypeListener((value: boolean) => { slider.setType(value); });
  panel.setOrientationListener((value: boolean) => { slider.setOrientation(value); });

  slider
    .setMinListener((min: number) => { panel.setMinValue(min); })
    .setMaxListener((max: number) => { panel.setMaxValue(max); })
    .setFromListener((from: number) => { panel.setFromValue(from); })
    .setToListener((to: number) => { panel.setToValue(to); })
    .setStepListener((step: number) => { panel.setStep(step); });
};

createPanelWithSlider('#panel-0', '#slider-0', configuration0);
createPanelWithSlider('#panel-1', '#slider-1', configuration1);
createPanelWithSlider('#panel-2', '#slider-2', configuration2);
createPanelWithSlider('#panel-3', '#slider-3');
