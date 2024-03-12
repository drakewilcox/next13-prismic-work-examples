"use client";

import styles from "./card.module.css";
import Link from "next/link";
import classNames from "classnames";
import slugify from "slugify";
import { OSAttribution } from "../conditionTypes";

export function Card({
  title = "Current Conditions",
  id = "current_conditions",
  subTitle = "SubTitle",
  headerComponent = <div></div>,
  children = <div></div>,
  openSnowAttr,
}: {
  title?: string;
  id?: string;
  subTitle?: string;
  headerComponent?: React.ReactNode;
  children?: React.ReactNode;
  openSnowAttr?: OSAttribution;
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

      {openSnowAttr && (
        <div className={classNames([styles.openSnowAtrContainer])}>
          <span>Powered by</span>
          <Link
            className={styles.link}
            href={openSnowAttr.linkUrl}
            target="_blank"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.osImg}
              src={openSnowAttr.imageLightUrl}
              alt=""
            />
          </Link>
        </div>
      )}

      <div className={classNames([styles.cardBody])}>{children}</div>
    </div>
  );
}
