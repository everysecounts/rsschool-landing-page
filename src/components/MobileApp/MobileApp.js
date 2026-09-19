import { createElement, registerSection } from '@/utils';
import { appStoreIcon, googlePlayIcon } from './icons';
import styles from './MobileApp.module.css';

const APP_LINKS = [
  {
    label: 'App Store',
    availableText: 'Available on the',
    href: 'https://www.apple.com/app-store/',
    icon: appStoreIcon,
  },
  {
    label: 'Google Play',
    availableText: 'Available on',
    href: 'https://play.google.com/store/',
    icon: googlePlayIcon,
  },
];

function createStoreLink({ label, availableText, href, icon }) {
  return createElement(
    'a',
    {
      className: styles.storeLink,
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `Download on ${label}`,
    },
    icon(styles.storeIcon),
    createElement(
      'span',
      { className: styles.storeText },
      createElement('span', { className: styles.storeLabel }, availableText),
      createElement('span', { className: styles.storeName }, label),
    ),
  );
}

class MobileApp {
  constructor() {
    const storeLinks = createElement(
      'div',
      { className: styles.storeLinks },
      ...APP_LINKS.map(createStoreLink),
    );

    const info = createElement(
      'div',
      { className: styles.info },

      createElement(
        'h2',
        { className: styles.title },
        createElement('span', { className: styles.titleAccent }, 'Download'),
        ' our app',
        createElement('br'),
        'to start ordering',
      ),

      createElement(
        'p',
        { className: styles.description },
        'Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are',
      ),

      storeLinks,
    );

    const image = createElement('img', {
      className: styles.image,
      src: '/assets/mobile-screens.avif',
      alt: 'Mobile screens',
    });

    this.element = createElement(
      'section',
      {
        className: styles.section,
        id: 'mobile-app',
      },
      info,
      image,
    );

    registerSection('mobile-app', this.element);
  }
}

export { MobileApp };
