import {anyNumber, anything, capture, instance, mock, reset, verify, when} from 'ts-mockito';
import Presenter from '../../presenter/Presenter';
import Model from '../../model/Model';
import SliderView from '../../view/SliderView';
import PointerView from '../../view/PointerView';
import ScaleView from '../../view/ScaleView';
import any = jasmine.any;

// Mocks
const mockSliderView = mock<SliderView>();
const mockPointerFromView = mock<PointerView>();
const mockPointerToView = mock<PointerView>();
const mockScaleView = mock<ScaleView>();

const initPresenter = (presenter: Presenter) => {
  const sliderView = instance(mockSliderView);
  const pointerFromView = instance(mockPointerFromView);
  const pointerToView = instance(mockPointerToView);
  const scaleView = instance(mockScaleView);
  presenter.init(sliderView, pointerFromView, pointerToView, scaleView);
};

describe('Init presenter', () => {
  beforeEach(() => {
    reset(mockSliderView);
    reset(mockPointerFromView);
    reset(mockPointerToView);
    reset(mockScaleView);
  });

  it('Horizontal orientation, slider bar click', () => {
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

    const config = {
      min: 0,
      max: 100,
      step: 5,
      from: 20,
      to: 70,
      isVertical: false,
      hasInterval: true,
      hasValue: true,
      hasScale: true,
    };
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);

    // Assert for slider view
    verify(mockSliderView.setClickSliderBarListener(anything())).once();
    const sliderBarClickListener = capture(mockSliderView.setClickSliderBarListener).last()[0];
    sliderBarClickListener(mockSliderView, 0, 0);
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).once();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).twice();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.getBoundLeft()).times(10);
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundRight()).times(2);
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getWidth()).times(23);
    verify(mockSliderView.getHeight()).once();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never()
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).twice();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).times(5)
    verify(mockPointerFromView.getWidth()).times(5);
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).times(5);
    verify(mockPointerFromView.getTop()).never();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never()
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).once();
    verify(mockPointerToView.setX(anyNumber())).once();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).thrice();
    verify(mockPointerToView.getWidth()).times(4);
    verify(mockPointerToView.getHeight()).once();
    verify(mockPointerToView.getLeft()).times(4);
    verify(mockPointerToView.getTop()).never();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Vertical orientation, slider bar click', () => {
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

    const config = {
      min: 0,
      max: 100,
      step: 5,
      from: 20,
      to: 70,
      isVertical: true,
      hasInterval: true,
      hasValue: true,
      hasScale: true,
    };
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);

    // Assert for slider view
    verify(mockSliderView.setClickSliderBarListener(anything())).once();
    const sliderBarClickListener = capture(mockSliderView.setClickSliderBarListener).last()[0];
    sliderBarClickListener(mockSliderView, 0, 0);
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).twice();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).times(8);
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).times(4);
    verify(mockSliderView.getWidth()).once();
    verify(mockSliderView.getHeight()).times(26);

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never()
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).once();
    verify(mockPointerFromView.setValue(anyNumber())).thrice();
    verify(mockPointerFromView.getWidth()).once();
    verify(mockPointerFromView.getHeight()).times(4);
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).times(4);
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never()
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).once();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).twice();
    verify(mockPointerToView.setValue(anyNumber())).times(5);
    verify(mockPointerToView.getWidth()).twice();
    verify(mockPointerToView.getHeight()).times(5);
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).times(5);
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Subscribe to inner model', () => {
    // Arrange
    const config = {
      min: 0,
      max: 100,
      step: 5,
      from: 20,
      to: 70,
      isVertical: false,
      hasInterval: true,
      hasValue: true,
      hasScale: true,
    };
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    let actualMax = -1;
    let actualMin = -1;
    let actualStep = -1;
    let actualFrom = -1;
    let actualTo = -1;

    // Act
    presenter.setMaxListener((value: number) => { actualMax = value; });
    presenter.setMinListener((value: number) => { actualMin = value; });
    presenter.setStepListener((value: number) => { actualStep = value; });
    presenter.setValueFromListener((value: number) => { actualFrom = value; });
    presenter.setValueToListener((value: number) => { actualTo = value; });

    // Assert
    expect(actualMin).toEqual(config.min);
    expect(actualMax).toEqual(config.max);
    expect(actualStep).toEqual(config.step);
    expect(actualFrom).toEqual(config.from);
    expect(actualTo).toEqual(config.to);
  });
});
