import { createElement } from '@/utils';
import { Controls } from './Controls';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import styles from './Header.module.css';

export class Header {
  constructor() {
    const logo = new Logo();
    const navigation = new Navigation();
    const controls = new Controls();

    this.element = createElement(
      'header',
      {
        className: styles.header,
      },
      logo.element,
      navigation.element,
      controls.element,
    );
  }
}
