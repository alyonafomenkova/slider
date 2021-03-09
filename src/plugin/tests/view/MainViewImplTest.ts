import {
  anything, capture, instance, mock, resetCalls, verify, when,
} from 'ts-mockito';

import SliderView from '../../view/SliderView/SliderView';
import PointerView from '../../view/PointerView/PointerView';
import ScaleView from '../../view/ScaleView/ScaleView';
import MainView from '../../view/MainView/MainView';
import MainViewImpl from '../../view/MainView/MainViewImpl';

// Mocks
const mockSliderView = mock<SliderView>();
const mockPointerFromView = mock<PointerView>();
const mockPointerToView = mock<PointerView>();
const mockScaleView = mock<ScaleView>();

const resetAllMockCalls = () => {
  resetCalls(mockSliderView);
  resetCalls(mockPointerFromView);
  resetCalls(mockPointerToView);
  resetCalls(mockScaleView);
};

const arrangeHorizontalSlider = () => {
  // Arrange mock slider view
  when(mockSliderView.getBoundLeft()).thenReturn(0);
  when(mockSliderView.getBoundTop()).thenReturn(0);
  when(mockSliderView.getBoundRight()).thenReturn(1000);
  when(mockSliderView.getBoundBottom()).thenReturn(100);
  when(mockSliderView.getWidth()).thenReturn(1000);
  when(mockSliderView.getHeight()).thenReturn(100);

  // Arrange mock pointer from view
  when(mockPointerFromView.getWidth()).thenReturn(25);
  when(mockPointerFromView.getHeight()).thenReturn(25);
  when(mockPointerFromView.getLeft()).thenReturn(100);
  when(mockPointerFromView.getTop()).thenReturn(50);

  // Arrange mock pointer to view
  when(mockPointerToView.getWidth()).thenReturn(25);
  when(mockPointerToView.getHeight()).thenReturn(25);
  when(mockPointerToView.getLeft()).thenReturn(900);
  when(mockPointerToView.getTop()).thenReturn(50);
};

const arrangeVerticalSlider = () => {
  // Arrange mock slider view
  when(mockSliderView.getBoundLeft()).thenReturn(0);
  when(mockSliderView.getBoundTop()).thenReturn(0);
  when(mockSliderView.getBoundRight()).thenReturn(100);
  when(mockSliderView.getBoundBottom()).thenReturn(1000);
  when(mockSliderView.getWidth()).thenReturn(100);
  when(mockSliderView.getHeight()).thenReturn(1000);

  // Arrange mock pointer from view
  when(mockPointerFromView.getWidth()).thenReturn(25);
  when(mockPointerFromView.getHeight()).thenReturn(25);
  when(mockPointerFromView.getLeft()).thenReturn(50);
  when(mockPointerFromView.getTop()).thenReturn(900);

  // Arrange mock pointer to view
  when(mockPointerToView.getWidth()).thenReturn(25);
  when(mockPointerToView.getHeight()).thenReturn(25);
  when(mockPointerToView.getLeft()).thenReturn(50);
  when(mockPointerToView.getTop()).thenReturn(100);
};

describe('Test main view implementation', () => {
  let view: MainView;

  beforeEach(() => {
    resetAllMockCalls();
    const sliderView = instance(mockSliderView);
    const pointerFromView = instance(mockPointerFromView);
    const pointerToView = instance(mockPointerToView);
    const scaleView = instance(mockScaleView);

    view = new MainViewImpl(sliderView, scaleView, pointerFromView, pointerToView);
  });

  it('Clear, draw horizontal slider, init pointerFrom view, slider bar click.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    const isInterval = false;
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeHorizontalSlider();

    // Act
    view.clear();
    view.setIsVertical(false);
    view.isVerticalOrientation();
    view.draw();
    view.initPointerFrom(5, 0, 100, 1, false, 20, false);
    view.setSliderBarClickListener(listener);
    view.updateProgress(isInterval);
    view.setPositionBySliderBarClick(123, 123, 0, 100, 1, 5, 20);

    // Assert
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockSliderView.getBoundLeft()).times(7);
    verify(mockPointerFromView.getLeft()).times(4);
    verify(mockPointerFromView.getWidth()).times(4);
  });

  it('Slider bar click, has interval, init pointerTo view, vertical.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    const isInterval = true;
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeVerticalSlider();

    // Act
    view.clear();
    view.setIsVertical(true);
    view.draw();
    view.initPointerTo(5, true, 0, 100, 1, 20, true);
    view.setSliderBarClickListener(listener);
    view.updateProgress(isInterval);
    view.setPositionBySliderBarClick(123, 123, 0, 100, 1, 5, 20);

    // Assert
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const sliderBarClickListener = capture(mockSliderView.setClickSliderBarListener).last()[0];
    // eslint-disable-next-line @typescript-eslint/unbound-method
    sliderBarClickListener(10, 100);
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.getBoundTop()).times(5);
    verify(mockPointerFromView.getTop()).times(3);
    verify(mockPointerFromView.getHeight()).times(3);
  });

  it('Slider bar click, has interval, horizontal.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeVerticalSlider();

    // Act
    view.clear();
    view.draw();
    view.initPointerFrom(5, 0, 100, 1, false, 20, false);
    view.setSliderBarClickListener(listener);
    view.setPointerPositionListener(listener);
    view.setPointerPosition(true, 100, 100, 0, 110, 1, 10, 20);
    view.setPointerPosition(false, 112, 112, 0, 110, 1, 10, 20);
    view.updateProgress(true);

    // Assert
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const sliderBarClickListener = capture(mockSliderView.setClickSliderBarListener).last()[0];
    sliderBarClickListener(10, 100);
    verify(mockPointerFromView.getLeft()).times(5);
    verify(mockPointerFromView.getWidth()).times(5);
    verify(mockPointerToView.getLeft()).times(2);
    verify(mockPointerToView.getWidth()).times(2);
  });

  it('Draw vertical slider with scale, click scale, no interval.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeVerticalSlider();

    // Act
    view.setIsVertical(true);
    view.setScaleClickListener(listener);
    view.setPositionByScaleClick(15, 0, 110, 1, 20, 70);
    view.draw();
    view.initPointerFrom(5, 0, 50, 1, false, 20, false);
    view.initPointerTo(10, false, 0, 50, 1, 2, false);
    view.setupScale(0, 50, 1);
    view.showScale();
    view.hideScale();

    // Assert
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const scaleClickListener = capture(mockScaleView.setClickListener).last()[0];
    scaleClickListener(mockScaleView, 123);
    // verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.getWidth()).called();
    verify(mockSliderView.getHeight()).called();
    verify(mockScaleView.addScaleItems(anything(), true)).called();
    verify(mockScaleView.setClickListener(anything())).called();
    verify(mockScaleView.show()).once();
    verify(mockScaleView.hide()).once();
  });

  it('Draw vertical slider with scale, click scale, has interval.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    view.setIsVertical(true);
    arrangeVerticalSlider();
    view.setScaleClickListener(listener);

    // Act
    view.draw();
    view.setScaleClickListener(listener);
    view.setPositionByScaleClick(15, 0, 110, 1, 20, 70);
    view.initPointerFrom(5, 0, 50, 1, false, 20, false);
    view.initPointerTo(10, false, 0, 50, 1, 2, false);
    view.setupScale(0, 50, 1);
    view.showScale();
    view.hideScale();

    // Assert
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const scaleClickListener = capture(mockScaleView.setClickListener).last()[0];
    scaleClickListener(mockScaleView, 123);
    verify(mockSliderView.drawVertical()).once();
    verify(mockScaleView.addScaleItems(anything(), true)).once();
    verify(mockScaleView.setClickListener(anything())).called();
    verify(mockScaleView.show()).once();
    verify(mockScaleView.hide()).once();
  });

  it('Draw horizontal slider and init pointer from view with value.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    view.setIsVertical(false);
    arrangeHorizontalSlider();

    // Act
    view.draw();
    view.setValueFrom(5);
    view.showPointerFromValue();
    view.updateProgress(true);

    // Assert
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerFromView.setValue(5)).once();
    verify(mockPointerFromView.showValue()).once();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getBoundLeft()).times(1);
    verify(mockSliderView.getWidth()).times(2);
  });

  it('Draw horizontal range slider.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeHorizontalSlider();

    // Act
    view.draw();
    view.setValueFrom(5);
    view.showPointerFromValue();

    // Assert
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerFromView.setValue(5)).once();
    verify(mockPointerFromView.showValue()).once();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundBottom()).never();
  });

  it('Draw horizontal slider without value, without pointer to.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeHorizontalSlider();

    // Act
    view.draw();
    view.hidePointerFromValue();
    view.hidePointerTo();
    view.hidePointerToValue();

    // Assert
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerToView.hide()).once();
    verify(mockPointerFromView.hideValue()).once();
    verify(mockPointerToView.hideValue()).once();
  });

  it('Draw vertical slider and init pointer to view with value.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeVerticalSlider();

    // Act
    view.setIsVertical(true);
    view.draw();
    view.setValueTo(50);
    view.showPointerTo();
    view.showPointerToValue();
    view.updateProgress(true);

    // Assert
    verify(mockSliderView.drawVertical()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerToView.show()).once();
    verify(mockPointerToView.showValue()).once();
  });

  it('Draw vertical slider without pointer to.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeVerticalSlider();

    // Act
    view.setIsVertical(true);
    view.draw();

    // Assert
    verify(mockSliderView.drawVertical()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerToView.getTop()).never();
  });
});
