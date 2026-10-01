import { createElement, createSvg, registerSection } from '@/utils';
import { FAVORITE_PRODUCTS } from '@/data';
import styles from './Favorites.module.css';

const SLIDE_DURATION = 5000;
const TRANSITION_DURATION = 700;
const DRAG_THRESHOLD_RATIO = 0.15;
const DIRECTION_THRESHOLD = 5;

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
    draggable: 'false',
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
  const items = [];
  const fills = [];

  const progress = createElement(
    'div',
    {
      className: styles.progress,
      'aria-hidden': 'true',
    },
    ...FAVORITE_PRODUCTS.map(() => {
      const fill = createElement('span', {
        className: styles.progressFill,
      });

      const item = createElement('span', { className: styles.progressItem }, fill);

      items.push(item);
      fills.push(fill);

      return item;
    }),
  );

  return {
    element: progress,
    items,
    fills,
  };
}

class Favorites {
  constructor() {
    this.count = FAVORITE_PRODUCTS.length;
    this.currentIndex = 0;
    this.position = 1;
    this.isAnimating = false;
    this.timer = null;
    this.fallbackTimer = null;
    this.autoSlideRemaining = SLIDE_DURATION;
    this.autoSlideStartedAt = 0;
    this.isDragging = false;
    this.activePointerId = null;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragBasePercent = 0;
    this.viewportWidth = 0;
    this.dragDirection = null;

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

    this.viewport = createElement('div', { className: styles.viewport }, this.track);
    this.viewport.style.userSelect = 'none';
    this.viewport.style.touchAction = 'pan-y';

    const carousel = createElement(
      'div',
      { className: styles.carousel },
      this.previousButton,
      this.viewport,
      this.nextButton,
    );

    const progressData = createProgress();

    this.progress = progressData.element;
    this.progressItems = progressData.items;
    this.progressFills = progressData.fills;

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

    this.viewport.addEventListener('pointerdown', this.handlePointerDown);
    this.viewport.addEventListener('pointermove', this.handlePointerMove);
    this.viewport.addEventListener('pointerup', this.handlePointerUp);
    this.viewport.addEventListener('pointercancel', this.handlePointerUp);
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

  getActiveFill() {
    return this.progressFills[this.currentIndex] ?? null;
  }

  startAutoSlide() {
    this.autoSlideRemaining = SLIDE_DURATION;
    this.autoSlideStartedAt = Date.now();
    this.timer = window.setTimeout(() => {
      this.showNext();
    }, this.autoSlideRemaining);
  }

  restartAutoSlide() {
    window.clearTimeout(this.timer);
    this.startAutoSlide();

    const fill = this.getActiveFill();
    if (fill) {
      fill.style.animation = 'none';
      void fill.offsetHeight;
      fill.style.animation = '';
      fill.style.animationPlayState = '';
    }
  }

  pauseAutoSlide() {
    window.clearTimeout(this.timer);

    const elapsed = Date.now() - this.autoSlideStartedAt;
    this.autoSlideRemaining = Math.max(0, this.autoSlideRemaining - elapsed);

    const fill = this.getActiveFill();
    if (fill) {
      fill.style.animationPlayState = 'paused';
    }
  }

  resumeAutoSlide() {
    this.autoSlideStartedAt = Date.now();
    this.timer = window.setTimeout(() => {
      this.showNext();
    }, this.autoSlideRemaining);

    const fill = this.getActiveFill();
    if (fill) {
      fill.style.animationPlayState = 'running';
    }
  }

  handlePointerDown = (event) => {
    if (this.isAnimating || this.isDragging) return;
    if (event.button !== undefined && event.button !== 0) return;
    this.activePointerId = event.pointerId;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragBasePercent = -100 * this.position;
    this.viewportWidth = this.viewport.offsetWidth;
    this.dragDirection = null;
    this.pauseAutoSlide();
  };

  handlePointerMove = (event) => {
    if (event.pointerId !== this.activePointerId) return;
    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;

    if (!this.dragDirection) {
      if (Math.abs(deltaX) < DIRECTION_THRESHOLD && Math.abs(deltaY) < DIRECTION_THRESHOLD) {
        return;
      }
      this.dragDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
      if (this.dragDirection === 'vertical') {
        return;
      }
      this.isDragging = true;
      this.track.style.transition = 'none';
      this.viewport.setPointerCapture(event.pointerId);
      window.clearTimeout(this.fallbackTimer);
      this.pauseAutoSlide();
    }
    if (!this.isDragging || this.dragDirection !== 'horizontal') {
      return;
    }
    const deltaPercent = (deltaX / this.viewportWidth) * 100;
    this.track.style.transform = `translateX(${this.dragBasePercent + deltaPercent}%)`;
  };

  handlePointerUp = (event) => {
    if (event.pointerId !== this.activePointerId) return;

    const deltaX = event.clientX - this.dragStartX;

    if (this.viewport.hasPointerCapture?.(event.pointerId)) {
      this.viewport.releasePointerCapture(event.pointerId);
    }

    this.activePointerId = null;
    if (this.dragDirection !== 'horizontal') {
      this.resumeAutoSlide();
      this.dragDirection = null;
      return;
    }
    this.isDragging = false;

    const threshold = this.viewportWidth * DRAG_THRESHOLD_RATIO;

    this.track.style.transition = '';

    if (deltaX <= -threshold) {
      this.showNext();
    } else if (deltaX >= threshold) {
      this.showPrevious();
    } else {
      this.moveTrack(true);
      this.resumeAutoSlide();
    }
    this.dragDirection = null;
  };
}

export { Favorites };
