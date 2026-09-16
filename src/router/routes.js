import { Home } from '@/pages/Home/Home.js';
import { Catalog } from '@/pages/Catalog/Catalog.js';
import { NotFound } from '@/pages/NotFound/NotFound.js';

export const routes = {
  '/': Home,
  '/catalog': Catalog,
  '*': NotFound,
};
