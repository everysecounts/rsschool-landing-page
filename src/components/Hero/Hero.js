import { createElement, getAssetUrl, getPageUrl, registerSection } from '@/utils';
import { menuIcon } from '@/components/Header/Controls/menuIcon';
import styles from './Hero.module.css';

class Hero {
  constructor(onLinkClick) {
    const video = createElement('video', {
      className: styles.video,
      poster: getAssetUrl('assets/img-hero.avif'),
      autoplay: '',
      muted: '',
      loop: '',
      playsinline: '',
      preload: 'metadata',
    });

    const source = createElement('source', {
      // src: getAssetUrl('assets/hero.mp4'),
      type: 'video/mp4',
    });

    video.append(source);

    const menuLink = createElement(
      'a',
      {
        className: styles.button,
        href: getPageUrl('menu'),
      },
      'Menu',
      menuIcon(styles.menuIcon),
    );

    if (onLinkClick) {
      menuLink.addEventListener('click', (event) => {
        onLinkClick(event, menuLink);
      });
    }

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
      menuLink,
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
