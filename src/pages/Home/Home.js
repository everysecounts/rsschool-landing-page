import { createElement } from '@/utils';

class Home {
  constructor() {
    const title = createElement('h1', {}, 'Home');
    this.element = title;
  }

  mount(container) {
    container.replaceChildren(this.element);
  }
}

export { Home };
