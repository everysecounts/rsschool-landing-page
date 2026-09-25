import { clearSections, getPathname, getSection } from '@/utils';

class Router {
  constructor(routes, container, onNavigate) {
    this.routes = routes;
    this.container = container;
    this.onNavigate = onNavigate;
  }

  start() {
    window.addEventListener('popstate', () => {
      this.render();
    });
    this.render();
  }

  handleLinkClick(event, link) {
    if (link.origin !== window.location.origin) {
      return;
    }
    if (link.target === '_blank' || link.hasAttribute('download')) {
      return;
    }
    const path = getPathname(link.pathname);
    if (!this.routes[path]) {
      return;
    }
    const samePath = path === this.getPath();
    const hasHash = Boolean(link.hash);
    if (samePath && hasHash) {
      event.preventDefault();
      const nextUrl = `${link.pathname}${link.search}${link.hash}`;
      if (`${location.pathname}${location.search}${location.hash}` !== nextUrl) {
        history.pushState(null, '', nextUrl);
      }
      this.scrollToHash();
      return;
    }
    event.preventDefault();
    history.pushState(null, '', `${link.pathname}${link.search}${link.hash}`);
    this.render();
  }

  getPath() {
    return getPathname(location.pathname);
  }

  render() {
    clearSections();
    const path = this.getPath();
    const Page = this.routes[path] || this.routes['*'];
    new Page(this.handleLinkClick.bind(this)).mount(this.container);
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
