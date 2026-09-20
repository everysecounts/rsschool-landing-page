import { createElement, getBaseUrl } from '@/utils';

class NotFound {
  constructor() {
    this.text = createElement('p', {}, 'Page not found');
    this.link = createElement(
      'a',
      {
        href: getBaseUrl(),
        className: 'link',
      },
      'Go to home',
    );
  }

  mount(container) {
    container.replaceChildren(this.text, this.link);
  }
}

export { NotFound };
