import { createElement } from '@/utils/createElement.js';

export class NotFound {
  constructor() {
    const text = createElement('p', {}, 'Page not found');
    const link = createElement(
      'a',
      {
        href: '/',
        class: 'link',
      },
      'Go to home',
    );
    this.element = createElement('main', {}, text, link);
  }

  mount(container) {
    container.replaceChildren(this.element);
  }
}
