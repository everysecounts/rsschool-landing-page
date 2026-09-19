function createSvg(tag, attributes = {}, ...children) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
  element.append(...children);
  return element;
}

export { createSvg };
