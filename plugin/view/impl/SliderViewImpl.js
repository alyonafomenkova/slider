import Util from '../../util/Util';
class SliderViewImpl {
    constructor(container) {
        this.sliderBarClickListener = undefined;
        this.handleSliderBarClick = (evt) => {
            if (this.sliderBarClickListener) {
                this.sliderBarClickListener(this, evt.clientX, evt.clientY);
            }
        };
        this.container = container;
    }
    clear() {
        this.container.innerHTML = '';
    }
    drawHorizontal() {
        Util.createElement(this.container, 'slider__bar slider__bar_view_horizontal');
        Util.addClassName(this.container, 'slider_view_horizontal');
        Util.removeClassName(this.container, 'slider_view_vertical');
        Util.createElement(this.container, 'slider__progress');
        this.setupClickListeners();
    }
    drawVertical() {
        Util.createElement(this.container, 'slider__bar slider__bar_view_vertical');
        Util.addClassName(this.container, 'slider_view_vertical');
        Util.removeClassName(this.container, 'slider_view_horizontal');
        Util.createElement(this.container, 'slider__progress');
        this.setupClickListeners();
    }
    drawHorizontalProgress(left, width) {
        const progress = this.container.querySelector('.slider__progress');
        if (progress) {
            progress.style.left = `${left}%`;
            progress.style.width = `${width}%`;
        }
    }
    drawVerticalProgress(bottom, height) {
        const progress = this.container.querySelector('.slider__progress');
        if (progress) {
            progress.style.bottom = `${bottom}%`;
            progress.style.height = `${height}%`;
        }
    }
    getBoundLeft() {
        return this.container.getBoundingClientRect().left;
    }
    getBoundTop() {
        return this.container.getBoundingClientRect().top;
    }
    getBoundRight() {
        return this.container.getBoundingClientRect().right;
    }
    getBoundBottom() {
        return this.container.getBoundingClientRect().bottom;
    }
    getWidth() {
        return this.container.getBoundingClientRect().width;
    }
    getHeight() {
        return this.container.getBoundingClientRect().height;
    }
    setClickSliderBarListener(listener) {
        this.sliderBarClickListener = listener;
    }
    setupClickListeners() {
        const sliderBar = this.container.querySelector('.slider__bar');
        const progressBar = this.container.querySelector('.slider__progress');
        sliderBar.addEventListener('click', this.handleSliderBarClick);
        progressBar.addEventListener('click', this.handleSliderBarClick);
    }
}
export default SliderViewImpl;
//# sourceMappingURL=SliderViewImpl.js.map