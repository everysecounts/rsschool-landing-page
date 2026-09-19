import { createElement, registerSection } from '@/utils';
import { menuIcon } from '@/components/Header/Controls/menuIcon';
import styles from './Hero.module.css';

class Hero {
  constructor() {
    const video = createElement('video', {
      className: styles.video,
      poster: `${import.meta.env.BASE_URL}assets/img-hero.avif`,
      autoplay: '',
      muted: '',
      loop: '',
      playsinline: '',
      preload: 'metadata',
    });

    const source = createElement('source', {
      // src: `${import.meta.env.BASE_URL}assets/hero.mp4`,
      type: 'video/mp4',
    });

    video.append(source);

    const content = createElement(
      'div',
      { className: styles.content },
      createElement(
        'h1',
        { className: styles.title },
        createElement('span', { className: styles.titleAccent }, 'Enjoy'),
        ' premium coffee at our charming cafe',
      ),
      createElement(
        'p',
        { className: styles.description },
        'With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.',
      ),
      createElement(
        'a',
        {
          className: styles.button,
          href: `${import.meta.env.BASE_URL}menu`,
        },
        'Menu',
        menuIcon(styles.menuIcon),
      ),
    );

    this.element = createElement(
      'section',
      {
        className: styles.section,
        id: 'home',
      },
      video,
      content,
    );

    registerSection('home', this.element);
  }
}

export { Hero };
