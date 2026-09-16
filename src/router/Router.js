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

  render() {
    const Page = this.routes[location.pathname] || this.routes['*'];
    new Page().mount(this.container);
  }
}
