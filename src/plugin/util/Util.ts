class Util {
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
}

export default Util;
