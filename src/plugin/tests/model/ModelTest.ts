import Model from '../../model/Model';

const testСonfiguration = {
  min: 0,
  max: 100,
  step: 10,
  currentValueFrom: 20,
  currentValueTo: 70,
  isVertical: false,
  hasInterval: true,
  hasPointer: true,
  hasScale: true,
};

describe('Set min value', () => {
  let min: number;
  let max: number;
  let from: number;
  let to: number;
  let step: number;

  const model = new Model(testСonfiguration);
  const minObserver = (value: number): void => { min = value; };
  const maxObserver = (value: number): void => { max = value; };
  const fromObserver = (value: number): void => { from = value; };
  const toObserver = (value: number): void => { to = value; };
  const stepObserver = (value: number): void => { step = value; };

  model.attachMin(minObserver);
  model.attachMax(maxObserver);
  model.attachValueFrom(fromObserver);
  model.attachValueTo(toObserver);
  model.attachStep(stepObserver);

  it('Min < from < to < max', () => {
    model.setMin(17);

    expect(min).toEqual(17);
    expect(max).toEqual(100);
    expect(from).toEqual(20);
    expect(to).toEqual(70);
    expect(step).toEqual(10);
  });

  it('Min < oldMin < from < to < max', () => {
    model.setMin(-5);

    expect(min).toEqual(-5);
    expect(max).toEqual(100);
    expect(from).toEqual(20);
    expect(to).toEqual(70);
    expect(step).toEqual(10);
  });

  it('From < min < to < max', () => {
    model.setMin(37);

    expect(min).toEqual(37);
    expect(max).toEqual(100);
    expect(from).toEqual(37);
    expect(to).toEqual(70);
    expect(step).toEqual(10);
  });

  it('From < to < min < max', () => {
    model.setMin(77);

    expect(min).toEqual(77);
    expect(max).toEqual(100);
    expect(from).toEqual(77);
    expect(to).toEqual(77);
    expect(step).toEqual(10);
  });

  it('From < to < min < max, but max - min < step', () => {
    model.setMin(97);

    expect(min).toEqual(97);
    expect(max).toEqual(100);
    expect(from).toEqual(97);
    expect(to).toEqual(97);
    expect(step).toEqual(3);
  });

  it('Min > max', () => {
    model.setMin(150);

    expect(min).toEqual(100);
    expect(max).toEqual(100);
    expect(from).toEqual(100);
    expect(to).toEqual(100);
    expect(step).toEqual(0);
  });
});
