import { Home } from '@/pages/Home';
import { Menu } from '@/pages/Menu';
import { NotFound } from '@/pages/NotFound';

const routes = {
  '/': {
    Page: Home,
    title: 'Coffee House',
  },
  '/menu': {
    Page: Menu,
    title: 'Coffee House | Menu',
  },
  '*': {
    Page: NotFound,
    title: 'Coffee House | 404',
  },
};

export { routes };
