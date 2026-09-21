import { Catalog } from '@/components/Catalog';

class Menu {
  constructor() {
    this.sections = [new Catalog()];
  }
  mount(container) {
    container.replaceChildren(...this.sections.map((section) => section.element));
  }
}

export { Menu };
