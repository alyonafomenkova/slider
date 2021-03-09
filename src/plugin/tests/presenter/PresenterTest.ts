import {
  capture,
  instance, mock, resetCalls, verify, anyNumber,
} from 'ts-mockito';

import MainView from '../../view/MainView/MainView';
import Presenter from '../../presenter/Presenter';
import Model from '../../model/Model';

// Mocks
const mockMainView = mock<MainView>();

const resetAllMockCalls = () => {
  resetCalls(mockMainView);
};

const createConfiguration = (isVertical: boolean, hasInterval: boolean, hasValue: boolean, hasScale: boolean) => ({
  min: 0,
  max: 110,
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

  beforeEach(() => {
    resetAllMockCalls();
    view = instance(mockMainView);
  });

  it('Horizontal slider with scale.', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const config = createConfiguration(false, false, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();

    // Assert
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const setValueFromListener = capture(mockMainView.setValueFromListener).last()[0];
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const setValueToListener = capture(mockMainView.setValueToListener).last()[0];
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const setScaleClickListener = capture(mockMainView.setScaleClickListener).last()[0];
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const setSliderBarClickListener = capture(mockMainView.setSliderBarClickListener).last()[0];
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const setPointerPositionListener = capture(mockMainView.setPointerPositionListener).last()[0];
    setValueFromListener(10);
    setValueToListener(20);
    setScaleClickListener(15);
    setSliderBarClickListener(20, 40);
    setPointerPositionListener(true, 25, 45);
    verify(mockMainView.clear()).once();
    expect(model.getMax()).toEqual(110);
    expect(model.getStep()).toEqual(5);
    expect(model.getFrom()).toEqual(10);
    expect(model.getTo()).toEqual(20);
    verify(mockMainView.setPositionByScaleClick(
      anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(),
    )).once();
    verify(mockMainView.setPositionBySliderBarClick(
      anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(),
    )).once();
    verify(mockMainView.setPointerPosition(
      true, anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(),
    )).once();
  });

  it('Vertical slider without scale.', () => {
    // Arrange
    const config = createConfiguration(true, false, true, false);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();

    // Assert
    verify(mockMainView.clear()).once();
    expect(model.getMin()).toEqual(0);
    expect(model.getMax()).toEqual(110);
    expect(model.getStep()).toEqual(5);
    verify(mockMainView.setupScale(0, 110, 5)).once();
  });
});

describe('Subscribe to inner model.', () => {
  let view: MainView;

  beforeEach(() => {
    resetAllMockCalls();
    view = instance(mockMainView);
  });

  it('Subscribe to inner model', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    let actualMin = -1;
    let actualMax = -1;
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

describe('Set values', () => {
  let view: MainView;

  beforeEach(() => {
    resetAllMockCalls();
    view = instance(mockMainView);
  });

  it('Set min value', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMin(15);

    // Assert
    expect(model.getMin()).toEqual(15);
    verify(mockMainView.clear()).once();
    expect(model.getMin()).toEqual(15);
    expect(model.getMax()).toEqual(110);
    expect(model.getStep()).toEqual(5);
  });

  it('Set min >= max - step', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMin(150);

    // Assert
    expect(model.getMin()).toEqual(105);
    verify(mockMainView.clear()).once();
    expect(model.getMin()).toEqual(105);
    expect(model.getMax()).toEqual(110);
    expect(model.getStep()).toEqual(5);
  });

  it('Set max value', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMax(90);

    // Assert
    expect(model.getMax()).toEqual(90);
    verify(mockMainView.clear()).once();
    expect(model.getMin()).toEqual(0);
    expect(model.getMax()).toEqual(90);
    expect(model.getStep()).toEqual(5);
  });

  it('Set max <= min + step', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMax(4);

    // Assert
    expect(model.getMax()).toEqual(5);
    verify(mockMainView.clear()).once();
    expect(model.getMin()).toEqual(0);
    expect(model.getMax()).toEqual(5);
    expect(model.getStep()).toEqual(5);
  });

  it('Set step', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setStep(3);

    // Assert
    expect(model.getStep()).toEqual(3);
    verify(mockMainView.clear()).once();
    expect(model.getMin()).toEqual(0);
    expect(model.getMax()).toEqual(110);
    expect(model.getStep()).toEqual(3);
  });

  it('Set value from', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setValueFrom(5);

    // Assert
    verify(mockMainView.setupPositionFromByValue(5, 0, 110, 5, 70)).once();
    verify(mockMainView.setupPositionToByValue(5, 0, 110, 5, 70)).never();
    verify(mockMainView.calculateValueTo(0, 110, 5, true, 5, 70)).never();
    verify(mockMainView.updateProgress(true)).once();
  });

  it('Set value to', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setValueTo(25);

    // Assert
    verify(mockMainView.setupPositionToByValue(25, 0, 110, 5, 20)).once();
    verify(mockMainView.calculateValueTo(0, 110, 5, true, 20, 70)).once();
    verify(mockMainView.updateProgress(true)).once();
    verify(mockMainView.setupPositionFromByValue(anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber())).never();
    verify(mockMainView.calculateValueFrom(anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber(), anyNumber())).never();
  });

  it('Set scale value = true', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setScale(true);

    // Assert
    verify(mockMainView.showScale()).once();
  });

  it('Set scale value = false', () => {
    // Arrange
    const config = createConfiguration(true, true, true, false);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setScale(false);

    // Assert
    verify(mockMainView.hideScale()).once();
  });

  it('Set pointer value = true, slider with two pointer', () => {
    // Arrange
    const config = createConfiguration(true, true, true, false);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setPointerValue(true);

    // Assert
    verify(mockMainView.showPointerFromValue()).once();
    verify(mockMainView.showPointerToValue()).once();
  });

  it('Set pointer value = true, slider with one pointer', () => {
    // Arrange
    const config = createConfiguration(true, false, true, false);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setPointerValue(true);

    // Assert
    verify(mockMainView.hidePointerToValue()).once();
    verify(mockMainView.showPointerFromValue()).once();
  });

  it('Set pointer value = false, slider with one pointer', () => {
    // Arrange
    const config = createConfiguration(true, false, false, false);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setPointerValue(false);

    // Assert
    verify(mockMainView.hidePointerToValue()).once();
    verify(mockMainView.showPointerFromValue()).never();
    verify(mockMainView.showPointerToValue()).never();
  });

  it('Set interval (true), from === max', () => {
    // Arrange
    const config = {
      min: 0,
      max: 70,
      step: 5,
      from: 70,
      to: 70,
      isVertical: false,
      hasInterval: false,
      hasValue: true,
      hasScale: true,
    };
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setHasInterval(true);

    // Assert
    expect(model.getFrom()).toEqual(65);
    expect(model.getTo()).toEqual(70);
  });

  it('Set interval (true), hide value', () => {
    // Arrange
    const config = createConfiguration(false, true, false, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setHasInterval(true);

    // Assert
    verify(mockMainView.hidePointerToValue()).once();
  });

  it('Set interval (false), hide value', () => {
    // Arrange
    const config = createConfiguration(false, false, false, true);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setHasInterval(false);

    // Assert
    verify(mockMainView.hidePointerTo()).once();
    verify(mockMainView.hidePointerToValue()).once();
  });

  it('Set vertical orientation', () => {
    // Arrange
    const config = createConfiguration(true, true, true, false);
    const model = new Model(config);
    const presenter = new Presenter(model, view);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setIsVerticalOrientation(true);

    // Assert
    verify(mockMainView.setIsVertical(true)).once();
  });
});
