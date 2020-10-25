import ViewModel from '../../view/MainView/ViewModel';

describe('Set and get values', () => {
  const viewModel = new ViewModel();

  it('Set and get min', () => {
    viewModel.setMin(5);

    expect(viewModel.getMin()).toEqual(5);
  });

  it('Set and get max', () => {
    viewModel.setMax(100);

    expect(viewModel.getMax()).toEqual(100);
  });

  it('Set and get step', () => {
    viewModel.setStep(2);

    expect(viewModel.getStep()).toEqual(2);
  });

  it('Set and get value from', () => {
    viewModel.setValueFrom(10);

    expect(viewModel.getValueFrom()).toEqual(10);
  });

  it('Set and get value to', () => {
    viewModel.setValueTo(20);

    expect(viewModel.getValueTo()).toEqual(20);
  });

  it('Set and get isInterval', () => {
    viewModel.setIsInterval(true);

    expect(viewModel.getIsInterval()).toEqual(true);
  });

  it('Set and get isVertical', () => {
    viewModel.setIsVertical(true);

    expect(viewModel.getIsVertical()).toEqual(true);
  });

  it('Set and get hasScale', () => {
    viewModel.setHasScale(true);

    expect(viewModel.getHasScale()).toEqual(true);
  });

  it('Set and get hasValue', () => {
    viewModel.setHasValue(true);

    expect(viewModel.getHasValue()).toEqual(true);
  });
});
