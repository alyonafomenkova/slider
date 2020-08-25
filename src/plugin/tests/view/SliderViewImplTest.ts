import SliderView from '../../view/SliderView';
import SliderViewImpl from '../../view/impl/SliderViewImpl';

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

describe('Test slider view implementation', () => {
  let view: SliderView;

  beforeEach(() => {
    // Arrange
    const container = setupContainer();
    view = new SliderViewImpl(container);
  });

  it('View structure for horizontal / vertical orientations', () => {
    // Act -> assert
    expect(document.querySelector('.slider__bar--horizontal')).toBeNull();
    expect(document.querySelector('.slider--vertical')).toBeNull();
    expect(document.querySelector('.slider__progress')).toBeNull();

    view.drawHorizontal();

    expect(document.querySelector('.slider__bar--horizontal')).not.toBeNull();
    expect(document.querySelector('.slider--vertical')).toBeNull();
    expect(document.querySelector('.slider__progress')).not.toBeNull();

    view.clear();

    expect(document.querySelector('.slider__bar--horizontal')).toBeNull();
    expect(document.querySelector('.slider--vertical')).toBeNull();
    expect(document.querySelector('.slider__progress')).toBeNull();

    view.drawVertical();

    expect(document.querySelector('.slider__bar--vertical')).not.toBeNull();
    expect(document.querySelector('.slider--horizontal')).toBeNull();
    expect(document.querySelector('.slider__progress')).not.toBeNull();

    view.clear();

    expect(document.querySelector('.slider__bar--vertical')).toBeNull();
    expect(document.querySelector('.slider--horizontal')).toBeNull();
    expect(document.querySelector('.slider__progress')).toBeNull();
  });
});
