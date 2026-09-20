import { createElement } from '@/utils';
import { createMenuLink } from '../MenuLink';
import { ThemeSwitcher } from './ThemeSwitcher';
import styles from './Controls.module.css';

class Controls {
  constructor(onBurgerClick) {
    const themeSwitcher = new ThemeSwitcher();
    this.menuLink = createMenuLink(styles.menu, styles.menuIcon);
    this.menuLink.addEventListener('click', (event) => {
      if (this.menuLink.classList.contains(styles.menuActive)) {
        event.preventDefault();
      }
    });

    this.burger = createElement(
      'button',
      {
        className: styles.burger,
        type: 'button',
        'aria-label': 'Open menu',
        'aria-expanded': 'false',
      },
      createElement('span'),
      createElement('span'),
    );
    this.burger.addEventListener('click', onBurgerClick);

    this.element = createElement(
      'div',
      { className: styles.controls },
      themeSwitcher.element,
      this.menuLink,
      this.burger,
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

  setBurgerState(isOpen) {
    this.burger.classList.toggle(styles.burgerOpen, isOpen);
    this.burger.setAttribute('aria-expanded', String(isOpen));
    this.burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }
}

export { Controls };
