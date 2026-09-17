import { createElement } from '@/utils';
import styles from './controls.module.css';

export class Controls {
  constructor() {
    const base = import.meta.env.BASE_URL;
    const theme = createElement('button', {
      className: styles.theme,
      type: 'button',
      'aria-label': 'Toggle theme',
    });

    const menu = createElement(
      'a',
      {
        className: styles.menu,
        href: `${base.replace(/\/?$/, '/')}menu`,
      },
      'Menu',
    );

    this.element = createElement(
      'div',
      {
        className: styles.controls,
      },
      theme,
      menu,
    );
  }
}
