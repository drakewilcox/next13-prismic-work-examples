import styles from "./form.module.css";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import classNames from "classnames";

import { FormData } from "@/components/Form/hubspotFormTypes";
import { HubSpotForm } from "@/components/Form";
import { fetchFormData } from "@/app/actions";

export type FormProps = SliceComponentProps<Content.FormSlice>;
type ContextProps = {
  formData: FormData;
  pageTitle: string | undefined;
};

type ModifiedFormProps = {
  context: ContextProps;
  metadata: any;
} & FormProps;

const Form = async ({
  slice,
  context,
}: ModifiedFormProps): Promise<JSX.Element> => {
  const { pageTitle } = context;

  const formId = slice.primary?.hubspot_form_id;
  const formData = formId ? await fetchFormData(formId) : null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={classNames(["grid", styles.form])}
    >
      {formData && (
        <div className="content">
          <div className={styles.formWrap}>
            <HubSpotForm
              formData={formData}
              pageTitle={pageTitle}
              formText={slice.primary.text}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Form;
