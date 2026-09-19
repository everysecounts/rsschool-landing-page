import { createElement, registerSection } from '@/utils';
import styles from './About.module.css';

const IMAGES = [
  {
    src: `${import.meta.env.BASE_URL}assets/about-1.avif`,
    alt: 'Woman enjoying coffee',
    className: styles.imageLarge,
  },
  {
    src: `${import.meta.env.BASE_URL}assets/about-2.avif`,
    alt: 'Cup of coffee',
    className: styles.imageSmall,
  },
  {
    src: `${import.meta.env.BASE_URL}assets/about-3.avif`,
    alt: 'Man enjoying coffee',
    className: styles.imageSmall,
  },
  {
    src: `${import.meta.env.BASE_URL}assets/about-4.avif`,
    alt: 'Couple enjoying coffee',
    className: styles.imageLarge,
  },
];

class About {
  constructor() {
    const description = createElement(
      'p',
      { className: styles.description },
      'Resource is ',
      createElement('span', { className: styles.descriptionAccent }, 'the perfect and cozy place'),
      ' where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.',
    );

    const images = createElement(
      'div',
      { className: styles.images },
      ...IMAGES.map(({ src, alt, className }) =>
        createElement(
          'div',
          { className: styles.imageContainer },
          createElement('img', {
            className,
            src,
            alt,
          }),
        ),
      ),
    );

    this.element = createElement(
      'section',
      {
        className: styles.section,
        id: 'about',
      },
      description,
      images,
    );

    registerSection('about', this.element);
  }
}

export { About };
