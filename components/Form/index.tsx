"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { getCookie } from "cookies-next";
// Util
import { buildZodSchema } from "@/utilities/buildZodSchema";
// Components
import { RichTextField } from "@prismicio/client";
import { SingleLineInput } from "./SingleLineInput";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { htmlSerializer } from "@/htmlSerializer";
import { CheckboxGroup } from "./CheckBoxGroup";
import { MultiLineInput } from "./MultiLineInput";
import { RadioGroup } from "./RadioGroup";
import { Dropdown } from "./Dropdown";
import { SuccessModal } from "../SuccessModal";
//types
import { FormField, FormData } from "./hubspotFormTypes";
// Styles
import styles from "./form.module.css";

export function HubSpotForm({
  formData,
  pageTitle,
  formText,
}: {
  formData: FormData;
  pageTitle?: string | undefined;
  formText?: RichTextField;
}) {
  const { id: formId } = formData;
  const [submitButtonText, setSubmitButtonText] = useState<string>("Submit");
  const [showConfirmationText, setShowConfirmationText] =
    useState<boolean>(false);
  const [modalConfirmationText, setModalConfirmationText] =
    useState<string>("");

  const validationSchema = buildZodSchema(
    formData.fieldGroups.flatMap((group) => group.fields.map((field) => field))
  );
  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data: any) => {
    const trackingCookie = getCookie("hubspotutk");

    const fieldsArray = formData.fieldGroups.flatMap((group) =>
      group.fields.map((field) => {
        return {
          objectTypeId: "0-1",
          name: field.name,
          value: data[field.name] || "",
        };
      })
    );

    const formBody = {
      submittedAt: Date.now(),
      fields: fieldsArray,
      context: {
        hutk: trackingCookie,
        pageUri: window.location.href,
        pageName: pageTitle,
      },
    };

    setSubmitButtonText("Submitting");

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: JSON.stringify({
          formBody,
          formId,
        }),
      });
      const json = await res.json();
      if (res.status !== 200 || json.status === "error") {
        return alert(`Submission Failed: ${json.errors?.message}`);
      }
      setSubmitButtonText("Submitted");
      setModalConfirmationText(json.inlineMessage);
      setShowConfirmationText(true);
      reset();
    } catch (error) {
      return alert(`Internal Server: ${error}`);
    }
  };

  const renderField = (fieldData: FormField) => {
    const fieldType = fieldData.fieldType;

    const ariaAttrs = {
      "aria-required": fieldData.required,
      "aria-describedby": `${fieldData.name}-description`,
      "aria-invalid": !!errors[fieldData.name],
      "aria-errormessage": `${fieldData.name}-error`,
      id: fieldData.name,
    };

    if (
      fieldType === "single_line_text" ||
      fieldType === "phone" ||
      fieldType === "email" ||
      fieldType === "number"
    ) {
      const type = fieldType === "number" ? "number" : "text";
      return (
        <SingleLineInput
          fieldData={fieldData}
          type={type}
          ariaAttrs={ariaAttrs}
        />
      );
    }
    if (fieldType === "radio") {
      return <RadioGroup fieldData={fieldData} ariaAttrs={ariaAttrs} />;
    }
    if (fieldType === "dropdown") {
      return <Dropdown fieldData={fieldData} ariaAttrs={ariaAttrs} />;
    }
    if (fieldType === "multi_line_text") {
      return <MultiLineInput fieldData={fieldData} ariaAttrs={ariaAttrs} />;
    }

    if (fieldType === "multiple_checkboxes") {
      return <CheckboxGroup fieldData={fieldData} ariaAttrs={ariaAttrs} />;
    }
  };

  return (
    <>
      {isFilled.richText(formText) && (
        <div className={styles.text}>
          <PrismicRichText field={formText} components={htmlSerializer} />
        </div>
      )}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames([styles.form])}
        >
          {formData.fieldGroups?.map((group) => (
            <div key={group.fields[0].name} className={styles.formRow}>
              {group.fields.map((fieldData) => (
                <div key={fieldData.name} className={styles.fieldContainer}>
                  {renderField(fieldData)}
                  {errors[fieldData.name]?.message && (
                    <div className={styles.errorContainer}>
                      <p
                        id={`${fieldData.name}-error`}
                        className={classNames([styles.error])}
                      >
                        {errors[fieldData.name] &&
                          `*${errors[fieldData.name]?.message}`}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className={styles.submitRowContainer}>
            <button
              type="submit"
              className={classNames("button", styles.button)}
            >
              <span className={classNames(styles.buttonText)}>
                {submitButtonText}
              </span>
            </button>
          </div>
        </form>
      </FormProvider>
      <SuccessModal
        open={showConfirmationText}
        closeModal={() => setShowConfirmationText(false)}
        successMessage={modalConfirmationText}
      />
    </>
  );
}
