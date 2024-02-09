'use client';

import styles from './menu.module.css';

// Radix Global Navigation global styles
import './radixNavigationMenu.css';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Content, isFilled } from '@prismicio/client';
import Cookies from 'js-cookie';
import { SliceZone, PrismicLink } from '@prismicio/react';
import { components } from '@/slices';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { useStore } from '@/hooks/useStore';
import { NavConditions } from '@/components/Weather/NavConditions';
import { NavWebcams } from '@/components/Weather/NavWebcams';
import { AllConditions } from '@/components/Weather/conditionTypes';

export function Menu({
  menuData,
  conditionsData,
}: {
  menuData: Content.MenuDocument;
  conditionsData: AllConditions;
}) {
  const { data } = menuData;

  const [menuReset, setMenuReset] = useState('');
  const pathname = usePathname();

  const [setUnitSystem] = useStore((state: any) => [state.setUnitSystem]);

  const initialized = useRef(false);
  const unitCookie = Cookies.get('unitSystem');

  useEffect(() => {
    if (!initialized.current && unitCookie) {
      setUnitSystem(unitCookie || 'US');
      initialized.current = true;
    }
  }, [unitCookie]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMenuReset('');
  }, [pathname]);

  return (
    <div className={styles.menu}>
      <NavigationMenu.Root
        className="NavigationMenuRoot"
        value={menuReset}
        onValueChange={setMenuReset}
        aria-label="main"
      >
        <NavigationMenu.List className="NavigationMenuList">
          {/* Menu items */}
          <SliceZone slices={data.slices} components={components} />

          {/* Webcams flyout */}
          <NavWebcams webcams={conditionsData.webcams} />

          {/* Conditions flyout */}
          <NavConditions
            currentWeather={conditionsData.currentWeather}
            currentSnow={conditionsData.currentSnow}
            roadsData={conditionsData.roadsData}
            liftsOverall={conditionsData.liftsOverall}
            trailsOverall={conditionsData.trailsOverall}
          />

          {/* Single menu button */}
          {isFilled.link(data?.button_link) &&
            isFilled.keyText(data?.button_label) && (
              <NavigationMenu.Item>
                <PrismicLink
                  field={data.button_link}
                  internalComponent={Link}
                  className={classNames([styles.menuButton, 'button'])}
                >
                  <span>{data.button_label}</span>
                </PrismicLink>
              </NavigationMenu.Item>
            )}

          {/* Indicator arrow above submenu */}
          {/* <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator> */}
        </NavigationMenu.List>

        {/* Submenu wrapper */}
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  );
}
