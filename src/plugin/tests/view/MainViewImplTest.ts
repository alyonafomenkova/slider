import {
  anything, capture, instance, mock, resetCalls, verify, when,
} from 'ts-mockito';
import SliderView from '../../view/SliderView/SliderView';
import PointerView from '../../view/PointerView/PointerView';
import ScaleView from '../../view/ScaleView/ScaleView';
import MainView from '../../view/MainView/MainView';
import ViewModel from '../../view/MainView/ViewModel';
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
  let viewModel: ViewModel;

  beforeEach(() => {
    resetAllMockCalls();
    const sliderView = instance(mockSliderView);
    const pointerFromView = instance(mockPointerFromView);
    const pointerToView = instance(mockPointerToView);
    const scaleView = instance(mockScaleView);

    viewModel = new ViewModel();
    view = new MainViewImpl(viewModel, sliderView, scaleView, pointerFromView, pointerToView);
  });

  it('Clear, draw horizontal slider, slider bar click.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeHorizontalSlider();

    // Act
    view.clear();
    view.drawHorizontal();
    view.handleSliderBarClick();
    view.updateProgress();

    // Assert
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const sliderBarClickListener = capture(mockSliderView.setClickSliderBarListener).last()[0];
    sliderBarClickListener(mockSliderView, 10, 100);
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockSliderView.getBoundLeft()).times(4);
    verify(mockPointerFromView.getLeft()).times(3);
    verify(mockPointerFromView.getWidth()).times(3);
  });

  it('Draw vertical slider with scale.', () => {
    // Arrange
    arrangeVerticalSlider();
    viewModel.setMax(5);
    viewModel.setMin(5);
    viewModel.setStep(1);

    // Act
    view.drawVertical();
    view.setupScale();
    view.showScale();
    view.hideScale();

    // Assert
    expect(viewModel.getMax()).toEqual(5);
    expect(viewModel.getMin()).toEqual(5);
    expect(viewModel.getStep()).toEqual(1);
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.getWidth()).called();
    verify(mockSliderView.getHeight()).called();
    verify(mockScaleView.addItems(anything(), false)).called();
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
    arrangeHorizontalSlider();

    // Act
    viewModel.setIsVertical(false);
    view.drawHorizontal();
    view.initPointerFrom(5);
    view.setValueFrom(5);
    view.showPointerFromValue();
    view.updateProgress();

    // Assert
    expect(viewModel.getValueFrom()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(false);
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerFromView.setValue(5)).once();
    verify(mockPointerFromView.showValue()).once();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getBoundLeft()).times(4);
    verify(mockSliderView.getWidth()).times(8);
  });

  it('Draw horizontal range slider.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeHorizontalSlider();

    // Act
    viewModel.setIsVertical(false);
    viewModel.setIsInterval(true);
    view.drawHorizontal();
    view.initPointerFrom(5);
    view.setValueFrom(5);
    view.showPointerFromValue();
    view.updateProgress();

    // Assert
    expect(viewModel.getValueFrom()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(false);
    expect(viewModel.getIsInterval()).toEqual(true);
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerFromView.setValue(5)).once();
    verify(mockPointerFromView.showValue()).once();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getBoundLeft()).times(4);
    verify(mockSliderView.getWidth()).times(8);
  });

  it('Draw horizontal slider without value, without pointer to.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeHorizontalSlider();

    // Act
    viewModel.setIsVertical(false);
    viewModel.setIsInterval(false);
    viewModel.setHasValue(false);
    view.drawHorizontal();
    view.initPointerTo(50);
    view.hidePointerFromValue();
    view.hidePointerTo();
    view.hidePointerToValue();

    // Assert
    expect(viewModel.getIsVertical()).toEqual(false);
    expect(viewModel.getIsInterval()).toEqual(false);
    expect(viewModel.getHasValue()).toEqual(false);
    expect(viewModel.getValueTo()).toEqual(50);
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerToView.hide()).twice();
    verify(mockPointerFromView.hideValue()).once();
    verify(mockPointerToView.hideValue()).twice();
  });

  it('Draw vertical slider and init pointer to view with value.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeVerticalSlider();

    // Act
    viewModel.setIsVertical(true);
    viewModel.setIsInterval(true);
    viewModel.setHasValue(true);
    view.drawVertical();
    view.initPointerTo(50);
    view.setValueTo(50);
    view.showPointerTo();
    view.showPointerToValue();
    view.updateProgress();

    // Assert
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getValueTo()).toEqual(50);
    verify(mockSliderView.drawVertical()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockPointerToView.show()).once();
    verify(mockPointerToView.showValue()).once();
    verify(mockSliderView.getBoundBottom()).times(2);
    verify(mockPointerToView.getTop()).times(2);
    verify(mockPointerFromView.getHeight()).once();
  });

  it('Draw vertical slider without pointer to.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeVerticalSlider();

    // Act
    viewModel.setIsVertical(true);
    viewModel.setIsInterval(false);
    view.drawVertical();
    view.updateProgress();

    // Assert
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(false);
    verify(mockSliderView.drawVertical()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
    verify(mockSliderView.getBoundBottom()).once();
    verify(mockPointerToView.getTop()).never();
    verify(mockPointerFromView.getHeight()).once();
  });
});
