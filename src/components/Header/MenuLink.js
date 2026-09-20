import { createElement, getPageUrl } from '@/utils';
import { menuIcon } from './Controls/menuIcon';

function createMenuLink(className, iconClassName) {
  return createElement(
    'a',
    {
      className,
      href: getPageUrl('menu'),
    },
    'Menu',
    menuIcon(iconClassName),
  );
}

export { createMenuLink };
