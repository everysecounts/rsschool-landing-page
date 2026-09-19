import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';
import { Router, routes } from '@/router';

export class App {
  constructor(container) {
    this.container = container;
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
    this.router = new Router(routes, this.main.element, (path) => {
      this.header.setActivePath(path);
    });
  }
  start() {
    this.container.replaceChildren(this.header.element, this.main.element, this.footer.element);
    this.router.start();
  }
}
