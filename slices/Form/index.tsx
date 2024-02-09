import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Form`.
 */
export type FormProps = SliceComponentProps<Content.FormSlice>;

/**
 * Component for "Form" Slices.
 */
const Form = ({ slice }: FormProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for form (variation: {slice.variation}) Slices
    </section>
  );
};

export default Form;
