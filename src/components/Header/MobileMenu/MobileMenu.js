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
    this.returnFocusElement = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getFocusableElements() {
    return [...this.navigation.links, this.menuLink];
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.returnFocusElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    this.element.classList.add(styles.open);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeyDown);

    const firstElement = this.getFocusableElements()[0];

    if (firstElement) {
      firstElement.focus({ preventScroll: true });
    }
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
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.returnFocusElement instanceof HTMLElement) {
      this.returnFocusElement.focus({ preventScroll: true });
      this.returnFocusElement = null;
    }
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

    if (event.key === 'Tab') {
      const focusableElements = this.getFocusableElements();

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }

      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.onClose?.();
      return;
    }

    if (SCROLL_KEYS.includes(event.key)) {
      event.preventDefault();
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
