import styles from './footer.module.css';

import type { Content } from '@prismicio/client';
import { PrismicLink } from '@prismicio/react';
import Link from 'next/link';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { Logo } from '@/components/Logo';

const splitArray = (arr: Content.FooterDocumentDataPrimaryLinksItem[]) => {
  const half = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half);
  return [[...firstHalf], [...secondHalf]];
};

export function Footer({ footerData }: { footerData: Content.FooterDocument }) {
  const primaryLinks = footerData.data?.primary_links ?? [];
  const [primaryLinksFirst, primaryLinksSecond] = splitArray(primaryLinks);

  return (
    <footer className={classNames([styles.footer])}>
      <div className={classNames([styles.footerGrid, 'grid'])}>
        <div className={classNames([styles.logo, styles.logoMd, styles.col])}>
          <Logo />
        </div>
        <div className={styles.col}>
          <ul className={styles.primaryLinks}>
            {primaryLinksFirst?.map((item: any) => (
              <li key={uuidv4()}>
                <PrismicLink
                  field={item?.link}
                  className={styles.link}
                  internalComponent={Link}
                  aria-describedby={
                    item.link?.target === '_blank' ? 'new-window-2' : ''
                  }
                >
                  {item?.label}
                </PrismicLink>
              </li>
            ))}
          </ul>

          <ul className={styles.primaryLinks}>
            {primaryLinksSecond?.map((item: any) => (
              <li key={uuidv4()}>
                <PrismicLink
                  field={item?.link}
                  className={styles.link}
                  internalComponent={Link}
                  aria-describedby={
                    item.link?.target === '_blank' ? 'new-window-2' : ''
                  }
                >
                  {item?.label}
                </PrismicLink>
              </li>
            ))}
          </ul>

          <ul className={styles.socialLinks}>
            {footerData.data?.social_platforms.map((item: any) => (
              <li key={uuidv4()}>
                <PrismicLink
                  field={item?.link}
                  className={styles.link}
                  internalComponent={Link}
                  aria-describedby={
                    item.link?.target === '_blank' ? 'new-window-2' : ''
                  }
                >
                  {item?.label}
                </PrismicLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={classNames([styles.footerGrid, styles.bottomRow, 'grid'])}
      >
        <div className={styles.col}>
          <div className={classNames([styles.logo, styles.logoBase])}>
            <Logo />
          </div>
          <p>
            <span>&copy; {new Date().getFullYear()}</span>{' '}
            <span>{footerData.data.copyright}</span>
          </p>
        </div>
        <div className={styles.col}>
          <ul className={styles.secondaryLinks}>
            {footerData.data?.secondary_links.map((item: any) => (
              <li key={uuidv4()}>
                <PrismicLink
                  field={item?.link}
                  className={styles.link}
                  internalComponent={Link}
                  aria-describedby={
                    item.link?.target === '_blank' ? 'new-window-2' : ''
                  }
                >
                  {item?.label}
                </PrismicLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
