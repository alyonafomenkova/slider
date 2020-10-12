import './demo.scss';
import SettingsPanel from '../components/settings-panel/settings-panel';
import '../plugin/plugin.ts';
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
    min: -0.5,
    max: 0.75,
    step: 0.05,
    from: 0,
    to: 0.7,
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
const createPanelWithSlider = (panelId, sliderId, config) => {
    const container = document.querySelector(panelId);
    if (!container) {
        throw new Error(`Container not found for panel ID = ${panelId}`);
    }
    const slider = $(sliderId).runForSlider('init', config);
    const panel = new SettingsPanel(container);
    panel.init();
    panel.setFromValueListener((value) => { slider.runForSlider('setFrom', value); });
    panel.setToValueListener((value) => { slider.runForSlider('setTo', value); });
    panel.setMinListener((value) => { slider.runForSlider('setMin', value); });
    panel.setMaxListener((value) => { slider.runForSlider('setMax', value); });
    panel.setStepListener((value) => { slider.runForSlider('setStep', value); });
    panel.setScaleListener((value) => { slider.runForSlider('setScale', value); });
    panel.setPointerValueListener((value) => { slider.runForSlider('setPointerValue', value); });
    panel.setTypeListener((value) => { slider.runForSlider('setType', value); });
    panel.setOrientationListener((value) => { slider.runForSlider('setOrientation', value); });
    slider
        .runForSlider('setMinListener', (min) => { panel.setMinValue(min); })
        .runForSlider('setMaxListener', (max) => { panel.setMaxValue(max); })
        .runForSlider('setFromListener', (from) => { panel.setFromValue(from); })
        .runForSlider('setToListener', (to) => { panel.setToValue(to); })
        .runForSlider('setStepListener', (step) => { panel.setStep(step); });
};
createPanelWithSlider('#panel-0', '#slider-0', configuration0);
createPanelWithSlider('#panel-1', '#slider-1', configuration1);
createPanelWithSlider('#panel-2', '#slider-2', configuration2);
createPanelWithSlider('#panel-3', '#slider-3');
//# sourceMappingURL=demo.js.map