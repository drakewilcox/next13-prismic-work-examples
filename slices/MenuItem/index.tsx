import styles from "./menuItem.module.css";

import Link from "next/link";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicLink } from "@prismicio/react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";

/**
 * Split array into two parts
 * @function
 * @param {array} arr - An array of items.
 * @param {number} min - The minimum items to be split.
 */
const splitArray = (
  arr: Content.MenuItemSliceWithSubmenu[],
  min: number = 5
) => {
  if (arr.length < min) {
    return [[...arr]];
  }
  const split = Math.ceil(arr.length / 2);
  const first = arr.slice(0, split);
  const second = arr.slice(split);
  return [[...first], [...second]];
};

/**
 * Props for `MenuItem`.
 */
export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>;

type ContextProps = {
  mobile?: boolean;
};

type ModifiedMenuItemProps = {
  context: ContextProps;
} & MenuItemProps;

const Default = ({ slice }: ModifiedMenuItemProps): JSX.Element => {
  if (slice.variation !== "default") return <></>;

  const link = slice.primary?.link as any;
  return (
    <NavigationMenu.Item className="NavigationPrimaryItem">
      <PrismicLink
        field={link}
        className={styles.link}
        internalComponent={Link}
      >
        {slice.primary.label}
      </PrismicLink>
    </NavigationMenu.Item>
  );
};

const WithSubmenu = ({ slice }: ModifiedMenuItemProps): JSX.Element => {
  if (slice.variation !== "withSubmenu") return <></>;
  const submenuData = slice.primary?.submenu as any;
  const [submenuLinksFirst, submenuLinksSecond] = splitArray(
    submenuData?.data?.slices ?? []
  );

  return (
    <NavigationMenu.Item className="NavigationPrimaryItem">
      <NavigationMenu.Trigger className="NavigationMenuTrigger">
        {slice.primary.label}{" "}
        <CaretDownIcon className="CaretDown" aria-hidden />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="NavigationMenuContent">
        <div className={styles.submenuDescription}>
          {submenuData.data.description}
        </div>
        {submenuLinksFirst && (
          <ul className="List">
            {submenuLinksFirst?.map((item: any, index: number) => (
              <li key={item.id}>
                <NavigationMenu.Link asChild>
                  <PrismicLink
                    field={item.primary.link}
                    className={styles.link}
                    internalComponent={Link}
                    aria-describedby={
                      item.primary.link?.target === "_blank"
                        ? "new-window-2"
                        : ""
                    }
                  >
                    {item.primary.label}
                  </PrismicLink>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        )}
        {submenuLinksSecond && (
          <ul className="List">
            {submenuLinksSecond?.map((item: any, index: number) => (
              <li key={item.id}>
                <NavigationMenu.Link asChild>
                  <PrismicLink
                    field={item.primary.link}
                    className={styles.link}
                    internalComponent={Link}
                    aria-describedby={
                      item.primary.link?.target === "_blank"
                        ? "new-window-2"
                        : ""
                    }
                  >
                    {item.primary.label}
                  </PrismicLink>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        )}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

const Variants = {
  default: Default,
  withSubmenu: WithSubmenu,
} as any;

/**
 * Component for "MenuItem" Slices.
 */
const MenuItem = ({ slice }: ModifiedMenuItemProps): JSX.Element => {
  const Variation = Variants[slice.variation] ?? Variants["default"];

  return <Variation slice={slice} />;
};

export default MenuItem;
