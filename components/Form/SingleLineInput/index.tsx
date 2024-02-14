import { useState } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { FormField, AriaAttrs } from "../hubspotFormTypes";
import styles from "./singleLineInput.module.css";

export function SingleLineInput({
  fieldData,
  type,
  ariaAttrs,
}: {
  fieldData: FormField;
  type: string;
  ariaAttrs: AriaAttrs;
}) {
  const { register, setValue } = useFormContext();

  const { name: fieldName, label, description, placeholder } = fieldData;
  const [isFocused, setIsFocused] = useState(false);

  const { ref, name, onChange, onBlur } = register(fieldName, {
    setValueAs: (v) => {
      if (type === "number") {
        const pass = v === "" || v === null;
        return pass ? "" : parseInt(v, 10);
      }
      return v;
    },
  });

  // to handle number inputs, without relying on webkit styles to hide spinner
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    const reg = inputValue.replace(/[^0-9]/g, "");
    reg === "" ? setValue(name, null) : setValue(name, parseInt(reg));
    onChange(event);
  };

  return (
    <>
      <label
        htmlFor={name}
        className={classNames([
          styles.inputLabel,
          isFocused ? styles.inputLabelFocused : "",
        ])}
        aria-label={label}
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
      <input
        defaultValue=""
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur(e);
        }}
        onChange={type === "text" ? onChange : handleInputChange}
        className={classNames([styles.input])}
        placeholder={placeholder}
        type="text"
        name={name}
        ref={ref}
        {...ariaAttrs}
      />
    </>
  );
}
