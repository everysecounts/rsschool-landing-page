import { createElement, getHomeHashUrl } from '@/utils';
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
    homeOnly: true,
  },
  {
    label: 'Contact us',
    hash: 'contact-us',
  },
];

function navHref({ hash, homeOnly }) {
  return homeOnly ? getHomeHashUrl(hash) : `#${hash}`;
}

class Navigation {
  constructor(onLinkClick) {
    const navItems = NAV_ITEMS.map((item) => {
      const link = createElement(
        'a',
        {
          className: styles.navLink,
          href: navHref(item),
        },
        item.label,
      );

      if (onLinkClick) {
        link.addEventListener('click', onLinkClick);
      }

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

export { Navigation };
