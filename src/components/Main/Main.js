import { createElement } from '@/utils';
import styles from './Main.module.css';

class Main {
  constructor() {
    this.element = createElement('main', {
      className: styles.main,
    });
  }
}

export { Main };
