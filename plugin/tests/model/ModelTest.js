import Model from '../../model/Model';
const testConfiguration = {
    min: 0,
    max: 100,
    step: 10,
    from: 20,
    to: 70,
    isVertical: false,
    hasInterval: true,
    hasValue: true,
    hasScale: true,
};
describe('Validate configuration', () => {
    it('Min > max', () => {
        const configuration = {
            min: 150,
            max: 100,
            step: 10,
            from: 20,
            to: 70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); }).toThrow(new Error('Min must be less than max!'));
    });
    it('Min = max', () => {
        const configuration = {
            min: 100,
            max: 100,
            step: 10,
            from: 20,
            to: 70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); }).toThrow(new Error('Min must be less than max!'));
    });
    it('Step < 0', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: -1,
            from: 20,
            to: 70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); }).toThrow(new Error('Step must be more than 0!'));
    });
    it('Step = 0', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: 0,
            from: 20,
            to: 70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); }).toThrow(new Error('Step must be more than 0!'));
    });
    it('Step > max - min', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: 110,
            from: 20,
            to: 70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); }).toThrow(new Error('Step must be less than max - min!'));
    });
    it('From < min', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: 10,
            from: -20,
            to: 70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); })
            .toThrow(new Error('CurrentValueFrom must be less than max, but more than min!'));
    });
    it('From > max', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: 10,
            from: 120,
            to: 70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); })
            .toThrow(new Error('CurrentValueFrom must be less than max, but more than min!'));
    });
    it('To < min', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: 10,
            from: 20,
            to: -70,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); })
            .toThrow(new Error('CurrentValueTo must be less than max, but more than min!'));
    });
    it('To > max', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: 10,
            from: 20,
            to: 170,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); })
            .toThrow(new Error('CurrentValueTo must be less than max, but more than min!'));
    });
    it('To < from', () => {
        const configuration = {
            min: 0,
            max: 100,
            step: 10,
            from: 20,
            to: 5,
            isVertical: false,
            hasInterval: true,
            hasValue: true,
            hasScale: true,
        };
        // eslint-disable-next-line no-new
        expect(() => { new Model(configuration); })
            .toThrow(new Error('CurrentValueTo must be more than currentValueFrom!'));
    });
});
describe('Get values', () => {
    const model = new Model(testConfiguration);
    it('Get min', () => {
        const min = model.getMin();
        expect(min).toEqual(0);
    });
    it('Get max', () => {
        const max = model.getMax();
        expect(max).toEqual(100);
    });
    it('Get step', () => {
        const step = model.getStep();
        expect(step).toEqual(10);
    });
    it('Get from', () => {
        const from = model.getFrom();
        expect(from).toEqual(20);
    });
    it('Get to', () => {
        const to = model.getTo();
        expect(to).toEqual(70);
    });
    it('Get isInterval', () => {
        const hasInterval = model.isInterval();
        expect(hasInterval).toEqual(true);
    });
});
describe('Set min value', () => {
    let min;
    let max;
    let from;
    let to;
    let step;
    const model = new Model(testConfiguration);
    const minObserver = (value) => { min = value; };
    const maxObserver = (value) => { max = value; };
    const fromObserver = (value) => { from = value; };
    const toObserver = (value) => { to = value; };
    const stepObserver = (value) => { step = value; };
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
describe('Set max value', () => {
    let min;
    let max;
    let from;
    let to;
    let step;
    const model = new Model(testConfiguration);
    const minObserver = (value) => { min = value; };
    const maxObserver = (value) => { max = value; };
    const fromObserver = (value) => { from = value; };
    const toObserver = (value) => { to = value; };
    const stepObserver = (value) => { step = value; };
    model.attachMin(minObserver);
    model.attachMax(maxObserver);
    model.attachValueFrom(fromObserver);
    model.attachValueTo(toObserver);
    model.attachStep(stepObserver);
    it('Max > to > from > min', () => {
        model.setMax(150);
        expect(min).toEqual(0);
        expect(max).toEqual(150);
        expect(from).toEqual(20);
        expect(to).toEqual(70);
        expect(step).toEqual(10);
    });
    it('To > max > from > min', () => {
        model.setMax(67);
        expect(min).toEqual(0);
        expect(max).toEqual(67);
        expect(from).toEqual(20);
        expect(to).toEqual(67);
        expect(step).toEqual(10);
    });
    it('To > from > max > min', () => {
        model.setMax(17);
        expect(min).toEqual(0);
        expect(max).toEqual(17);
        expect(from).toEqual(17);
        expect(to).toEqual(17);
        expect(step).toEqual(10);
    });
    it('To > from > max> min and max - min < step', () => {
        model.setMax(7);
        expect(min).toEqual(0);
        expect(max).toEqual(7);
        expect(from).toEqual(7);
        expect(to).toEqual(7);
        expect(step).toEqual(7);
    });
});
describe('Set step value', () => {
    let min;
    let max;
    let from;
    let to;
    let step;
    const model = new Model(testConfiguration);
    const minObserver = (value) => { min = value; };
    const maxObserver = (value) => { max = value; };
    const fromObserver = (value) => { from = value; };
    const toObserver = (value) => { to = value; };
    const stepObserver = (value) => { step = value; };
    model.attachMin(minObserver);
    model.attachMax(maxObserver);
    model.attachValueFrom(fromObserver);
    model.attachValueTo(toObserver);
    model.attachStep(stepObserver);
    it('Step < max - min', () => {
        model.setStep(50);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(20);
        expect(to).toEqual(70);
        expect(step).toEqual(50);
    });
    it('Step > max - min', () => {
        model.setStep(250);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(20);
        expect(to).toEqual(70);
        expect(step).toEqual(100);
    });
    it('Step = 0', () => {
        expect(() => { model.setStep(0); }).toThrow(new Error('Step must be > 0!'));
    });
    it('Step < 0', () => {
        expect(() => { model.setStep(-5); }).toThrow(new Error('Step must be > 0!'));
    });
});
describe('Set from value', () => {
    let min;
    let max;
    let from;
    let to;
    let step;
    let isInterval;
    const model = new Model(testConfiguration);
    const minObserver = (value) => { min = value; };
    const maxObserver = (value) => { max = value; };
    const fromObserver = (value) => { from = value; };
    const toObserver = (value) => { to = value; };
    const stepObserver = (value) => { step = value; };
    const intervalObserver = (value) => { isInterval = value; };
    model.attachMin(minObserver);
    model.attachMax(maxObserver);
    model.attachValueFrom(fromObserver);
    model.attachValueTo(toObserver);
    model.attachStep(stepObserver);
    model.attachInterval(intervalObserver);
    it('To value exist and  from < to', () => {
        model.setInterval(true);
        model.setFrom(10);
        expect(isInterval).toEqual(true);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(10);
        expect(to).toEqual(70);
        expect(step).toEqual(10);
    });
    it('To value exist and  from > max', () => {
        model.setInterval(true);
        model.setFrom(149);
        expect(isInterval).toEqual(true);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(70);
        expect(to).toEqual(70);
        expect(step).toEqual(10);
    });
    it('To value exist and  from < min', () => {
        model.setInterval(true);
        model.setFrom(-5);
        expect(isInterval).toEqual(true);
        expect(from).toEqual(0);
        expect(to).toEqual(70);
    });
    it('To value exist and  from = to', () => {
        model.setInterval(true);
        expect(isInterval).toEqual(true);
        expect(to).toEqual(70);
        expect(() => { model.setFrom(70); }).toThrow(new Error('From must be < to!'));
    });
    it('To value does not exist and  from < max', () => {
        model.setInterval(false);
        model.setFrom(10);
        expect(isInterval).toEqual(false);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(10);
        expect(to).toEqual(70);
        expect(step).toEqual(10);
    });
    it('To value does not exist and  from > max', () => {
        model.setInterval(false);
        model.setFrom(150);
        expect(isInterval).toEqual(false);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(100);
        expect(to).toEqual(70);
        expect(step).toEqual(10);
    });
});
describe('Set to value', () => {
    let min;
    let max;
    let from;
    let to;
    let step;
    let isInterval;
    const model = new Model(testConfiguration);
    const minObserver = (value) => { min = value; };
    const maxObserver = (value) => { max = value; };
    const fromObserver = (value) => { from = value; };
    const toObserver = (value) => { to = value; };
    const stepObserver = (value) => { step = value; };
    const intervalObserver = (value) => { isInterval = value; };
    model.attachMin(minObserver);
    model.attachMax(maxObserver);
    model.attachValueFrom(fromObserver);
    model.attachValueTo(toObserver);
    model.attachStep(stepObserver);
    model.attachInterval(intervalObserver);
    it('From < to < max', () => {
        model.setInterval(true);
        model.setTo(80);
        expect(isInterval).toEqual(true);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(20);
        expect(to).toEqual(80);
        expect(step).toEqual(10);
    });
    it('To < from < max', () => {
        model.setInterval(true);
        model.setTo(14);
        expect(isInterval).toEqual(true);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(20);
        expect(to).toEqual(20);
        expect(step).toEqual(10);
    });
    it('From < max < To', () => {
        model.setInterval(true);
        model.setTo(150);
        expect(isInterval).toEqual(true);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(20);
        expect(step).toEqual(10);
        expect(to).toEqual(100);
    });
    it('Set  to < min', () => {
        model.setInterval(true);
        model.setTo(-50);
        expect(isInterval).toEqual(true);
        expect(min).toEqual(0);
        expect(max).toEqual(100);
        expect(from).toEqual(20);
        expect(step).toEqual(10);
        expect(to).toEqual(20);
    });
    it('Set  to === from', () => {
        model.setInterval(true);
        expect(isInterval).toEqual(true);
        expect(() => { model.setTo(20); }).toThrow(new Error('From must be < to!'));
    });
});
describe('Set interval', () => {
    let isInterval;
    const model = new Model(testConfiguration);
    const intervalObserver = (value) => { isInterval = value; };
    model.attachInterval(intervalObserver);
    it('set interval slider', () => {
        model.setInterval(true);
        expect(isInterval).toEqual(true);
    });
    it('set single slider', () => {
        model.setInterval(false);
        expect(isInterval).toEqual(false);
    });
});
//# sourceMappingURL=ModelTest.js.map