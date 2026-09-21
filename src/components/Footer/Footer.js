import { createElement, registerSection } from '@/utils';
import { contactIcons, socialIcons } from './icons';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'X', href: 'https://x.com/', icon: socialIcons.twitter },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: socialIcons.instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: socialIcons.facebook },
];

const CONTACT_ITEMS = [
  {
    label: '8558 Green Rd.,  LA',
    href: 'https://maps.app.goo.gl/fx5A8m8jbESmfFgJ9',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: contactIcons.location,
  },
  {
    label: '+1 (603) 555-0123',
    href: 'tel:+16035550123',
    icon: contactIcons.phone,
  },
  {
    label: 'Mon–Sat: 9:00–23:00',
    icon: contactIcons.clock,
  },
];

function createSocialLinks() {
  return SOCIAL_LINKS.map(({ label, href, icon }) =>
    createElement(
      'a',
      {
        className: styles.socialLink,
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': label,
      },
      icon(styles.socialIcon),
    ),
  );
}

function createContactItem({ label, href, target, rel, icon }) {
  const content = [icon(styles.contactIcon), label];

  if (href) {
    return createElement(
      'li',
      { className: styles.contactItem },
      createElement(
        'a',
        {
          className: styles.contactLink,
          href,
          ...(target && { target }),
          ...(rel && { rel }),
        },
        ...content,
      ),
    );
  }

  return createElement(
    'li',
    { className: styles.contactItem },
    createElement('span', { className: styles.contactText }, ...content),
  );
}

class Footer {
  constructor() {
    const socialLinks = createElement(
      'div',
      { className: styles.socialLinks },
      ...createSocialLinks(),
    );

    const contactItems = CONTACT_ITEMS.map(createContactItem);
    const contactList = createElement('ul', { className: styles.contactList }, ...contactItems);

    const footerRight = createElement(
      'div',
      {
        className: styles.footerRight,
        id: 'contact-us',
      },
      createElement('h2', { className: styles.contactTitle }, 'Contact us'),
      contactList,
    );

    registerSection('contact-us', footerRight, { permanent: true });

    const content = createElement(
      'div',
      { className: styles.content },
      createElement(
        'div',
        { className: styles.footerLeft },
        createElement(
          'p',
          { className: styles.title },
          'Sip, Savor, Smile. ',
          createElement('span', { className: styles.titleAccent }, 'It’s coffee time!'),
        ),
        socialLinks,
      ),
      footerRight,
    );

    this.element = createElement('footer', { className: styles.footer }, content);
  }
}

export { Footer };
