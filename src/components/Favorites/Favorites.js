import { createElement, createSvg, registerSection } from '@/utils';
import { FAVORITE_PRODUCTS } from '@/data';
import styles from './Favorites.module.css';

const SLIDE_DURATION = 5000;
const TRANSITION_DURATION = 700;

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

function createCard(product, isClone = false) {
  const image = createElement('img', {
    className: styles.image,
    src: product.image,
    alt: isClone ? '' : product.name,
  });

  const name = createElement('h3', { className: styles.name }, product.name);
  const description = createElement('p', { className: styles.description }, product.description);
  const price = createElement('p', { className: styles.price }, product.price);

  const card = createElement(
    'article',
    { className: styles.card },
    image,
    name,
    description,
    price,
  );

  if (isClone) {
    card.setAttribute('aria-hidden', 'true');
  }

  return card;
}

function createProgress() {
  return createElement(
    'div',
    {
      className: styles.progress,
      'aria-hidden': 'true',
    },
    ...FAVORITE_PRODUCTS.map(() =>
      createElement(
        'span',
        { className: styles.progressItem },
        createElement('span', { className: styles.progressFill }),
      ),
    ),
  );
}

class Favorites {
  constructor() {
    this.count = FAVORITE_PRODUCTS.length;
    this.currentIndex = 0;
    this.position = 1;
    this.isAnimating = false;
    this.timer = null;
    this.fallbackTimer = null;

    const title = createElement(
      'h2',
      { className: styles.title },
      'Choose your ',
      createElement('span', { className: styles.titleAccent }, 'favorite'),
      ' coffee',
    );

    this.previousButton = createArrowButton('left', 'Previous coffee', styles.arrowPrevious);
    this.nextButton = createArrowButton('right', 'Next coffee', styles.arrowNext);

    const firstProduct = FAVORITE_PRODUCTS[0];
    const lastProduct = FAVORITE_PRODUCTS[this.count - 1];

    this.track = createElement(
      'div',
      { className: styles.track },
      createCard(lastProduct, true),
      ...FAVORITE_PRODUCTS.map((product) => createCard(product)),
      createCard(firstProduct, true),
    );

    const viewport = createElement('div', { className: styles.viewport }, this.track);
    const carousel = createElement(
      'div',
      { className: styles.carousel },
      this.previousButton,
      viewport,
      this.nextButton,
    );

    this.progress = createProgress();
    this.progressItems = [...this.progress.children];
    this.element = createElement(
      'section',
      {
        className: styles.section,
        id: 'favorite-coffee',
      },
      title,
      carousel,
      this.progress,
    );
    this.element.style.setProperty('--slide-duration', `${SLIDE_DURATION}ms`);
    this.previousButton.addEventListener('click', () => {
      this.showPrevious();
    });
    this.nextButton.addEventListener('click', () => {
      this.showNext();
    });
    this.track.addEventListener('transitionend', (event) => {
      if (event.target === this.track) {
        this.handleTransitionEnd();
      }
    });

    registerSection('favorite-coffee', this.element);
    this.moveTrack(false);
    this.updateProgress();
    this.startAutoSlide();
  }

  showNext() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.position += 1;
    this.currentIndex = (this.currentIndex + 1) % this.count;
    this.update();
  }

  showPrevious() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.position -= 1;
    this.currentIndex = (this.currentIndex - 1 + this.count) % this.count;
    this.update();
  }

  update() {
    this.moveTrack(true);
    this.updateProgress();
    this.restartAutoSlide();
    window.clearTimeout(this.fallbackTimer);
    this.fallbackTimer = window.setTimeout(() => {
      this.handleTransitionEnd();
    }, TRANSITION_DURATION + 100);
  }

  moveTrack(animate) {
    this.track.style.transition = animate ? '' : 'none';
    this.track.style.transform = `translateX(${-100 * this.position}%)`;
    if (!animate) {
      void this.track.offsetHeight;
      this.track.style.transition = '';
    }
  }

  handleTransitionEnd() {
    if (!this.isAnimating) return;
    window.clearTimeout(this.fallbackTimer);
    if (this.position === this.count + 1) {
      this.position = 1;
      this.moveTrack(false);
    } else if (this.position === 0) {
      this.position = this.count;
      this.moveTrack(false);
    }
    this.isAnimating = false;
  }

  updateProgress() {
    this.progressItems.forEach((item, index) => {
      item.classList.remove(styles.progressItemActive, styles.progressItemComplete);
      if (index === this.currentIndex) {
        item.classList.add(styles.progressItemActive);
      }
    });
  }

  startAutoSlide() {
    this.timer = window.setTimeout(() => {
      this.showNext();
    }, SLIDE_DURATION);
  }

  restartAutoSlide() {
    window.clearTimeout(this.timer);
    this.startAutoSlide();
  }
}

export { Favorites };
