import { createElement, createSvg } from '@/utils';
import styles from './Modal.module.css';

class Modal {
  constructor(product) {
    this.product = product;
    this.selectedSize = 's';
    this.selectedAdditives = [];
    this.previousOverflow = document.body.style.overflow;
    this.createElement();
    this.addListeners();
    document.body.style.overflow = 'hidden';
  }

  createElement() {
    const closeButton = createElement(
      'button',
      {
        className: styles.closeButton,
        type: 'button',
      },
      'Close',
    );

    const imageWrapper = createElement('div', {
      className: styles.imageWrapper,
      style: `--product-image: url('${this.product.image}')`,
      role: 'img',
      'aria-label': this.product.name,
    });

    const title = createElement(
      'h2',
      {
        className: styles.title,
      },
      this.product.name,
    );

    const description = createElement(
      'p',
      {
        className: styles.description,
      },
      this.product.description,
    );

    const titleGroup = createElement(
      'div',
      {
        className: styles.titleGroup,
      },
      title,
      description,
    );

    const sizeBlock = this.createSizeBlock();
    const additivesBlock = this.createAdditivesBlock();

    const totalLabel = createElement(
      'p',
      {
        className: styles.totalLabel,
      },
      'Total:',
    );

    this.totalPrice = createElement('p', {
      className: styles.totalPrice,
    });

    const total = createElement(
      'div',
      {
        className: styles.total,
      },
      totalLabel,
      this.totalPrice,
    );

    const notice = createElement(
      'div',
      {
        className: styles.notice,
      },
      this.createNoticeIcon(),
      createElement(
        'p',
        {
          className: styles.noticeText,
        },
        'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.',
      ),
    );

    const details = createElement(
      'div',
      {
        className: styles.details,
      },
      titleGroup,
      sizeBlock,
      additivesBlock,
      total,
      notice,
      closeButton,
    );

    const content = createElement(
      'div',
      {
        className: styles.content,
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': this.product.name,
      },
      imageWrapper,
      details,
    );

    this.element = createElement(
      'div',
      {
        className: styles.overlay,
        role: 'presentation',
      },
      content,
    );

    this.closeButton = closeButton;
    this.updateTotalPrice();
  }

  createSizeBlock() {
    const title = createElement(
      'p',
      {
        className: styles.sizeTitle,
      },
      'Size',
    );

    const options = createElement('div', {
      className: styles.sizeOptions,
    });

    this.sizeOptions = [];

    Object.entries(this.product.sizes).forEach(([key, size]) => {
      const icon = createElement(
        'div',
        {
          className: styles.optionIcon,
        },
        key.toUpperCase(),
      );

      const label = createElement(
        'p',
        {
          className: styles.optionLabel,
        },
        size.size,
      );

      const option = createElement(
        'button',
        {
          className: `${styles.sizeOption} ${key === this.selectedSize ? styles.optionActive : ''}`,
          type: 'button',
        },
        icon,
        label,
      );

      option.addEventListener('click', () => {
        this.selectedSize = key;
        this.updateSizeOptions();
        this.updateTotalPrice();
      });

      this.sizeOptions.push(option);
      options.append(option);
    });

    return createElement(
      'div',
      {
        className: styles.size,
      },
      title,
      options,
    );
  }

  createAdditivesBlock() {
    const title = createElement(
      'p',
      {
        className: styles.additivesTitle,
      },
      'Additives',
    );

    const options = createElement('div', {
      className: styles.additiveOptions,
    });

    this.additiveOptions = [];

    this.product.additives.forEach((additive, index) => {
      const icon = createElement(
        'div',
        {
          className: styles.optionIcon,
        },
        String(index + 1),
      );

      const label = createElement(
        'p',
        {
          className: styles.optionLabel,
        },
        additive.name,
      );

      const option = createElement(
        'button',
        {
          className: `${styles.additiveOption} ${
            this.selectedAdditives.includes(index) ? styles.optionActive : ''
          }`,
          type: 'button',
        },
        icon,
        label,
      );

      option.addEventListener('click', () => {
        this.toggleAdditive(index);
        option.classList.toggle(styles.optionActive, this.selectedAdditives.includes(index));
        this.updateTotalPrice();
      });

      this.additiveOptions.push(option);
      options.append(option);
    });

    return createElement(
      'div',
      {
        className: styles.additives,
      },
      title,
      options,
    );
  }

  toggleAdditive(index) {
    if (this.selectedAdditives.includes(index)) {
      this.selectedAdditives = this.selectedAdditives.filter((item) => item !== index);
      return;
    }
    this.selectedAdditives.push(index);
  }

  createNoticeIcon() {
    const svg = createSvg('svg', {
      class: styles.noticeIcon,
      width: '16',
      height: '16',
      viewBox: '0 0 16 16',
      fill: 'none',
      'aria-hidden': 'true',
    });

    const circle = createSvg('circle', {
      cx: '8',
      cy: '8',
      r: '6.667',
      stroke: 'currentColor',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    });

    const line = createSvg('path', {
      d: 'M8 7.667V11',
      stroke: 'currentColor',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    });

    const dot = createSvg('path', {
      d: 'M8 5.007L8.007 5',
      stroke: 'currentColor',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    });

    svg.append(circle, line, dot);
    return svg;
  }

  updateSizeOptions() {
    const sizeKeys = Object.keys(this.product.sizes);
    this.sizeOptions.forEach((option, index) => {
      option.classList.toggle(styles.optionActive, sizeKeys[index] === this.selectedSize);
    });
  }

  updateTotalPrice() {
    const sizePrice = Number(this.product.sizes[this.selectedSize]['add-price']);
    const additivesPrice = this.selectedAdditives.reduce(
      (total, index) => total + Number(this.product.additives[index]['add-price']),
      0,
    );
    const total = Number(this.product.price) + sizePrice + additivesPrice;
    this.totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  addListeners() {
    this.closeButton.addEventListener('click', () => this.close());
    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) {
        this.close();
      }
    });
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  close() {
    document.removeEventListener('keydown', this.handleKeydown);
    this.element.remove();
    document.body.style.overflow = this.previousOverflow;
  }
}

export { Modal };
