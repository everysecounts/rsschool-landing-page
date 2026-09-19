import { createElement } from '@/utils';
import { ThemeSwitcher } from './ThemeSwitcher';
import { menuIcon } from './menuIcon';
import styles from './Controls.module.css';

function menuHref() {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return `${base}menu`;
}

class Controls {
  constructor() {
    const themeSwitcher = new ThemeSwitcher();

    this.menuLink = createElement(
      'a',
      {
        className: styles.menu,
        href: menuHref(),
      },
      'Menu',
      menuIcon(styles.menuIcon),
    );

    this.element = createElement(
      'div',
      { className: styles.controls },
      themeSwitcher.element,
      this.menuLink,
    );
  }

  setActivePath(path) {
    const isMenuPage = path === '/menu';
    this.menuLink.classList.toggle(styles.menuActive, isMenuPage);
    if (isMenuPage) {
      this.menuLink.setAttribute('aria-current', 'page');
    } else {
      this.menuLink.removeAttribute('aria-current');
    }
  }
}

export { Controls };
