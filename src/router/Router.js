export class Router {
  constructor(routes, container) {
    this.routes = routes;
    this.container = container;
  }

  start() {
    document.addEventListener('click', (event) => {
      this.handleClick(event);
    });
    window.addEventListener('popstate', () => {
      this.render();
    });
    this.render();
  }

  handleClick(event) {
    const link = event.target.closest('a');
    if (!link || link.origin !== location.origin) {
      return;
    }
    if (link.hasAttribute('download') || link.target === '_blank') {
      return;
    }
    const samePath = link.pathname === location.pathname;
    if (samePath && link.hash) {
      return;
    }
    event.preventDefault();
    const nextUrl = `${link.pathname}${link.search}${link.hash}`;
    history.pushState(null, '', nextUrl);
    this.render();
  }

  getPath() {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const path = location.pathname.startsWith(base)
      ? location.pathname.slice(base.length)
      : location.pathname;
    return path || '/';
  }

  render() {
    const Page = this.routes[this.getPath()] || this.routes['*'];
    new Page().mount(this.container);
    this.scrollToHash();
  }

  scrollToHash() {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) {
      return;
    }

    requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}
