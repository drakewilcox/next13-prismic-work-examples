import { useFormContext, Controller } from "react-hook-form";
import classNames from "classnames";
import { Root, Item, Indicator } from "@radix-ui/react-radio-group";
import { FormField, AriaAttrs } from "../hubspotFormTypes";

import styles from "./radioGroup.module.css";

export function RadioGroup({
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

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Root
              value={field.value}
              className={styles.radioRoot}
              onValueChange={field.onChange}
              name={name}
              {...ariaAttrs}
            >
              {options.map((option) => (
                <div key={option.value} className={styles.optionContainer}>
                  <Item
                    tabIndex={0}
                    id={option.label}
                    value={option.value}
                    checked={option.value === field.value}
                    aria-label={option.label}
                    className={classNames([styles.radioItem])}
                  >
                    <Indicator className={styles.radioIndicator} />
                  </Item>
                  <label
                    className={classNames([styles.label])}
                    htmlFor={option.label}
                    aria-hidden="true"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </Root>
          );
        }}
      />
    </>
  );
}
