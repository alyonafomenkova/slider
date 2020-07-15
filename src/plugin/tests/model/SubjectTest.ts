import Subject from '../../model/Subject';

describe('Attach/detach once with single observer', () => {
  let actual = 0;
  const subject = new Subject(1);
  const observer = (value: number): void => {
    actual = value;
  };

  it('Get value and attach after set value 1', () => {
    const currentValue = subject.getValue();
    subject.setValue(1);
    subject.attach(observer);

    expect(currentValue).toEqual(1);
    expect(actual).toEqual(1);
  });

  it('Set value 2 after attached', () => {
    subject.setValue(2);

    expect(actual).toEqual(2);
  });

  it('Detach before set value 3', () => {
    subject.detach(observer);
    subject.setValue(3);

    expect(actual).toEqual(2);
  });
});

describe('Attach/detach multiple times', () => {
  let actual = 0;
  let times = 0;
  const subject = new Subject(1);
  const observer = (value: number): void => {
    actual = value;
    times++;
  };

  it('Attach multimple times and set value 1', () => {
    subject.attach(observer);
    subject.attach(observer);
    subject.attach(observer);
    subject.setValue(1);

    expect(actual).toEqual(1);
    expect(times).toEqual(2);
  });

  it('Detach multimple times and set value 2', () => {
    subject.detach(observer);
    subject.detach(observer);
    subject.setValue(2);

    expect(actual).toEqual(1);
    expect(times).toEqual(2);
  });
});

describe('Multiple observers', () => {
  let actualA = 0;
  let actualB = 0;
  const subject = new Subject(1);
  const observerA = (value: number): void => {
    actualA = value;
  };
  const observerB = (value: number): void => {
    actualB = value;
  };

  it('Attach A, set value 1, attach B', () => {
    subject.attach(observerA);
    subject.setValue(1);
    subject.attach(observerB);

    expect(actualA).toEqual(1);
    expect(actualB).toEqual(1);
  });

  it('Set value 2, A and B already attached', () => {
    subject.setValue(2);

    expect(actualA).toEqual(2);
    expect(actualB).toEqual(2);
  });

  it('Detach A, set value 3, detach B', () => {
    subject.detach(observerA);
    subject.setValue(3);
    subject.detach(observerB);

    expect(actualA).toEqual(2);
    expect(actualB).toEqual(3);
  });

  it('Set value 4, A and B already detached', () => {
    subject.setValue(4);

    expect(actualA).toEqual(2);
    expect(actualB).toEqual(3);
  });
});
