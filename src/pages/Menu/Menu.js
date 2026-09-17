import { createElement } from '@/utils';

export class Menu {
  constructor() {
    const title = createElement('h1', {}, 'Menu');
    this.element = title;
  }
  mount(container) {
    container.replaceChildren(this.element);
  }
}
