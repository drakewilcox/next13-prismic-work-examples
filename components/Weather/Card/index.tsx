"use client";

import styles from "./card.module.css";

import classNames from "classnames";
import slugify from "slugify";

export function Card({
  title = "Current Conditions",
  id = "current_conditions",
  subTitle = "SubTitle",
  headerComponent = <div></div>,
  children = <div></div>,
}: {
  title?: string;
  id?: string;
  subTitle?: string;
  headerComponent?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div
      id={slugify(title, { lower: true, replacement: "-" })}
      aria-labelledby={`${id}-label`}
      aria-describedby={`${id}-subtitle`}
      className={classNames([styles.card])}
      tabIndex={-1}
    >
      <div className={classNames([styles.cardHeader])}>
        <h2 id={`${id}-label`} className={classNames([styles.cardHeaderTitle])}>
          {title}
        </h2>
        <div className={classNames([styles.cardToggleContainer])}>
          {headerComponent}
        </div>
      </div>
      <div id={`${id}-subtitle`} className={classNames([styles.cardSubTitle])}>
        {subTitle}
      </div>
      <div className={classNames([styles.cardBody])}>{children}</div>
    </div>
  );
}
