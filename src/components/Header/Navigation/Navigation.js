import { createElement } from '@/utils';
import styles from './Navigation.module.css';

const NAV_ITEMS = [
  {
    label: 'Favorite coffee',
    hash: 'favorite-coffee',
    homeOnly: true,
  },
  {
    label: 'About',
    hash: 'about',
    homeOnly: true,
  },
  {
    label: 'Mobile app',
    hash: 'mobile-app',
  },
  {
    label: 'Contact us',
    hash: 'contact-us',
  },
];

function getBasePath() {
  return import.meta.env.BASE_URL.replace(/\/$/, '');
}

function navHref({ hash, homeOnly }) {
  if (!homeOnly) {
    return `#${hash}`;
  }
  const base = getBasePath();
  return `${base}/#${hash}`;
}

export class Navigation {
  constructor() {
    const navItems = NAV_ITEMS.map((item) => {
      const link = createElement(
        'a',
        {
          className: styles.navLink,
          href: navHref(item),
        },
        item.label,
      );
      return createElement(
        'li',
        {
          className: styles.navItem,
        },
        link,
      );
    });

    const navList = createElement(
      'ul',
      {
        className: styles.navList,
      },
      ...navItems,
    );

    this.element = createElement(
      'nav',
      {
        className: styles.nav,
        'aria-label': 'Primary',
      },
      navList,
    );
  }
}
