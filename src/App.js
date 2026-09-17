import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Router, routes } from '@/router';

export class App {
  constructor(container) {
    this.container = container;
    this.header = new Header();
    this.main = new Main();
    this.router = new Router(routes, this.main.element);
  }
  start() {
    this.container.replaceChildren(this.header.element, this.main.element);
    this.router.start();
  }
}
