import { useState } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { FormField, AriaAttrs } from "../hubspotFormTypes";

import styles from "./multiLineInput.module.css";

export function MultiLineInput({
  fieldData,
  ariaAttrs,
}: {
  fieldData: FormField;
  ariaAttrs: AriaAttrs;
}) {
  const { name: fieldName, label, description, placeholder } = fieldData;
  const [isFocused, setIsFocused] = useState(false);
  const { register } = useFormContext();

  const { ref, name, onChange } = register(fieldName);

  return (
    <>
      <label
        htmlFor={fieldName}
        className={classNames([
          styles.inputLabel,
          isFocused ? styles.inputLabelFocused : "",
        ])}
      >
        {label}{" "}
        {!fieldData.required && (
          <span className={styles.optional}>(Optional)</span>
        )}
      </label>
      <div
        id={`${name}-description`}
        className={classNames([styles.description])}
      >
        {description}
      </div>
      <textarea
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        className={classNames([styles.input])}
        name={name}
        placeholder={placeholder}
        ref={ref}
        {...ariaAttrs}
      />
    </>
  );
}
