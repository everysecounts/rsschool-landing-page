import { Home } from '@/pages/Home';
import { Menu } from '@/pages/Menu';
import { NotFound } from '@/pages/NotFound';

export const routes = {
  '/': Home,
  '/menu': Menu,
  '*': NotFound,
};
