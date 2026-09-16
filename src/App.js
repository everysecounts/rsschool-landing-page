import { Router } from '@/router/Router.js';
import { routes } from '@/router/routes.js';

export class App {
  constructor(container) {
    this.router = new Router(routes, container);
  }
  start() {
    this.router.start();
  }
}
