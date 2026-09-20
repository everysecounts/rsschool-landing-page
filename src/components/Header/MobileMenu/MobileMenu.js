import { createElement } from '@/utils';
import { Navigation } from '../Navigation';
import { createMenuLink } from '../MenuLink';
import styles from './MobileMenu.module.css';

class MobileMenu {
  constructor(onClose) {
    this.navigation = new Navigation(onClose);
    this.menuLink = createMenuLink(styles.menu, styles.menuIcon);
    this.menuLink.addEventListener('click', (event) => {
      if (this.menuLink.classList.contains(styles.menuActive)) {
        event.preventDefault();
      }
      onClose();
    });

    this.element = createElement(
      'div',
      {
        className: styles.mobileMenu,
      },
      this.navigation.element,
      this.menuLink,
    );
  }

  open() {
    this.element.classList.add(styles.open);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.element.classList.remove(styles.open);
    document.body.style.overflow = '';
  }

  toggle() {
    const isOpen = this.element.classList.contains(styles.open);
    isOpen ? this.close() : this.open();
    return !isOpen;
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

export { MobileMenu };
