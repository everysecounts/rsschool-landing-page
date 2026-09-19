function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([name, value]) => {
    if (name === 'className') {
      element.className = value;
    } else {
      element.setAttribute(name, value);
    }
  });
  element.append(...children);
  return element;
}

export { createElement };
