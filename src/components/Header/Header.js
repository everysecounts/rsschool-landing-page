import { createElement } from '@/utils';
import { Controls } from './Controls';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import styles from './Header.module.css';

class Header {
  constructor() {
    this.logo = new Logo();
    this.navigation = new Navigation();
    this.controls = new Controls();

    this.element = createElement(
      'header',
      { className: styles.header },
      this.logo.element,
      this.navigation.element,
      this.controls.element,
    );
  }
  setActivePath(path) {
    this.controls.setActivePath(path);
  }
}

export { Header };
