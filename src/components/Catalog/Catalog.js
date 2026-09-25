import { createElement, createSvg, getAssetUrl } from '@/utils';
import { PRODUCTS } from '@/data';
import { CardCatalog } from '@/components/CardCatalog';
import styles from './Catalog.module.css';

const CATEGORIES = [
  {
    label: 'Coffee',
    value: 'coffee',
    icon: getAssetUrl('assets/coffee.svg'),
  },
  {
    label: 'Tea',
    value: 'tea',
    icon: getAssetUrl('assets/teapot.svg'),
  },
  {
    label: 'Dessert',
    value: 'dessert',
    icon: getAssetUrl('assets/cake.svg'),
  },
];

class Catalog {
  constructor() {
    this.activeCategory = 'coffee';

    this.title = createElement(
      'h1',
      { className: styles.title },
      'Behind each of our cups ',
      'hides an ',
      createElement('span', { className: styles.titleAccent }, 'amazing surprise'),
    );

    this.tabs = createElement(
      'div',
      {
        className: styles.tabs,
      },
      ...CATEGORIES.map((category, index) => this.createTab(category, index)),
    );

    this.products = createElement('div', {
      className: styles.products,
    });

    this.loadMoreButton = createElement(
      'button',
      {
        className: styles.loadMore,
        type: 'button',
        'aria-label': 'Load more products',
      },
      this.createLoadMoreIcon(),
    );

    this.renderProducts();

    this.element = createElement(
      'section',
      {
        className: styles.section,
      },
      this.title,
      this.tabs,
      this.products,
      this.loadMoreButton,
    );
  }

  createTab(category, index) {
    const isActive = index === 0;
    const icon = createElement('img', {
      className: styles.icon,
      src: category.icon,
      alt: '',
      'aria-hidden': 'true',
    });

    const iconWrapper = createElement('span', { className: styles.iconWrapper }, icon);
    const label = createElement('span', { className: styles.label }, category.label);

    return createElement(
      'button',
      {
        className: `${styles.tab} ${isActive ? styles.tabActive : ''}`,
        type: 'button',
      },
      iconWrapper,
      label,
    );
  }

  createLoadMoreIcon() {
    return createSvg(
      'svg',
      {
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': 'true',
      },
      createSvg('path', {
        d: 'M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.1006 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8',
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
      createSvg('path', {
        d: 'M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3',
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    );
  }

  renderProducts() {
    const products = PRODUCTS.filter((product) => product.category === this.activeCategory);
    this.products.replaceChildren(...products.map((product) => new CardCatalog(product).element));
  }

  mount(container) {
    container.replaceChildren(this.element);
  }
}

export { Catalog };
