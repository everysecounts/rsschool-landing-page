export class Router {
  constructor(routes, container) {
    this.routes = routes;
    this.container = container;
  }

  start() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link || link.origin !== location.origin || link.hash) {
        return;
      }
      event.preventDefault();
      history.pushState(null, '', link.pathname);
      this.render();
    });
    window.addEventListener('popstate', () => this.render());
    this.render();
  }

  getPath() {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const path = location.pathname.replace(base, '');
    return path || '/';
  }

  render() {
    const Page = this.routes[this.getPath()] || this.routes['*'];
    new Page().mount(this.container);
  }
}
