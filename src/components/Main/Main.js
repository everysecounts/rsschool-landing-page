import styles from './Main.module.css';

export class Main {
  constructor() {
    this.element = document.createElement('main', {
      className: styles.main,
    });
  }
}
