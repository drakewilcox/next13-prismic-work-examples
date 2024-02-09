"use client";

import styles from "./inPageNav.module.css";

import classNames from "classnames";
import slugify from "slugify";

type Section = {
  first: string;
  second: string;
};

function NavItem({ section }: { section: Section }) {
  return (
    <a
      href={
        "#" +
        slugify(`${section.first} ${section.second}`, {
          lower: true,
          replacement: "-",
        })
      }
      className={styles.sectionItem}
      aria-label={`View ${section.first} ${section.second}`}
    >
      <span aria-hidden={true}>
        <span>{section.first}</span>
        <span className={styles.space}>&nbsp;</span>
        <span>{section.second}</span>
      </span>
    </a>
  );
}

export function InPageNav({ sections }: { sections: Section[] }) {
  return (
    <div className={styles.navContainer}>
      <div id="inPageNav" className={classNames(styles.header)}>
        <div>
          {sections.map((section) => (
            <NavItem key={section.first} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
