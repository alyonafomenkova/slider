import PointerViewImpl from '../../view/impl/PointerViewImpl';
const containerClass = 'container';
const setupContainer = () => {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.className = containerClass;
    if (!body) {
        throw new Error('Document body not found');
    }
    body.innerHTML = '';
    body.append(container);
    return container;
};
describe('Test pointer view implementation', () => {
    let container;
    let view;
    beforeEach(() => {
        // Arrange
        container = setupContainer();
        view = new PointerViewImpl('from', container);
    });
    it('Draw pointer. Set size, bound, click listeners.', () => {
        // Act -> assert
        view.draw(true);
        const pointer = document.querySelector('.slider__pointer-container');
        expect(pointer).not.toBeNull();
        pointer.style.width = '500px';
        pointer.style.height = '50px';
        pointer.style.left = '8px';
        pointer.style.top = '8px';
        expect(view.getWidth()).toEqual(500);
        expect(view.getHeight()).toEqual(50);
        expect(view.getLeft()).toEqual(8);
        expect(view.getTop()).toEqual(8);
    });
    it('Show / hide pointer, show / hide value.', () => {
        // Act -> assert
        view.draw(false);
        const pointer = document.querySelector('.slider__pointer-container');
        view.hide();
        expect(pointer.style.visibility).toEqual('hidden');
        view.show();
        expect(pointer.style.visibility).toEqual('visible');
        view.showValue();
        expect(pointer.querySelector('.slider__value').style.visibility).toEqual('visible');
        view.hideValue();
        expect(pointer.querySelector('.slider__value').style.visibility).toEqual('hidden');
    });
    it('Set value, setX, setY.', () => {
        // Act -> assert
        view.draw(false);
        view.showValue();
        view.setValue(5);
        view.setX(50);
        view.setY(55);
        const pointer = document.querySelector('.slider__pointer-container');
        const value = document.querySelector('.slider__value');
        if (value) {
            expect(value.innerHTML).not.toBeNull();
            expect(pointer.style.left).toEqual('50%');
            expect(pointer.style.top).toEqual('55%');
        }
    });
    it('Set listeners.', () => {
        // Act -> assert
        let downX = -1;
        let downY = -1;
        let moveX = -1;
        let moveY = -1;
        let upX = -1;
        let upY = -1;
        view.draw(true);
        const pointer = document.querySelector('.slider__pointer');
        view.setDownEventListener((v, x, y) => {
            downX = x;
            downY = y;
        });
        view.setMoveEventListener((v, x, y) => {
            moveX = x;
            moveY = y;
        });
        view.setUpEventListener((v, x, y) => {
            upX = x;
            upY = y;
        });
        const downEvt = new MouseEvent('mousedown');
        const moveEvt = new MouseEvent('mousemove');
        const upEvt = new MouseEvent('mouseup');
        downEvt.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        moveEvt.initMouseEvent('mousemove', true, true, window, 0, 0, 0, 180, 120, false, false, false, false, 0, null);
        upEvt.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 280, 220, false, false, false, false, 0, null);
        pointer.dispatchEvent(downEvt);
        pointer.dispatchEvent(moveEvt);
        pointer.dispatchEvent(upEvt);
        expect(downX).toEqual(80);
        expect(downY).toEqual(20);
        expect(moveX).toEqual(180);
        expect(moveY).toEqual(120);
        expect(upX).toEqual(280);
        expect(upY).toEqual(220);
    });
    it('Pointer container is not defined.', () => {
        // Act -> assert
        expect(() => { view.show(); }).toThrow(new Error('Pointer container is not defined.'));
        expect(() => { view.hide(); }).toThrow(new Error('Pointer container is not defined.'));
        expect(() => { view.showValue(); }).toThrow(new Error('Pointer container is not defined.'));
        expect(() => { view.hideValue(); }).toThrow(new Error('Pointer container is not defined.'));
        expect(() => { view.setValue(5); }).toThrow(new Error('Pointer container is not defined.'));
        expect(view.getWidth()).toEqual(0);
        expect(view.getHeight()).toEqual(0);
        expect(view.getLeft()).toEqual(0);
        expect(view.getTop()).toEqual(0);
        // view.draw(false);
        // view.showValue();
        // view.setValue(5);
        // view.setX(50);
        // view.setY(55);
        // const pointer = document.querySelector('.slider__pointer-container') as HTMLElement;
        // const value = document.querySelector('.slider__value') as HTMLElement;
        //
        // if (value) {
        //   expect(value.innerHTML).not.toBeNull();
        //   expect(pointer.style.left).toEqual('50%');
        //   expect(pointer.style.top).toEqual('55%');
        // }
    });
});
//# sourceMappingURL=PointerViewImplTest.js.map