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
  let viewModel: ViewModel;

  beforeEach(() => {
    resetAllMockCalls();
    view = instance(mockMainView);
    viewModel = new ViewModel();
  });

  it('Horizontal slider with scale.', () => {
    // Arrange
    const config = createConfiguration(false, false, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);
    viewModel.setValueFrom(20);
    viewModel.setValueTo(70);

    // Act
    presenter.init();

    // Assert
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(0);
    expect(viewModel.getMax()).toEqual(110);
    expect(viewModel.getStep()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(false);
    expect(viewModel.getHasScale()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(false);
    expect(viewModel.getValueFrom()).toEqual(20);
    expect(viewModel.getValueTo()).toEqual(70);
  });

  it('Vertical slider without scale.', () => {
    // Arrange
    const config = createConfiguration(true, false, true, false);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);
    viewModel.setValueFrom(20);
    viewModel.setValueTo(70);

    // Act
    presenter.init();

    // Assert
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(0);
    expect(viewModel.getMax()).toEqual(110);
    expect(viewModel.getStep()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getHasScale()).toEqual(false);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(false);
    expect(viewModel.getValueFrom()).toEqual(20);
    expect(viewModel.getValueTo()).toEqual(70);
  });
});

describe('Subscribe to inner model.', () => {
  let view: MainView;
  let viewModel: ViewModel;

  beforeEach(() => {
    resetAllMockCalls();
    view = instance(mockMainView);
    viewModel = new ViewModel();
  });

  it('Subscribe to inner model', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

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
  let viewModel: ViewModel;

  beforeEach(() => {
    resetAllMockCalls();
    view = instance(mockMainView);
    viewModel = new ViewModel();
  });

  it('Set min value', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMin(15);

    // Assert
    expect(model.getMin()).toEqual(15);
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(15);
    expect(viewModel.getMax()).toEqual(110);
    expect(viewModel.getStep()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getHasScale()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(true);
  });

  it('Set min >= max - step', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMin(150);

    // Assert
    expect(model.getMin()).toEqual(105);
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(105);
    expect(viewModel.getMax()).toEqual(110);
    expect(viewModel.getStep()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getHasScale()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(true);
  });

  it('Set max value', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMax(90);

    // Assert
    expect(model.getMax()).toEqual(90);
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(0);
    expect(viewModel.getMax()).toEqual(90);
    expect(viewModel.getStep()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getHasScale()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(true);
  });

  it('Set max <= min + step', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setMax(4);

    // Assert
    expect(model.getMax()).toEqual(5);
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(0);
    expect(viewModel.getMax()).toEqual(5);
    expect(viewModel.getStep()).toEqual(5);
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getHasScale()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(true);
  });

  it('Set step', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setStep(3);

    // Assert
    expect(model.getStep()).toEqual(3);
    verify(mockMainView.clear()).once();
    expect(viewModel.getMin()).toEqual(0);
    expect(viewModel.getMax()).toEqual(110);
    expect(viewModel.getStep()).toEqual(3);
    expect(viewModel.getIsVertical()).toEqual(true);
    expect(viewModel.getHasScale()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(true);
  });

  it('Set value from', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setValueFrom(5);

    // Assert
    verify(mockMainView.setupPositionFromByValue(5)).once();
    verify(mockMainView.calculateValueFrom()).once();
    verify(mockMainView.updateProgress()).once();
    verify(mockMainView.setupPositionToByValue(5)).never();
    verify(mockMainView.calculateValueTo()).never();
  });

  it('Set value to', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setValueTo(25);

    // Assert
    verify(mockMainView.setupPositionToByValue(25)).once();
    verify(mockMainView.calculateValueTo()).once();
    verify(mockMainView.updateProgress()).once();
    verify(mockMainView.setupPositionFromByValue(25)).never();
    verify(mockMainView.calculateValueFrom()).never();
  });

  it('Set scale value = true', () => {
    // Arrange
    const config = createConfiguration(true, true, true, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setScale(true);

    // Assert
    expect(viewModel.getHasScale()).toEqual(true);
    verify(mockMainView.showScale()).once();
  });

  it('Set scale value = false', () => {
    // Arrange
    const config = createConfiguration(true, true, true, false);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setScale(false);

    // Assert
    expect(viewModel.getHasScale()).toEqual(false);
    verify(mockMainView.hideScale()).once();
  });

  it('Set pointer value = true, slider with two pointer', () => {
    // Arrange
    const config = createConfiguration(true, true, true, false);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setPointerValue(true);

    // Assert
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(true);
    verify(mockMainView.showPointerFromValue()).once();
  });

  it('Set pointer value = true, slider with one pointer', () => {
    // Arrange
    const config = createConfiguration(true, false, true, false);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setPointerValue(true);

    // Assert
    expect(viewModel.getHasValue()).toEqual(true);
    expect(viewModel.getIsInterval()).toEqual(false);
    verify(mockMainView.hidePointerToValue()).once();
    verify(mockMainView.showPointerFromValue()).once();
  });

  it('Set pointer value = false, slider with one pointer', () => {
    // Arrange
    const config = createConfiguration(true, false, false, false);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setPointerValue(false);

    // Assert
    expect(viewModel.getHasValue()).toEqual(false);
    expect(viewModel.getIsInterval()).toEqual(false);
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
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setHasInterval(true);

    // Assert
    expect(viewModel.getIsInterval()).toEqual(true);
    expect(model.getFrom()).toEqual(65);
    expect(model.getTo()).toEqual(70);
  });

  it('Set interval (true), hide value', () => {
    // Arrange
    const config = createConfiguration(false, true, false, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setHasInterval(true);

    // Assert
    expect(viewModel.getIsInterval()).toEqual(true);
    expect(viewModel.getHasValue()).toEqual(false);
    verify(mockMainView.hidePointerToValue()).once();
  });

  it('Set interval (false), hide value', () => {
    // Arrange
    const config = createConfiguration(false, false, false, true);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setHasInterval(false);

    // Assert
    expect(viewModel.getIsInterval()).toEqual(false);
    expect(viewModel.getHasValue()).toEqual(false);
    verify(mockMainView.hidePointerTo()).once();
    verify(mockMainView.hidePointerToValue()).once();
  });

  it('Set vertical orientation', () => {
    // Arrange
    const config = createConfiguration(true, true, true, false);
    const model = new Model(config);
    const presenter = new Presenter2(model, view, viewModel, config);

    // Act
    presenter.init();
    resetAllMockCalls();
    presenter.setIsVerticalOrientation(true);

    // Assert
    expect(viewModel.getIsVertical()).toEqual(true);
  });
});
