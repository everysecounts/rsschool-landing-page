import { createElement } from '@/utils/createElement.js';

export class Catalog {
  constructor() {
    const title = createElement('h1', {}, 'Catalog');
    this.element = createElement('main', {}, title);
  }
  mount(container) {
    container.replaceChildren(this.element);
  }
}
