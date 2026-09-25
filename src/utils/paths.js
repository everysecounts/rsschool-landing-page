function getBaseUrl() {
  return import.meta.env.BASE_URL;
}

function getPageUrl(path) {
  return `${getBaseUrl()}${path.replace(/^\/+/, '')}`;
}

function getHomeHashUrl(hash) {
  return `${getBaseUrl()}#${hash}`;
}

function getAssetUrl(path) {
  return `${getBaseUrl()}${path.replace(/^\/+/, '')}`;
}

function getPathname(pathname) {
  const base = getBaseUrl().replace(/\/$/, '');
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path || '/';
}

export { getBaseUrl, getPageUrl, getHomeHashUrl, getAssetUrl, getPathname };
