"use client";

import styles from "./menuToggle.module.css";

import { motion } from "framer-motion";
import classNames from "classnames";

import { useStore } from "@/hooks/useStore";

export const MenuToggle = () => {
  const [collapsedMenuActive, setCollapsedMenuActive] = useStore(
    (state: any) => [state.collapsedMenuActive, state.setCollapsedMenuActive]
  );

  return (
    <button
      className={classNames([
        styles.toggle,
        collapsedMenuActive && styles.menuOpen,
      ])}
      onClick={() => setCollapsedMenuActive(!collapsedMenuActive)}
      aria-label={collapsedMenuActive ? "Close menu" : "Open menu"}
    >
      <svg viewBox="0 0 16 16">
        <motion.path
          fill="currentColor"
          animate={
            collapsedMenuActive
              ? {
                  d: "M14.9949 0.9244L0.8527 15.0665L0.1456 14.3594L14.2878 0.2173L14.9949 0.9244Z",
                }
              : {
                  d: "M15.0704 2.1421L0.0704 2.1421L0.0704 1.1421L15.0704 1.1421L15.0704 2.1421Z",
                }
          }
          transition={{ ease: [0.5, 0, 0, 1], duration: 0.25 }}
        />
        <motion.path
          fill="currentColor"
          d="M15.0704 8.1421L0.0704 8.1421L0.0704 7.1421L15.0704 7.1421L15.0704 8.1421Z"
          animate={collapsedMenuActive ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          fill="currentColor"
          animate={
            collapsedMenuActive
              ? {
                  d: "M14.2879 15.0665L0.1457 0.9244L0.8528 0.2173L14.995 14.3594L14.2879 15.0665Z",
                }
              : {
                  d: "M15.0704 14.1421L0.0704 14.1421L0.0704 13.1421L15.0704 13.1421L15.0704 14.1421Z",
                }
          }
          transition={{ ease: [0.5, 0, 0, 1], duration: 0.25 }}
        />
      </svg>
    </button>
  );
};
