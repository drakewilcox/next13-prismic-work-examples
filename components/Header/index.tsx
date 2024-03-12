'use client';

import styles from './header.module.css';

import { useEffect } from 'react';
import type { Content } from '@prismicio/client';
import Link from 'next/link';
import { useAnimate, motion } from 'framer-motion';
import { FocusOn } from 'react-focus-on';
import classNames from 'classnames';

import { useStore } from '@/hooks/useStore';
import { Menu } from '@/components/Menu';
import { MenuCollapsed } from '@/components/MenuCollapsed';
import { MenuToggle } from '@/components/MenuToggle';
import { Logo } from '@/components/Logo';
import { AllConditions } from '@/components/Weather/conditionTypes';

function Wrapper({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate();

  const collapsedMenuActive = useStore(
    (state: any) => state.collapsedMenuActive
  );

  // Animate header on initial load
  useEffect(() => {
    animate(
      scope.current,
      { y: ['-150%', '0%'] },
      { duration: 0.75, ease: [0.44, 0.21, 0, 1], delay: 0.25 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FocusOn
      enabled={collapsedMenuActive}
      autoFocus={false}
      className={styles.headerWrapper}
      ref={scope}
      style={{ transform: 'translateY(-150%)' }}
    >
      {children}
    </FocusOn>
  );
}

function Inner({ children }: { children: React.ReactNode }) {
  const collapsedMenuActive = useStore(
    (state: any) => state.collapsedMenuActive
  );

  return (
    <motion.header
      className={classNames([
        styles.header,
        collapsedMenuActive && styles.menuActive,
      ])}
    >
      {children}
    </motion.header>
  );
}

export function Header({
  menuData,
  conditionsData,
}: {
  menuData: Content.MenuDocument;
  conditionsData: AllConditions;
}) {
  return (
    <Wrapper>
      <Inner>
        <div id="header" className={styles.container}>
          <div className={styles.logo}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="Go to the Homepage"
            >
              <Logo />
            </Link>
          </div>
          <Menu menuData={menuData} conditionsData={conditionsData} />
          <MenuToggle />
        </div>
      </Inner>
      <MenuCollapsed menuData={menuData} conditionsData={conditionsData} />
    </Wrapper>
  );
}
