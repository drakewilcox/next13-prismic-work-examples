import { z, ZodType, ZodString } from "zod";

interface FormField {
  name: string;
  label: string;
  required: boolean;
  fieldType: string;
}

export function buildZodSchema(fields: FormField[]) {
  const schemaFields: Record<string, ZodType<any>> = {};
  const stringTypes = [
    "single_line_text",
    "multi_line_text",
    "radio",
    "dropdown",
    "multiple_checkboxes",
    "file",
  ];

  fields.forEach((field) => {
    let fieldSchema: ZodType<any> = z.unknown();
    const fieldType = field.fieldType;

    if (stringTypes.includes(fieldType)) {
      fieldSchema = buildStringSchema(field);
    }
    if (field.fieldType === "number") {
      fieldSchema = buildNumberSchema(field);
    }
    if (field.fieldType === "phone") {
      fieldSchema = buildPhoneSchema(field);
    }
    if (field.fieldType === "email") {
      fieldSchema = buildEmailSchema(field);
    }

    schemaFields[field.name] = fieldSchema;
  });

  return z.object(schemaFields);
}

function buildStringSchema(field: FormField) {
  let fieldSchema = z.string();

  if (field.required) {
    fieldSchema = fieldSchema.min(1, `${field.label} is required`);
  }

  return fieldSchema;
}

function buildNumberSchema(field: FormField) {
  let fieldSchema: ZodType<number | string> = z.number().or(z.literal(""));

  if (field.required) {
    fieldSchema = fieldSchema.refine(
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        typeof value === "number",
      {
        message: `${field.label} is required`,
      }
    );
  }
  return fieldSchema;
}

function buildPhoneSchema(field: FormField) {
  let fieldSchema: ZodType<string | undefined> = z
    .string()
    .regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
      message: "Valid Phone Number is required.",
    });

  if (!field.required && fieldSchema instanceof ZodString) {
    fieldSchema = fieldSchema.optional();
  }

  return fieldSchema;
}

function buildEmailSchema(field: FormField) {
  let fieldSchema: ZodType<string | undefined> = z
    .string()
    .email({ message: "Valid Email is Required" });

  if (!field.required) {
    fieldSchema = fieldSchema.optional();
  }

  return fieldSchema;
}
