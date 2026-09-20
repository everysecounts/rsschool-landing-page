import { createElement } from '@/utils';
import { Controls } from './Controls';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Navigation } from './Navigation';
import styles from './Header.module.css';

class Header {
  constructor() {
    this.logo = new Logo(() => {
      this.closeMobileMenu();
    });
    this.navigation = new Navigation();
    this.navigation.element.classList.add(styles.desktopNavigation);
    this.mobileMenu = new MobileMenu(() => {
      this.closeMobileMenu();
    });
    this.controls = new Controls(() => {
      this.toggleMobileMenu();
    });

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
