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

describe('Attach min and validate setMin method', () => {
  let actual = 0;
  const model = new Model(testСonfiguration);
  const observer = (value: number): void => {
    actual = value;
  };

  it('Attach Min and set min less than max', () => {
    model.setMin(2);
    model.attachMin(observer);

    expect(actual).toEqual(2);
  });

  // it('Set min equal to max', () => {
  //   model.setMin(100);
  //   model.attachMin(observer);
  //
  //   expect(actual).toEqual(100);
  // });
  //
  // it('Set min higher than max', () => {
  //   model.setMin(200);
  //   model.attachMin(observer);
  //
  //   expect(actual).toEqual(100);
  // });
});

describe('Attach max and validate setMax method', () => {
  let actual = 0;
  const model = new Model(testСonfiguration);
  const observer = (value: number): void => {
    actual = value;
  };

  it('Attach Max and set max higher than min', () => {
    model.setMax(200);
    model.attachMax(observer);

    expect(actual).toEqual(200);
  });

  // TODO: рассмотреть больше кейсов валидации
});

describe('Attach step and validate setStep method', () => {
  let actual = 0;
  const model = new Model(testСonfiguration);
  const observer = (value: number): void => {
    actual = value;
  };

  it('Attach Step and set step higher than min and less then max', () => {
    model.setStep(10);
    model.attachStep(observer);

    expect(actual).toEqual(10);
  });

  // TODO: рассмотреть больше кейсов валидации
});

describe('Attach valueFrom and validate setValueFrom method', () => {
  let actual = 0;
  const model = new Model(testСonfiguration);
  const observer = (value: number): void => {
    actual = value;
  };

  it('Attach valueFrom and set valueFrom higher than min and less then max', () => {
    model.setValueFrom(10);
    model.attachValueFrom(observer);

    expect(actual).toEqual(10);
  });

  // TODO: рассмотреть больше кейсов валидации
});

describe('Attach valueTo and validate setValueTo method', () => {
  let actual = 0;
  const model = new Model(testСonfiguration);
  const observer = (value: number): void => {
    actual = value;
  };

  it('Attach valueTo and set valueTo higher than min and less then max', () => {
    model.setValueTo(30);
    model.attachValueTo(observer);

    expect(actual).toEqual(30);
  });

  // TODO: рассмотреть больше кейсов валидации
});

describe('Attach orientation and validate setOrientation method', () => {
  let actual = false;
  const model = new Model(testСonfiguration);
  const observer = (value: boolean): void => {
    actual = value;
  };

  it('Attach orientation and set vertical orientation', () => {
    model.setOrientation(true);
    model.attachOrientation(observer);

    expect(actual).toEqual(true);
  });

  // TODO: рассмотреть больше кейсов валидации
});

describe('Attach interval and validate setInterval method', () => {
  let actual = false;
  const model = new Model(testСonfiguration);
  const observer = (value: boolean): void => {
    actual = value;
  };

  it('Attach interval and set single', () => {
    model.setInterval(false);
    model.attachInterval(observer);

    expect(actual).toEqual(false);
  });

  // TODO: рассмотреть больше кейсов валидации
});

describe('Attach pointer and validate setPointer method', () => {
  let actual = false;
  const model = new Model(testСonfiguration);
  const observer = (value: boolean): void => {
    actual = value;
  };

  it('Attach pointer and set pointer as false', () => {
    model.setPointer(false);
    model.attachPointer(observer);

    expect(actual).toEqual(false);
  });

  // TODO: рассмотреть больше кейсов валидации
});

describe('Attach scale and validate setScale method', () => {
  let actual = false;
  const model = new Model(testСonfiguration);
  const observer = (value: boolean): void => {
    actual = value;
  };

  it('Attach scale and set scale as false', () => {
    model.setScale(false);
    model.attachScale(observer);

    expect(actual).toEqual(false);
  });

  // TODO: рассмотреть больше кейсов валидации
});
