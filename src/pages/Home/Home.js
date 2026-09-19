import { About } from '@/components/About';
import { MobileApp } from '@/components/MobileApp';

class Home {
  constructor() {
    this.sections = [new About(), new MobileApp()];
  }

  mount(container) {
    container.replaceChildren(...this.sections.map((section) => section.element));
  }
}

export { Home };
