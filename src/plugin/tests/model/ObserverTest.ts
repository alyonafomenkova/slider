import Observer from '../../model/Observer';

describe('Attach/detach once with single observer', () => {
  let actual = 0;
  const observer = new Observer(1);
  const subscriber = (value: number): void => {
    actual = value;
  };

  it('Get value and attach after set value 1', () => {
    const currentValue = observer.getValue();
    observer.setValue(1);
    observer.attach(subscriber);

    expect(currentValue).toEqual(1);
    expect(actual).toEqual(1);
  });

  it('Set value 2 after attached', () => {
    observer.setValue(2);

    expect(actual).toEqual(2);
  });

  it('Detach before set value 3', () => {
    observer.detach(subscriber);
    observer.setValue(3);

    expect(actual).toEqual(2);
  });
});

describe('Attach/detach multiple times', () => {
  let actual = 0;
  let times = 0;
  const observer = new Observer(1);
  const subscriber = (value: number): void => {
    actual = value;
    times += 1;
  };

  it('Attach multiple times and set value 1', () => {
    observer.attach(subscriber);
    observer.attach(subscriber);
    observer.attach(subscriber);
    observer.setValue(1);

    expect(actual).toEqual(1);
    expect(times).toEqual(2);
  });

  it('Detach multiple times and set value 2', () => {
    observer.detach(subscriber);
    observer.detach(subscriber);
    observer.setValue(2);

    expect(actual).toEqual(1);
    expect(times).toEqual(2);
  });
});

describe('Multiple observers', () => {
  let actualA = 0;
  let actualB = 0;
  const observer = new Observer(1);
  const subscriberA = (value: number): void => {
    actualA = value;
  };
  const subscriberB = (value: number): void => {
    actualB = value;
  };

  it('Attach A, set value 1, attach B', () => {
    observer.attach(subscriberA);
    observer.setValue(1);
    observer.attach(subscriberB);

    expect(actualA).toEqual(1);
    expect(actualB).toEqual(1);
  });

  it('Set value 2, A and B already attached', () => {
    observer.setValue(2);

    expect(actualA).toEqual(2);
    expect(actualB).toEqual(2);
  });

  it('Detach A, set value 3, detach B', () => {
    observer.detach(subscriberA);
    observer.setValue(3);
    observer.detach(subscriberB);

    expect(actualA).toEqual(2);
    expect(actualB).toEqual(3);
  });

  it('Set value 4, A and B already detached', () => {
    observer.setValue(4);

    expect(actualA).toEqual(2);
    expect(actualB).toEqual(3);
  });
});
