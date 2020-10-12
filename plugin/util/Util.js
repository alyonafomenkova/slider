class Util {
    static addClassName(element, className) {
        element.classList.add(className);
    }
    static removeClassName(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }
    static createElement(container, classNames, template) {
        const element = document.createElement('div');
        element.className = classNames;
        if (template) {
            element.innerHTML = template;
        }
        container.append(element);
        return element;
    }
    static roundWithEpsilon(value) {
        return Math.round((value + Number.EPSILON) * Util.ROUND_PRECISION) / Util.ROUND_PRECISION;
    }
}
Util.ROUND_PRECISION = 1000;
export default Util;
//# sourceMappingURL=Util.js.map