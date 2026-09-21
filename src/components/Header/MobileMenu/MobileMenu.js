import { createElement } from '@/utils';
import { Navigation } from '../Navigation';
import { createMenuLink } from '../MenuLink';
import styles from './MobileMenu.module.css';

class MobileMenu {
  constructor(onClose, onLinkClick) {
    this.navigation = new Navigation((event, link) => {
      onClose();
      onLinkClick?.(event, link);
    });
    this.menuLink = createMenuLink(styles.menu, styles.menuIcon, (event, link) => {
      if (this.menuLink.classList.contains(styles.menuActive)) {
        event.preventDefault();
        return;
      }
      onClose();
      onLinkClick?.(event, link);
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
