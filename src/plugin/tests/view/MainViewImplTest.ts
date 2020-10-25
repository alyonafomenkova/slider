import {
  anything, instance, mock, resetCalls, verify, when,
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
/*
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

  it('Clear and draw horizontal slider.', () => {
    // Arrange
    arrangeHorizontalSlider();

    // Act
    view.clear();
    view.drawHorizontal();

    // Assert for scale view
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).once();
  });

  it('Draw vertical slider with scale.', () => {
    // Arrange
    arrangeVerticalSlider();

    // Act
    view.drawVertical();
    view.setupScale();
    view.showScale();
    view.hideScale();

    // Assert for scale view
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.getWidth()).called();
    verify(mockSliderView.getHeight()).called();
    verify(mockScaleView.addItems(anything(), false)).called();
    verify(mockScaleView.setClickListener(anything())).called();
    verify(mockScaleView.show()).once();
    verify(mockScaleView.hide()).once();
  });

  it('Draw horizontal slider and init pointer from view.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const listener = () => {};
    view.setValueFromListener(listener);
    view.setValueToListener(listener);
    arrangeHorizontalSlider();

    // Act
    view.drawHorizontal();
    view.initPointerFrom(5);

    // Assert for scale view
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();
  });
});
*/
