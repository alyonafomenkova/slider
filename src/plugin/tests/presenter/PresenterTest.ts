import {
  anyNumber, anything, capture, instance, mock, resetCalls, verify, when,
} from 'ts-mockito';
import Presenter2 from '../../presenter/Presenter2';
import Model from '../../model/Model';
import MainView from '../../view/MainView/MainView';
import ViewModel from '../../view/MainView/ViewModel';
import Configuration from '../../model/Configuration';
import MainViewImpl from '../../view/MainView/MainViewImpl';

// Mocks
const mockMainView = mock<MainView>();

const resetAllMockCalls = () => {
  resetCalls(mockMainView);
};

const createConfiguration = (isVertical: boolean, hasInterval: boolean, hasValue: boolean, hasScale: boolean) => ({
  min: 0,
  max: 100,
  step: 5,
  from: 20,
  to: 70,
  isVertical,
  hasInterval,
  hasValue,
  hasScale,
});

describe('Init presenter', () => {
  let view: MainView;
  let viewModel: ViewModel;

  beforeEach(() => {
    resetAllMockCalls();
    view = instance(mockMainView);
    viewModel = new ViewModel();
  });

  it('Horizontal slider', () => {
    // Arrange
    const config = createConfiguration(false, false, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();

    // Assert
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(0);
    expect(viewModel.getMax()).toEqual(100);
    expect(viewModel.getStep()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(false);
    expect(viewModel.getHasScale()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(false);
    //expect(viewModel.getValueFrom()).toEqual(20);
    //expect(viewModel.getValueTo()).toEqual(70);

    /*
    this.view.setValueFromListener((value: number) => { this.model.setFrom(value); });
    this.view.setValueToListener((value: number) => { this.model.setTo(value); });
    */







    /*
    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).once();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.setClickSliderBarListener(anything())).once();
    // eslint-disable-next-line @typescript-eslint/unbound-method
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
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).twice();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).times(5);
    verify(mockPointerFromView.getWidth()).times(5);
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).times(5);
    verify(mockPointerFromView.getTop()).never();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
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
    */
  });
  /*
  it('Horizontal orientation, slider bar click', () => {
    // Arrange
    arrangeHorizontalSlider();
    const config = createConfiguration(false);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).once();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.setClickSliderBarListener(anything())).once();
    // eslint-disable-next-line @typescript-eslint/unbound-method
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
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).twice();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).times(5);
    verify(mockPointerFromView.getWidth()).times(5);
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).times(5);
    verify(mockPointerFromView.getTop()).never();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
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

*/

  /*
  it('Vertical orientation, slider bar click, scale click', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);

    // Assert for scale view
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const scaleClickListener = capture(mockScaleView.setClickListener).last()[0];
    scaleClickListener(mockScaleView, 123);
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).once();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.setClickSliderBarListener(anything())).once();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const sliderBarClickListener = capture(mockSliderView.setClickSliderBarListener).last()[0];
    sliderBarClickListener(mockSliderView, 0, 0);
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).thrice();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).times(11);
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).times(6);
    verify(mockSliderView.getWidth()).once();
    verify(mockSliderView.getHeight()).times(35);

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).once();
    verify(mockPointerFromView.setValue(anyNumber())).thrice();
    verify(mockPointerFromView.getWidth()).once();
    verify(mockPointerFromView.getHeight()).times(5);
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).times(5);
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).once();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).thrice();
    verify(mockPointerToView.setValue(anyNumber())).times(7);
    verify(mockPointerToView.getWidth()).thrice();
    verify(mockPointerToView.getHeight()).times(7);
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).times(7);
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });
*/

  /*
  it('Subscribe to inner model', () => {
    // Arrange
    const config = createConfiguration(false);
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
*/
});
/*
describe('Set values', () => {
  beforeEach(() => {
    resetAllMockCalls();
  });

  it('Set min value', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setMin(15);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).once();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).times(6);
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).times(3);
    verify(mockSliderView.getWidth()).once();
    verify(mockSliderView.getHeight()).times(17);
    verify(mockSliderView.setClickSliderBarListener(anything())).once();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).once();
    verify(mockPointerFromView.setValue(anyNumber())).times(6);
    verify(mockPointerFromView.getWidth()).once();
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).twice();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).once();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).once();
    verify(mockPointerToView.setValue(anyNumber())).times(5);
    verify(mockPointerToView.getWidth()).once();
    verify(mockPointerToView.getHeight()).twice();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).twice();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set max value', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setMax(85);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).once();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).times(6);
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).times(3);
    verify(mockSliderView.getWidth()).once();
    verify(mockSliderView.getHeight()).times(17);
    verify(mockSliderView.setClickSliderBarListener(anything())).once();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).once();
    verify(mockPointerFromView.setValue(anyNumber())).times(5);
    verify(mockPointerFromView.getWidth()).once();
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).twice();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).once();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).once();
    verify(mockPointerToView.setValue(anyNumber())).times(6);
    verify(mockPointerToView.getWidth()).once();
    verify(mockPointerToView.getHeight()).twice();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).twice();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set step', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setStep(1);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).once();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).times(6);
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).times(3);
    verify(mockSliderView.getWidth()).once();
    verify(mockSliderView.getHeight()).times(17);
    verify(mockSliderView.setClickSliderBarListener(anything())).once();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).once();
    verify(mockPointerFromView.setValue(anyNumber())).times(5);
    verify(mockPointerFromView.getWidth()).once();
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).twice();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).once();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).once();
    verify(mockPointerToView.setValue(anyNumber())).times(5);
    verify(mockPointerToView.getWidth()).once();
    verify(mockPointerToView.getHeight()).twice();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).twice();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set from', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setValueFrom(25);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).never();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).thrice();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).twice();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).times(9);
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).once();
    verify(mockPointerFromView.setValue(anyNumber())).twice();
    verify(mockPointerFromView.getWidth()).once();
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).twice();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).never();
    verify(mockPointerToView.getWidth()).never();
    verify(mockPointerToView.getHeight()).once();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).once();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set to', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setValueTo(80);

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).thrice();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).twice();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).times(9);
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).never();
    verify(mockPointerFromView.getWidth()).never();
    verify(mockPointerFromView.getHeight()).once();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).once();
    verify(mockPointerToView.setValue(anyNumber())).twice();
    verify(mockPointerToView.getWidth()).once();
    verify(mockPointerToView.getHeight()).twice();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).twice();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set scale (true)', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setScale(true);

    // Assert for scale view
    verify(mockScaleView.show()).once();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).never();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).never();
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).never();
    verify(mockPointerFromView.getWidth()).never();
    verify(mockPointerFromView.getHeight()).never();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).never();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).never();
    verify(mockPointerToView.getWidth()).never();
    verify(mockPointerToView.getHeight()).never();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).never();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set scale (false)', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setScale(false);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).once();
    verify(mockScaleView.addItems(anything(), anything())).never();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).never();
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).never();
    verify(mockPointerFromView.getWidth()).never();
    verify(mockPointerFromView.getHeight()).never();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).never();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).never();
    verify(mockPointerToView.getWidth()).never();
    verify(mockPointerToView.getHeight()).never();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).never();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set pointer value (true)', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setPointerValue(true);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).never();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).never();
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).once();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).never();
    verify(mockPointerFromView.getWidth()).never();
    verify(mockPointerFromView.getHeight()).never();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).never();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).once();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).never();
    verify(mockPointerToView.getWidth()).never();
    verify(mockPointerToView.getHeight()).never();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).never();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set pointer value (false)', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setPointerValue(false);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).never();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).never();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).never();
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).once();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).never();
    verify(mockPointerFromView.getWidth()).never();
    verify(mockPointerFromView.getHeight()).never();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).never();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).once();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).never();
    verify(mockPointerToView.getWidth()).never();
    verify(mockPointerToView.getHeight()).never();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).never();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set interval (true)', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setHasInterval(true);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).never();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).once();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).twice();
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).never();
    verify(mockPointerFromView.getWidth()).never();
    verify(mockPointerFromView.getHeight()).once();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).once();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).once();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).never();
    verify(mockPointerToView.getWidth()).never();
    verify(mockPointerToView.getHeight()).once();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).once();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set interval (false)', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setHasInterval(false);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).never();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).never();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).never();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).never();
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).once();
    verify(mockSliderView.getWidth()).never();
    verify(mockSliderView.getHeight()).twice();
    verify(mockSliderView.setClickSliderBarListener(anything())).never();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).never();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).never();
    verify(mockPointerFromView.setValue(anyNumber())).never();
    verify(mockPointerFromView.getWidth()).never();
    verify(mockPointerFromView.getHeight()).once();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).once();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).once();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).once();
    verify(mockPointerToView.draw(anything())).never();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).never();
    verify(mockPointerToView.setValue(anyNumber())).never();
    verify(mockPointerToView.getWidth()).never();
    verify(mockPointerToView.getHeight()).never();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).never();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });

  it('Set vertical', () => {
    // Arrange
    arrangeVerticalSlider();
    const config = createConfiguration(true);
    const model = new Model(config);
    const presenter = new Presenter(model, config);

    // Act
    initPresenter(presenter);
    resetAllMockCalls();
    presenter.setIsVerticalOrientation(true);

    // Assert for scale view
    verify(mockScaleView.show()).never();
    verify(mockScaleView.hide()).never();
    verify(mockScaleView.addItems(anything(), anything())).once();
    verify(mockScaleView.setClickListener(anything)).never();

    // Assert for slider view
    verify(mockSliderView.clear()).once();
    verify(mockSliderView.drawHorizontal()).never();
    verify(mockSliderView.drawVertical()).once();
    verify(mockSliderView.drawHorizontalProgress(anyNumber(), anyNumber())).never();
    verify(mockSliderView.drawVerticalProgress(anyNumber(), anyNumber())).once();
    verify(mockSliderView.getBoundLeft()).never();
    verify(mockSliderView.getBoundTop()).times(6);
    verify(mockSliderView.getBoundRight()).never();
    verify(mockSliderView.getBoundBottom()).thrice();
    verify(mockSliderView.getWidth()).once();
    verify(mockSliderView.getHeight()).times(17);
    verify(mockSliderView.setClickSliderBarListener(anything())).once();

    // Assert for pointer from view
    verify(mockPointerFromView.show()).never();
    verify(mockPointerFromView.hide()).never();
    verify(mockPointerFromView.showValue()).never();
    verify(mockPointerFromView.hideValue()).never();
    verify(mockPointerFromView.draw(anything())).once();
    verify(mockPointerFromView.setX(anyNumber())).never();
    verify(mockPointerFromView.setY(anyNumber())).once();
    verify(mockPointerFromView.setValue(anyNumber())).times(5);
    verify(mockPointerFromView.getWidth()).once();
    verify(mockPointerFromView.getHeight()).twice();
    verify(mockPointerFromView.getLeft()).never();
    verify(mockPointerFromView.getTop()).twice();
    verify(mockPointerFromView.setDownEventListener(anything)).never();
    verify(mockPointerFromView.setMoveEventListener(anything)).never();
    verify(mockPointerFromView.setUpEventListener(anything)).never();

    // Assert for pointer to view
    verify(mockPointerToView.show()).never();
    verify(mockPointerToView.hide()).never();
    verify(mockPointerToView.showValue()).never();
    verify(mockPointerToView.hideValue()).never();
    verify(mockPointerToView.draw(anything())).once();
    verify(mockPointerToView.setX(anyNumber())).never();
    verify(mockPointerToView.setY(anyNumber())).once();
    verify(mockPointerToView.setValue(anyNumber())).times(5);
    verify(mockPointerToView.getWidth()).once();
    verify(mockPointerToView.getHeight()).twice();
    verify(mockPointerToView.getLeft()).never();
    verify(mockPointerToView.getTop()).twice();
    verify(mockPointerToView.setDownEventListener(anything)).never();
    verify(mockPointerToView.setMoveEventListener(anything)).never();
    verify(mockPointerToView.setUpEventListener(anything)).never();
  });
});
*/
