"use client";

import styles from "./menuCollapsed.module.css";

import { useEffect } from "react";
import Link from "next/link";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicLink } from "@prismicio/react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import classNames from "classnames";

import { AllConditions } from "@/components/Weather/conditionTypes";
import { useStore } from "@/hooks/useStore";
import { usePathname } from "next/navigation";
import { MiniConditions } from "@/components/Weather/MiniConditions";
import { MiniWebcams } from "@/components/Weather/MiniWebcams";

export const MenuCollapsed = ({
  menuData,
  conditionsData,
}: {
  menuData: Content.MenuDocument;
  conditionsData: AllConditions;
}) => {
  const windowSize = useWindowSize();

  const { data } = menuData;

  const [collapsedMenuActive, setCollapsedMenuActive] = useStore(
    (state: any) => [state.collapsedMenuActive, state.setCollapsedMenuActive]
  );

  const pathname = usePathname();

  const MenuLink = ({ link, label }: { link: any; label: string }) => {
    return (
      <li>
        <PrismicLink
          field={link}
          className={classNames([
            styles.link,
            link?.url === pathname && styles.active,
          ])}
          internalComponent={Link}
        >
          {label}
        </PrismicLink>
      </li>
    );
  };

  useEffect(() => {
    setCollapsedMenuActive(false);
  }, [pathname, setCollapsedMenuActive]);

  if (windowSize?.width && windowSize?.width >= 960) {
    collapsedMenuActive && setCollapsedMenuActive(false);
  }

  const menuVariants = {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: {
        ease: [0.5, 0, 0, 1],
        duration: 0.35,
      },
    },
    closed: {
      opacity: 0,
      transition: { ease: [0.5, 0, 0, 1], duration: 0.15 },
    },
  };

  return (
    <AnimatePresence>
      {collapsedMenuActive && (
        <motion.div
          className={styles.menu}
          initial="initial"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <div className={styles.menuButtonWrapper}>
            {isFilled.link(data?.button_link) && data?.button_label && (
              <PrismicLink
                field={data.button_link}
                internalComponent={Link}
                className={classNames([
                  styles.menuButton,
                  "button",
                  "fill-blue",
                ])}
              >
                <span>{data.button_label}</span>
              </PrismicLink>
            )}
          </div>
          <div className={styles.wrapper}>
            <nav>
              <ul className={styles.items}>
                <li>
                  <MiniConditions
                    currentWeather={conditionsData.currentWeather}
                    currentSnow={conditionsData.currentSnow}
                    roadsData={conditionsData.roadsData}
                    liftsOverall={conditionsData.liftsOverall}
                    trailsOverall={conditionsData.trailsOverall}
                  />
                </li>

                <li>
                  <MiniWebcams webcams={conditionsData.webcams} />
                </li>

                {data?.slices.map((item: any) => {
                  if (item.variation === "default" && item.primary?.link?.url) {
                    return (
                      <MenuLink
                        key={item.id}
                        link={item.primary?.link}
                        label={item.primary?.label}
                      />
                    );
                  }

                  if (item.variation === "withSubmenu") {
                    return (
                      <li key={item.id}>
                        <label>{item.primary?.label}</label>
                        <ul className={styles.items}>
                          {item.primary?.submenu.data.slices.map(
                            (item: any) => (
                              <MenuLink
                                key={item.id}
                                link={item.primary?.link}
                                label={item.primary?.label}
                              />
                            )
                          )}
                        </ul>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </nav>
            <div className={styles.scrollMask} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
