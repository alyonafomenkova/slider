import Util from '../../util/Util';
class ScaleViewImpl {
    constructor(container) {
        this.clickEventListener = undefined;
        this.handleScaleItemClick = (evt) => {
            if (this.clickEventListener) {
                const item = evt.target.closest('.slider__scale-item');
                if (item) {
                    const valueContainer = item.querySelector('.slider__scale-value');
                    if (valueContainer) {
                        const value = Number(valueContainer.innerText);
                        this.clickEventListener(this, value);
                    }
                }
            }
        };
        this.container = container;
    }
    show() {
        const scaleContainer = this.container.querySelector('.slider__scale');
        if (scaleContainer) {
            scaleContainer.style.visibility = 'visible';
        }
    }
    hide() {
        const scaleContainer = this.container.querySelector('.slider__scale');
        if (scaleContainer) {
            scaleContainer.style.visibility = 'hidden';
        }
    }
    addItems(items, isVertical) {
        let template = '';
        items.forEach((item) => {
            template += `
      <div class="slider__scale-item">
        <div class="slider__scale-division"></div>
        <span class="slider__scale-value">${item.value}</span>
      </div>`.trim();
        });
        Util.createElement(this.container, 'slider__scale', template);
        const elements = this.container.getElementsByClassName('slider__scale-item');
        for (let i = 0; i < elements.length; i++) {
            const percent = items[i].positionPercent;
            if (isVertical) {
                elements[i].style.bottom = `${percent}%`;
            }
            else {
                elements[i].style.left = `${percent}%`;
            }
        }
        this.setupClickListeners();
    }
    setClickListener(listener) {
        this.clickEventListener = listener;
    }
    setupClickListeners() {
        if (this.container) {
            const items = this.container.querySelectorAll('.slider__scale-item');
            items.forEach((it) => {
                const item = it;
                item.addEventListener('click', this.handleScaleItemClick);
            });
        }
        else {
            throw new Error('Container is undefined.');
        }
    }
}
export default ScaleViewImpl;
//# sourceMappingURL=ScaleViewImpl.js.map