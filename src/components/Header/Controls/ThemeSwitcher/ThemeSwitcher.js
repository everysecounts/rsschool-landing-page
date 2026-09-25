import { createElement, createSvg } from '@/utils';
import { MOON_PATH, SUN_PATH } from './themeIcons';
import styles from './ThemeSwitcher.module.css';

const THEME_STORAGE_KEY = 'theme';

function icon(path, viewBox, size) {
  return createSvg(
    'svg',
    {
      viewBox,
      width: size,
      height: size,
      'aria-hidden': 'true',
      focusable: 'false',
    },
    createSvg('path', {
      d: path,
      fill: 'currentColor',
    }),
  );
}

class ThemeSwitcher {
  constructor() {
    this.sunButton = createElement(
      'button',
      {
        className: `${styles.option} ${styles.sun}`,
        type: 'button',
        'aria-label': 'Light theme',
        'aria-pressed': 'false',
      },
      icon(SUN_PATH, '0 0 22 22', 22),
    );

    this.moonButton = createElement(
      'button',
      {
        className: `${styles.option} ${styles.moon}`,
        type: 'button',
        'aria-label': 'Dark theme',
        'aria-pressed': 'false',
      },
      icon(MOON_PATH, '0 0 18 18', 18),
    );

    this.element = createElement(
      'div',
      {
        className: styles.switcher,
      },
      this.sunButton,
      this.moonButton,
    );
    this.bindEvents();
    this.updateState();
  }

  bindEvents() {
    this.sunButton.addEventListener('click', () => {
      this.setTheme('light');
    });

    this.moonButton.addEventListener('click', () => {
      this.setTheme('dark');
    });
  }

  getTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  }

  setTheme(theme) {
    if (theme === this.getTheme()) {
      return;
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    this.updateState();
  }

  updateState() {
    const theme = this.getTheme();
    const isLightTheme = theme === 'light';
    document.documentElement.dataset.theme = theme;
    this.element.dataset.theme = theme;
    this.sunButton.disabled = isLightTheme;
    this.moonButton.disabled = !isLightTheme;
    this.sunButton.setAttribute('aria-pressed', String(isLightTheme));
    this.moonButton.setAttribute('aria-pressed', String(!isLightTheme));
  }
}

export { ThemeSwitcher };
