import { Router, routes } from '@/router';

export class App {
  constructor(container) {
    this.router = new Router(routes, container);
  }
  start() {
    this.router.start();
  }
}
