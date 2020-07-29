import './demo.scss';
import SettingsPanel from '../components/settings-panel/settings-panel';
import '../plugin/plugin.ts';

const panels = document.querySelectorAll('.settings-panel');

panels.forEach((it) => {
  const panel = new SettingsPanel(it as HTMLElement);
});

// eslint-disable-next-line fsd/jq-use-js-prefix-in-selector
$('.slider').sliderPlugin({ min: 1, max: 5, step: 1 });
