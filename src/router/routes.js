import { Home } from '@/pages/Home/Home.js';
import { Menu } from '@/pages/Menu/Menu.js';
import { NotFound } from '@/pages/NotFound/NotFound.js';

export const routes = {
  '/': Home,
  '/menu': Menu,
  '*': NotFound,
};
