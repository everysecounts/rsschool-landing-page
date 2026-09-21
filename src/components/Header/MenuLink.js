import { createElement, getPageUrl } from '@/utils';
import { menuIcon } from './Controls/menuIcon';

function createMenuLink(className, iconClassName, onLinkClick) {
  const link = createElement(
    'a',
    {
      className,
      href: getPageUrl('menu'),
    },
    'Menu',
    menuIcon(iconClassName),
  );

  if (onLinkClick) {
    link.addEventListener('click', (event) => {
      onLinkClick(event, link);
    });
  }

  return link;
}

export { createMenuLink };
