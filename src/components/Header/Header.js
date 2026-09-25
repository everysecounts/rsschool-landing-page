import { createElement } from '@/utils';
import { Controls } from './Controls';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Navigation } from './Navigation';
import styles from './Header.module.css';

class Header {
  constructor(onLinkClick) {
    this.logo = new Logo((event, link) => {
      this.closeMobileMenu();
      onLinkClick?.(event, link);
    });
    this.navigation = new Navigation(onLinkClick);
    this.navigation.element.classList.add(styles.desktopNavigation);
    this.mobileMenu = new MobileMenu(() => {
      this.closeMobileMenu();
    }, onLinkClick);

    this.controls = new Controls(() => {
      this.toggleMobileMenu();
    }, onLinkClick);

    this.element = createElement(
      'header',
      { className: styles.header },
      this.logo.element,
      this.navigation.element,
      this.controls.element,
      this.mobileMenu.element,
    );
  }

  toggleMobileMenu() {
    const isOpen = this.mobileMenu.toggle();
    this.controls.setBurgerState(isOpen);
  }

  closeMobileMenu() {
    this.mobileMenu.close();
    this.controls.setBurgerState(false);
  }

  setActivePath(path) {
    this.controls.setActivePath(path);
    this.mobileMenu.setActivePath(path);
  }
}

export { Header };
