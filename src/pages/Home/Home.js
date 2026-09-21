import { Hero } from '@/components/Hero';
import { Favorites } from '@/components/Favorites';
import { About } from '@/components/About';
import { MobileApp } from '@/components/MobileApp';

class Home {
  constructor(onLinkClick) {
    this.sections = [new Hero(onLinkClick), new Favorites(), new About(), new MobileApp()];
  }

  mount(container) {
    container.replaceChildren(...this.sections.map((section) => section.element));
  }
}

export { Home };
