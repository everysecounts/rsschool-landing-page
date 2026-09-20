import { Hero } from '@/components/Hero';
import { Favorites } from '@/components/Favorites';
import { About } from '@/components/About';
import { MobileApp } from '@/components/MobileApp';

class Home {
  constructor() {
    this.sections = [new Hero(), new Favorites(), new About(), new MobileApp()];
  }

  mount(container) {
    container.replaceChildren(...this.sections.map((section) => section.element));
  }
}

export { Home };
