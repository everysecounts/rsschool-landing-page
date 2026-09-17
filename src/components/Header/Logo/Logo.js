import { createElement } from '@/utils';
import styles from './Logo.module.css';
import logoUrl from './logo.svg';

export class Logo {
  constructor() {
    const image = createElement('img', {
      className: styles.logo,
      src: logoUrl,
      alt: '',
    });

    this.element = createElement(
      'a',
      {
        className: styles.link,
        href: import.meta.env.BASE_URL,
        'aria-label': 'Resource Coffee House — Home page',
      },
      image,
    );
  }
}
