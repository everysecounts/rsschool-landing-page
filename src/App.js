import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';
import { Router, routes } from '@/router';

class App {
  constructor(container) {
    this.container = container;
    this.main = new Main();
    this.router = new Router(routes, this.main.element, (path) => {
      this.header.setActivePath(path);
    });
    this.header = new Header((event, link) => {
      this.router.handleLinkClick(event, link);
    });
    this.footer = new Footer();
  }
  start() {
    this.container.replaceChildren(this.header.element, this.main.element, this.footer.element);
    this.router.start();
  }
}

export { App };
