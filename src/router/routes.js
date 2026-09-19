import { Home } from '@/pages/Home';
import { Menu } from '@/pages/Menu';
import { NotFound } from '@/pages/NotFound';

const routes = {
  '/': Home,
  '/menu': Menu,
  '*': NotFound,
};

export { routes };
