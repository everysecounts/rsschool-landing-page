import { createElement, createSvg, getBaseUrl } from '@/utils';
import { LOGO_PATHS } from './logoPaths.js';
import styles from './Logo.module.css';

function createLogoGraphic() {
  const paths = LOGO_PATHS.map(({ kind, d }) =>
    createSvg('path', {
      d,
      fill: kind === 'accent' ? 'var(--text-accent)' : 'currentColor',
    }),
  );

  return createSvg(
    'svg',
    {
      width: '100',
      height: '60',
      viewBox: '0 0 100 60',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    ...paths,
  );
}

class Logo {
  constructor(onLinkClick) {
    const graphic = createElement(
      'span',
      {
        className: styles.logo,
        'aria-hidden': 'true',
      },
      createLogoGraphic(),
    );
    this.element = createElement(
      'a',
      {
        className: styles.link,
        href: getBaseUrl(),
        'aria-label': 'Resource Coffee House — Home page',
      },
      graphic,
    );
    this.element.addEventListener('click', onLinkClick);
  }
}

export { Logo };
