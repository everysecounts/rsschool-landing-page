import { createElement, getBaseUrl } from '@/utils';
import styles from './NotFound.module.css';

class NotFound {
  constructor(onLinkClick) {
    this.title = createElement('h1', { className: styles.title }, '404');
    this.text = createElement('p', { className: styles.text }, 'Page not found');
    this.link = createElement(
      'a',
      {
        href: getBaseUrl(),
        className: styles.link,
      },
      'Go to home',
    );

    if (onLinkClick) {
      this.link.addEventListener('click', (event) => {
        onLinkClick(event, this.link);
      });
    }

    this.element = createElement(
      'section',
      { className: styles.page },
      this.title,
      this.text,
      this.link,
    );
  }

  mount(container) {
    container.replaceChildren(this.element);
  }
}

export { NotFound };
