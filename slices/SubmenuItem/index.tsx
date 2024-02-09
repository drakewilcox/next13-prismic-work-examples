import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SubmenuItem`.
 */
export type SubmenuItemProps = SliceComponentProps<Content.SubmenuItemSlice>;

/**
 * Component for "SubmenuItem" Slices.
 */
const SubmenuItem = ({ slice }: SubmenuItemProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for submenu_item (variation: {slice.variation})
      Slices
    </section>
  );
};

export default SubmenuItem;
