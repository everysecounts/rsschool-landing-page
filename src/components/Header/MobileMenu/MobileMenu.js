import { createElement } from '@/utils';
import { Navigation } from '../Navigation';
import { createMenuLink } from '../MenuLink';
import styles from './MobileMenu.module.css';

const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

class MobileMenu {
  constructor(onClose, onLinkClick) {
    this.onClose = onClose;
    this.navigation = new Navigation((event, link) => {
      onClose();
      onLinkClick?.(event, link);
    });
    this.menuLink = createMenuLink(styles.menu, styles.menuIcon, (event, link) => {
      if (this.menuLink.classList.contains(styles.menuActive)) {
        event.preventDefault();
        onClose();
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
    this.isOpen = false;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.element.inert = true;
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.element.inert = false;
    this.element.classList.add(styles.open);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeyDown);
  }

  close(onClosed) {
    if (!this.isOpen) {
      onClosed?.();
      return;
    }

    const handleTransitionEnd = (event) => {
      if (event.target === this.element && event.propertyName === 'transform') {
        onClosed?.();
      }
    };

    this.element.addEventListener('transitionend', handleTransitionEnd, {
      once: true,
    });
    this.isOpen = false;
    this.element.classList.remove(styles.open);
    this.element.inert = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
      return false;
    }

    this.open();
    return true;
  }

  handleKeyDown(event) {
    if (!this.isOpen) return;
    if (event.key === 'Tab' || event.key === 'Enter' || SCROLL_KEYS.includes(event.key)) {
      event.preventDefault();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.onClose?.();
    }
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
