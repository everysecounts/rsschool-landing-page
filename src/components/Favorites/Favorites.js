import { createElement, createSvg, registerSection } from '@/utils';
import { FAVORITE_PRODUCTS } from '@/data';
import styles from './Favorites.module.css';

function arrowIcon(direction) {
  const path =
    direction === 'left' ? 'M18 12H5.5M11.5 18L5.5 12L11.5 6' : 'M6 12H18.5M12.5 18L18.5 12L12.5 6';

  return createSvg(
    'svg',
    {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    createSvg('path', {
      d: path,
      stroke: 'currentColor',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }),
  );
}

function createArrowButton(direction, label, className) {
  return createElement(
    'button',
    {
      className: `${styles.arrow} ${className}`,
      type: 'button',
      'aria-label': label,
    },
    arrowIcon(direction),
  );
}

function createCard(product) {
  const image = createElement('img', {
    className: styles.image,
    src: product.image,
    alt: product.name,
  });

  const name = createElement('h3', { className: styles.name }, product.name);
  const description = createElement('p', { className: styles.description }, product.description);
  const price = createElement('p', { className: styles.price }, product.price);
  return createElement('article', { className: styles.card }, image, name, description, price);
}

function createProgress() {
  return createElement(
    'div',
    {
      className: styles.progress,
      'aria-hidden': 'true',
    },
    ...FAVORITE_PRODUCTS.map((_, index) =>
      createElement('span', {
        className:
          index === 0 ? `${styles.progressItem} ${styles.progressItemActive}` : styles.progressItem,
      }),
    ),
  );
}

class Favorites {
  constructor() {
    const product = FAVORITE_PRODUCTS[0];

    const title = createElement(
      'h2',
      { className: styles.title },
      'Choose your ',
      createElement('span', { className: styles.titleAccent }, 'favorite'),
      ' coffee',
    );

    const previousButton = createArrowButton('left', 'Previous coffee', styles.arrowPrevious);
    const nextButton = createArrowButton('right', 'Next coffee', styles.arrowNext);
    const card = createCard(product);

    const carousel = createElement(
      'div',
      { className: styles.carousel },
      previousButton,
      card,
      nextButton,
    );

    const progress = createProgress();

    this.element = createElement(
      'section',
      {
        className: styles.section,
        id: 'favorite-coffee',
      },
      title,
      carousel,
      progress,
    );

    registerSection('favorite-coffee', this.element);
  }
}

export { Favorites };
