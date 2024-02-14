import { useFormContext, Controller } from "react-hook-form";
import classNames from "classnames";
import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
} from "@radix-ui/react-select";
import { MinusIcon, PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { FormField, AriaAttrs } from "../hubspotFormTypes";

import styles from "./dropdown.module.css";

export function Dropdown({
  fieldData,

  ariaAttrs,
}: {
  fieldData: FormField;

  ariaAttrs: AriaAttrs;
}) {
  const { name: fieldName, label, options, description } = fieldData;

  const { control } = useFormContext();

  return (
    <>
      <label
        htmlFor={fieldName}
        aria-label={label}
        className={classNames([styles.inputLabel])}
      >
        {label}{" "}
        {!fieldData.required && (
          <span className={styles.optional}>(Optional)</span>
        )}
      </label>
      <div
        id={`${fieldName}-description`}
        className={classNames([styles.description])}
      >
        {description}
      </div>
      <Controller
        control={control}
        name={fieldName}
        defaultValue=""
        aria-label={label}
        render={({ field }) => {
          return (
            <Root onValueChange={field.onChange} {...field} {...ariaAttrs}>
              <Trigger
                className={classNames([styles.selectTrigger])}
                aria-label={label}
              >
                <Value placeholder="Select" />
                <Icon className={styles.selectIcon}>
                  <PlusIcon />
                </Icon>
              </Trigger>

              <Portal>
                <Content className={classNames([styles.selectContent])}>
                  <Viewport className={classNames([styles.selectViewport])}>
                    {options.map((option) => (
                      <Item
                        id={option.value}
                        key={option.value}
                        className={classNames([styles.selectItem])}
                        value={option.value}
                      >
                        <ItemText>{option.label}</ItemText>
                        <ItemIndicator className={styles.selectItemIndicator}>
                          <CheckIcon />
                        </ItemIndicator>
                      </Item>
                    ))}
                  </Viewport>
                </Content>
              </Portal>
            </Root>
          );
        }}
      />
    </>
  );
}
