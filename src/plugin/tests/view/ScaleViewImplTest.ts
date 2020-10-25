import ScaleViewImpl from '../../view/ScaleView/ScaleViewImpl';
import ScaleItem from '../../view/ScaleView/ScaleItem';
import ScaleView from '../../view/ScaleView/ScaleView';

const containerClass = 'container';
const setupContainer = (): Element => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.className = containerClass;

  if (!body) {
    throw new Error('Document body not found');
  }
  body.innerHTML = '';
  body.append(container);
  return container;
};
const items = [
  new ScaleItem(0, 0),
  new ScaleItem(1, 50),
  new ScaleItem(2, 100),
];

describe('Test scale view implementation', () => {
  let view: ScaleView;

  beforeEach(() => {
    // Arrange
    const container = setupContainer();
    view = new ScaleViewImpl(container);
  });

  it('View structure', () => {
    // Act -> assert
    expect(document.querySelector('.slider__scale')).toBeNull();

    view.addItems(items, false);

    expect(document.querySelector('.slider__scale')).not.toBeNull();
    expect(document.querySelectorAll('.slider__scale-item').length).toEqual(items.length);
    expect(document.querySelectorAll('.slider__scale-division').length).toEqual(items.length);
    expect(document.querySelectorAll('.slider__scale-value').length).toEqual(items.length);
  });

  it('Show / hide', () => {
    // Act -> assert
    view.addItems(items, true);
    const scale = document.querySelector('.slider__scale') as HTMLElement;

    expect(scale.style.visibility).toEqual('');

    view.hide();

    expect(scale.style.visibility).toEqual('hidden');

    view.show();

    expect(scale.style.visibility).toEqual('visible');
  });

  it('Click listener', () => {
    // Act -> assert
    let lastValue = -1;
    view.addItems(items, true);
    view.setClickListener((v: ScaleView, value: number) => {
      lastValue = value;
    });
    const elements = document.querySelectorAll('.slider__scale-item');

    (elements[0] as HTMLElement).click();

    expect(lastValue).toEqual(0);

    (elements[1] as HTMLElement).click();

    expect(lastValue).toEqual(1);

    (elements[2] as HTMLElement).click();

    expect(lastValue).toEqual(2);
  });
});
