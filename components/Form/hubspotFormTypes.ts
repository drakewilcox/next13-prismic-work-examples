export interface FieldOption {
  label: string;
  value: string;
  description: string;
}

export interface FormField {
  name: string;
  label: string;
  required: boolean;
  options: FieldOption[];
  fieldType: string;
  description: string;
  placeholder: string;
}

export interface FieldGroup {
  groupType: string;
  fields: FormField[] | [];
}

export interface FormData {
  id: string;
  name: string;
  fieldGroups: FieldGroup[];
  configuration: {
    recaptchaEnabled: boolean;
  };
}

export type AriaAttrs = {
  "aria-required"?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-errormessage"?: string;
  id?: string;
};
