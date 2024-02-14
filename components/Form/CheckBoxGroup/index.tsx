import { FormField, AriaAttrs } from "../hubspotFormTypes";
import { useFormContext, Controller } from "react-hook-form";
import classNames from "classnames";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import styles from "./checkboxGroup.module.css";

export function CheckboxGroup({
  fieldData,
  ariaAttrs,
}: {
  fieldData: FormField;
  ariaAttrs: AriaAttrs;
}) {
  const { name, label, options, description } = fieldData;

  const { control } = useFormContext();

  return (
    <>
      <label
        htmlFor={name}
        className={classNames([styles.inputLabel])}
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

      <div className={styles.groupContainer} role="group" {...ariaAttrs}>
        {options.map((option, i) => (
          <Controller
            key={option.value}
            defaultValue=""
            name={name}
            control={control}
            render={({ field }) => (
              <div
                key={option.value}
                className={classNames([styles.optionContainer])}
              >
                <Root
                  id={option.value}
                  tabIndex={0}
                  role="checkbox"
                  className={classNames([styles.checkboxRoot])}
                  checked={field.value.split(";").includes(option.value)}
                  onCheckedChange={(v) => {
                    const isChecked = v;
                    const newValue = isChecked
                      ? field.value + (field.value ? ";" : "") + option.value
                      : field.value
                          .split(";")
                          .filter((val: string) => val !== option.value)
                          .join(";");

                    field.onChange(newValue);
                  }}
                  aria-checked={field.value.split(";").includes(option.value)}
                >
                  <Indicator className={classNames([styles.checkboxIndicator])}>
                    <CheckIcon className={styles.checkIcon} />
                  </Indicator>
                </Root>
                <label
                  htmlFor={option.value}
                  className={classNames([styles.checkboxLabel])}
                >
                  {option.label}
                </label>
              </div>
            )}
          />
        ))}
      </div>
    </>
  );
}
