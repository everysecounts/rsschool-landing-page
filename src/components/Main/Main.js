import styles from './Main.module.css';

class Main {
  constructor() {
    this.element = document.createElement('main', {
      className: styles.main,
    });
  }
}

export { Main };
