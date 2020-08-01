class Util {
  private static ROUND_PRECISION = 1000;

  static addClassName(element: Element, className: string): void {
    element.classList.add(className);
  }

  static createElement(container: Element, classNames: string, template?: string): HTMLElement {
    const element = document.createElement('div');
    element.className = classNames;
    if (template) {
      element.innerHTML = template;
    }
    container.append(element);
    return element;
  }

  static roundWithEpsilon(value: number): number {
    return Math.round((value + Number.EPSILON) * Util.ROUND_PRECISION) / Util.ROUND_PRECISION;
  }
}

export default Util;
