import { clearSections, getSection } from '@/utils';

class Router {
  constructor(routes, container, onNavigate) {
    this.routes = routes;
    this.container = container;
    this.onNavigate = onNavigate;
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
    const path = this.getPathname(link.pathname);
    if (!this.routes[path]) {
      return;
    }
    event.preventDefault();
    history.pushState(null, '', `${link.pathname}${link.search}${link.hash}`);
    this.render();
  }

  getPathname(pathname) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
    return path || '/';
  }

  getPath() {
    return this.getPathname(location.pathname);
  }

  render() {
    clearSections();
    const path = this.getPath();
    const Page = this.routes[path] || this.routes['*'];
    new Page().mount(this.container);
    this.onNavigate?.(path);
    this.scrollToHash();
  }

  scrollToHash() {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) {
      return;
    }

    requestAnimationFrame(() => {
      const target = getSection(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

export { Router };
