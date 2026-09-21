import { createElement, getAssetUrl } from '@/utils';
import styles from './CardCatalog.module.css';

class CardCatalog {
  constructor(product) {
    const image = createElement('img', {
      className: styles.image,
      src: getAssetUrl(product.image),
      alt: product.name,
    });

    const imageWrapper = createElement('div', { className: styles.imageWrapper }, image);
    const name = createElement('h2', { className: styles.name }, product.name);
    const description = createElement('p', { className: styles.description }, product.description);
    const text = createElement('div', { className: styles.text }, name, description);
    const price = createElement('p', { className: styles.price }, `$${product.price}`);
    const content = createElement('div', { className: styles.content }, text, price);

    this.element = createElement('article', { className: styles.card }, imageWrapper, content);
  }
}

export { CardCatalog };
