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
    this.isExpanded = false;
    this.isMobile = window.innerWidth <= 768;
    this.handleResize = this.handleResize.bind(this);

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
      ...CATEGORIES.map((category) => this.createTab(category)),
    );

    this.products = createElement('div', {
      className: styles.products,
    });

    this.loadMoreIcon = this.createLoadMoreIcon();

    this.loadMoreButton = createElement(
      'button',
      {
        className: styles.loadMore,
        type: 'button',
        'aria-label': 'Load more products',
      },
      this.loadMoreIcon,
    );

    this.loadMoreButton.addEventListener('click', () => {
      this.handleLoadMore();
    });

    window.addEventListener('resize', this.handleResize);

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

  createTab(category) {
    const isActive = category.value === this.activeCategory;
    const icon = createElement('img', {
      className: styles.icon,
      src: category.icon,
      alt: '',
      'aria-hidden': 'true',
    });

    const iconWrapper = createElement('span', { className: styles.iconWrapper }, icon);
    const label = createElement('span', { className: styles.label }, category.label);

    const button = createElement(
      'button',
      {
        className: `${styles.tab} ${isActive ? styles.tabActive : ''}`,
        type: 'button',
      },
      iconWrapper,
      label,
    );

    button.addEventListener('click', () => this.selectCategory(category.value));
    return button;
  }

  selectCategory(category) {
    if (category === this.activeCategory) {
      return;
    }

    this.activeCategory = category;
    this.isExpanded = false;

    [...this.tabs.children].forEach((tab, index) => {
      const isActive = CATEGORIES[index].value === this.activeCategory;

      tab.classList.toggle(styles.tabActive, isActive);
    });
    this.renderProducts();
  }

  getVisibleCount(totalProducts) {
    if (this.isExpanded || window.innerWidth > 768) {
      return totalProducts;
    }
    return Math.min(4, totalProducts);
  }

  handleResize() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile === this.isMobile) {
      return;
    }
    this.isMobile = isMobile;
    this.isExpanded = false;
    this.renderProducts();
  }

  handleLoadMore() {
    this.loadMoreButton.disabled = true;
    this.loadMoreButton.classList.add(styles.loading);

    const handleTransitionEnd = (event) => {
      if (event.target !== this.loadMoreIcon || event.propertyName !== 'transform') {
        return;
      }
      this.loadMoreButton.removeEventListener('transitionend', handleTransitionEnd);
      this.loadMoreButton.classList.remove(styles.loading);
      this.isExpanded = true;
      this.renderProducts();
      this.loadMoreButton.disabled = false;
    };
    this.loadMoreButton.addEventListener('transitionend', handleTransitionEnd);
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
    const visibleCount = this.getVisibleCount(products.length);
    this.products.replaceChildren(
      ...products.slice(0, visibleCount).map((product) => new CardCatalog(product).element),
    );
    const hasMoreProducts = visibleCount < products.length;
    this.loadMoreButton.style.display = hasMoreProducts ? 'flex' : 'none';
  }
}

export { Catalog };
