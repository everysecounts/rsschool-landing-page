import { createElement, getBaseUrl } from '@/utils';

class NotFound {
  constructor(onLinkClick) {
    this.text = createElement('p', {}, 'Page not found');
    this.link = createElement(
      'a',
      {
        href: getBaseUrl(),
        className: 'link',
      },
      'Go to home',
    );

    if (onLinkClick) {
      this.link.addEventListener('click', (event) => {
        onLinkClick(event, this.link);
      });
    }
  }

  mount(container) {
    container.replaceChildren(this.text, this.link);
  }
}

export { NotFound };
