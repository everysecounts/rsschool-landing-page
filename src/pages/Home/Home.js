import { createElement } from '@/utils/createElement.js';

export class Home {
  constructor() {
    const title = createElement('h1', {}, 'Home');
    this.element = createElement('main', {}, title);
  }
  mount(container) {
    container.replaceChildren(this.element);
  }
}
