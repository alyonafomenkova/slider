class Util {
  static addClassName(element: Element, className: string): void {
    element.classList.add(className);
  }

  static createElement(container: Element, classNames: string, template?: string): void {
    const element = document.createElement('div');
    element.className = classNames;
    if (template) {
      element.innerHTML = template;
    }
    container.append(element);
  }
}

export default Util;
