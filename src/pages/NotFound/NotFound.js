import { createElement } from '@/utils';

export class NotFound {
  constructor() {
    this.text = createElement('p', {}, 'Page not found');
    this.link = createElement(
      'a',
      {
        href: import.meta.env.BASE_URL,
        className: 'link',
      },
      'Go to home',
    );
  }

  mount(container) {
    container.replaceChildren(this.text, this.link);
  }
}
