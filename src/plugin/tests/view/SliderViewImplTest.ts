import SliderView from '../../view/SliderView/SliderView';
import SliderViewImpl from '../../view/SliderView/SliderViewImpl';

const containerClass = 'container';
const setupContainer = (): HTMLElement => {
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
  let container: HTMLElement;
  let view: SliderView;

  beforeEach(() => {
    // Arrange
    container = setupContainer();
    view = new SliderViewImpl(container);
  });

  it('View structure for horizontal / vertical orientations', () => {
    // Act -> assert
    expect(document.querySelector('.slider__bar_view_horizontal')).toBeNull();
    expect(document.querySelector('.slider_view_vertical')).toBeNull();
    expect(document.querySelector('.slider__progress')).toBeNull();

    view.drawHorizontal();

    expect(document.querySelector('.slider__bar_view_horizontal')).not.toBeNull();
    expect(document.querySelector('.slider_view_vertical')).toBeNull();
    expect(document.querySelector('.slider__progress')).not.toBeNull();

    view.clear();

    expect(document.querySelector('.slider__bar_view_horizontal')).toBeNull();
    expect(document.querySelector('.slider_view_vertical')).toBeNull();
    expect(document.querySelector('.slider__progress')).toBeNull();

    view.drawVertical();

    expect(document.querySelector('.slider__bar_view_vertical')).not.toBeNull();
    expect(document.querySelector('.slider_view_horizontal')).toBeNull();
    expect(document.querySelector('.slider__progress')).not.toBeNull();

    view.clear();

    expect(document.querySelector('.slider__bar_view_vertical')).toBeNull();
    expect(document.querySelector('.slider_view_horizontal')).toBeNull();
    expect(document.querySelector('.slider__progress')).toBeNull();
  });

  it('Set size, bound, click listener. Check horizontal / vertical progress', () => {
    // Act -> assert
    container.style.width = '500px';
    container.style.height = '50px';
    container.style.left = '8px';
    container.style.right = '508px';
    container.style.top = '8px';
    container.style.bottom = '58px';

    expect(view.getWidth()).toEqual(500);
    expect(view.getHeight()).toEqual(50);
    expect(view.getBoundLeft()).toEqual(8);
    expect(view.getBoundRight()).toEqual(508);
    expect(view.getBoundTop()).toEqual(8);
    expect(view.getBoundBottom()).toEqual(58);

    view.drawHorizontal();
    view.drawHorizontalProgress(8, 500);

    expect(container.querySelector('.slider__progress')).not.toBeNull();

    view.clear();
    view.drawVertical();
    view.drawVerticalProgress(58, 50);

    expect(container.querySelector('.slider__progress')).not.toBeNull();

    let valueX = -1;
    let valueY = -1;
    view.setClickSliderBarListener((v: SliderView, x: number, y: number) => {
      valueX = x;
      valueY = y;
    });

    const progress = document.querySelector('.slider__progress');

    (progress as HTMLElement).click();
    expect(valueX).toEqual(0);
    expect(valueY).toEqual(0);
  });
});
