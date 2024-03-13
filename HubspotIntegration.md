## Hubspot Integration

### Overview

Integration with the HubSpot forms api has been added as a feature to the Mountain site. Admin users can now create a Form Slice through the CMS, with a form_id that corresponds with a form on Hubspot, which will then generate custom UI based on data sent from the HubSpot API. These Forms can then be submitted through the Mountain UI, to the HubSpot Forms API.

This section includes a summary of how to create forms on HubSpot, and how to integrate them with the Mountain Site.

### **Reference Docs**

- Hubspot Developer V3 Documentation: https://developers.hubspot.com/docs/api/overview
- Hubspot V3 Form Api Overview & Endpoints: https://developers.hubspot.com/docs/api/marketing/forms
- Hubspot V2 Forms Api Overview (Legacy): https://legacydocs.hubspot.com/docs/methods/forms/forms_overview

### **Setup:**

Api-Key Set Up:

- When this feature is integrated into the Mountain site, if not already present, a private app will need to be created in order retrieve the Api Key. This key will then be set as the value for `HUBSPOT_TOKEN` in Vercel, which will be used to store and manage the secret keys used to access the Form API.

PortalID:

- The Portal ID is what is used in the endpoint for Form submission. This will also be a key stored in Vercel, as the `HUBSPOT_PORTAL_ID`
- The Portal ID can be found in the profile dropdown on the far right of the header on Hubspot.
- Or another way to find it is through an API call in Postman.
  - GET Request: `https://api.hubapi.com//integrations/v1/me`
  - Authorization: `Bearer {HUBSPOT_TOKEN}`

### **Form Creation On HubSpot:**

- On Hubspot, viewing all available forms, or creating a form can be done at: `app.hubspot.com/forms/{HUBSPOT_PORTAL_ID}`
- The fields chosen for the form can be existing properties, or custom properties, **however *only the following Field Types are supported in this integration:***
  - single_line_text
  - phone
  - email
  - number
  - multi_line_text
  - radio
  - dropdown
  - multiple_checkboxes
- Contact Properties:
  - **Required**: If a field is marked as required, on the Mountain app side, the field will be checked and validated before form submission is allowed.
  - **Label**: This is the text that will display above the field
  - **Help Text**: Also called “description” in the data sent from the api, this will display under the label when present
  - Placeholder text
- Publishing and Retrieving Form ID:
  - When a form is completed, and published, the Form Id can be found in the Embed Code, by looking at the “formId” field.
- ReCAPTCHA:
  - Hubspot forms have the option to enable ReCaptcha on all forms. However (from the hubspot docs): *"If CAPTCHA has been enabled on the form, form submissions from the [Submit data for a form API](https://legacydocs.hubspot.com/docs/methods/forms/submit_form) or other form integrations will not be accepted."*

### **Adding a New form through the CMS**

- A new slice for “Form” has been added to the Prismic CMS.
- Each form slice takes the following props: “Form ID” & “Text”
- The Form ID will render the corresponding HubSpot form, and the Text is RichText that will display above the form, such as a Title and other information.

### **Finding the Form ID:**

- **Since the process of finding the form id is a bit cumbersome on Hubspot, a simpler method was developed for this feature:**
  - Navigating to the `/bc2dd196-568a-hubspot-forms` route of the Mountain site, will display a list of all forms associated with the API key set in Vercel.
  - This page will display the Form Title, followed by the id, which can be used in the the CMS to create a new form component.
- In HubSpot, the form ID for a form can be found in the Embed Code for a form, which can be done in the HubSpot app by:
  - Navigating to Forms from page header (Marketing > Forms)
  - Clicking on a specific form to view details
  - Click on Edit Form on the top right of page
  - Click on Embed on the top right of the edit page
  - In the modal, viewing the embed code, the formId can be found in the value of “formId”

## **Developer Documentation, HubSpot Endpoints, and Integration:**

### **Environment Variables:**

The following keys will need to be added to either the .env.local file, or to vercel before this feature is merged to production. The Keys currently in place on vercel were only intended for development.

```jsx
HUBSPOT_TOKEN = { hubspot_api_token };
HUBSPOT_PORTAL_ID = { hubspot_portal_id };
```

### **Tech Stack for Feature:**

- react-hook-form: used for form control, submission, and catching validation errors from zod
- zod: used to build validation schema
- @hookform/resolvers: used to pass the zod validation schema as the resolver to react-hook-form.
- raidux-ui: used for checkbox, dropdown, alert-dialog (success modal), icons, and radio buttons

### **Type Declarations:**

`components/Form/hubspotFormTypes.ts`

### Form Details (GET):

Retrieving the initial form data currently happens through a Server Action `fetchFormData` called in the server side form slice.

Request Example:

```jsx

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const HUBSPOT_API = "https://api.hubapi.com/marketing/v3/forms/";

export async function fetchFormData(formId: string) {
  try {
    const formDataResponse = await fetch(`${HUBSPOT_API}${formId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!formDataResponse.ok) {
      return null;
    }

    const formData = await formDataResponse.json();

    return { ...formData };
  } catch (e) {
    return null;
  }
}
```

Response BODY Example:

```json
{
    "id": "a63516fe-cf19-4b4d-8c58-af40839268dc",
    ...
    "fieldGroups": [
        {
            "groupType": "default_group",
            "richTextType": "text",
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "company",
                    "label": "Company name",
                    "required": true,
                    "hidden": false,
                    "fieldType": "single_line_text"
                }
            ]
        },
        {
            "groupType": "default_group",
            "richTextType": "text",
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "email",
                    "label": "Email",
                    "required": true,
                    "hidden": false,
                    "fieldType": "email",
                    "validation": {
                        "blockedEmailDomains": [],
                        "useDefaultBlockList": false}
                }
            ]
        },
        {
            "groupType": "default_group",
            "richTextType": "text",
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "fleet_size",
                    "label": "Fleet size",
                    "required": false,
                    "hidden": false,
                    "options": [
                        {
                            "label": "1-50",
                            "value": "1-50",
                            "description": "",
                            "displayOrder": 0
                        },
                        {
                            "label": "51-300",
                            "value": "51-300",
                            "description": "",
                            "displayOrder": 1
                        },
                        {
                            "label": "1001-5000",
                            "value": "1001-5000",
                            "description": "",
                            "displayOrder": 2
                        },
                        {
                            "label": "5001+",
                            "value": "5001+",
                            "description": "",
                            "displayOrder": 3
                        }
                    ],
                    "fieldType": "dropdown"
                },
                {
                    "objectTypeId": "0-1",
                    "name": "load_type",
                    "label": "Load type",
                    "required": false,
                    "hidden": false,
                    "options": [
                        {
                            "label": "Dry Van",
                            "value": "Dry Van",
                            "description": "",
                            "displayOrder": 0
                        },
                        {
                            "label": "Refrigerated",
                            "value": "Refrigerated",
                            "description": "",
                            "displayOrder": 1
                        },
                        {
                            "label": "Flatbed",
                            "value": "Flatbed",
                            "description": "",
                            "displayOrder": 2
                        },
                        {
                            "label": "Intermodal",
                            "value": "Intermodal",
                            "description": "",
                            "displayOrder": 3
                        },
                        {
                            "label": "Other",
                            "value": "Other",
                            "description": "",
                            "displayOrder": 4
                        }
                    ],
                    "fieldType": "dropdown"
                }
            ]
        },
      ...
    ],
    ...
}

```

Response Data Explained:

- **ID**: this field is also used to in the POST request when submitting the form.
- **fieldGroups**: A field group represents a row on the form. For example, when two fields are on the same line in a form when created, they will be contained within the same fieldGroup.
- **fields**: A value contained within fieldGroup, each object in the fields array represents a field in the form. This is the data we use to create each input.
  - The only data used in each **field object** for this integration are:
    - name
    - label
    - description: *if description is present, this will display under the label of the field*
    - fieldType: \***\*how we determine which type of input component to display\*\***
    - required: *if field is required, this will update the zod validation schema. And when onSubmit, an error message will display under the input, and submission will be blocked.*
    - options (label and value)
    - placeholder: If present, this will be displayed in the input before the user enters their data.

### **Slice:**

`slices/Form/index.tsx`

### **Form Components:**

- `/components/Form/index.tsx`
  - This is the parent component for a form, which will receive the formData, render the fields, and handle form submission and validation.
  - This component maps through the formData, and formGroups, to render each form field.
  ```tsx
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
        <button type="submit" className={classNames("button", styles.button)}>
          <span className={classNames(styles.buttonText)}>Submit</span>
        </button>
      </div>
    </form>
  </FormProvider>
  ```
  - Each “group” represents a row, for same-line fields, which on mobile views will break into one line.
  - And each “fieldData” represents a field, where the renderField() method will determine with type of component is rendered based on the fieldType.
- Field Input Components:
  - `components/SingleLineInput`:
    - for fields with the types “single_line_text”, “phone”, “email” or “number” … this component will render
    - If the field_type is “number”, the number type will be rendered, and the field input will only accept numbers.
  - `components/MultiLineInput:`
    - for fields with the type “multi_line_text”
    - can be expanded vertically only.
  - `components/RadioGroup`: “radio”
    - Only accepts one value at a time
  - `components/Dropdown:`
    - for field type: “dropdown”
  - `components/Checkbox`:
    - for field type: “multiple_checkboxes”
    - While this component accepts multiple values, and typically would store values in an array or object, the values in this component are formatted to a string of selected options, separated by a semi-colon, for configuration with the hubspot api. Example: `“value1;value2;value3”`
- `components/SubmitButton`

### **Form Validation:**

- All fields are validated through Zod validation, which is passed as the resolver to the useForm method provided by react-hook-form.
- The validationSchema is built dynamically, through a utility method: `utilities/buildZodSchema.ts`
  - In this method, different zod schemas are built for the fieldTypes of four different categories: string, number, email, and phone.
  - within each category, if the field is required, validation logic for that field is also added to the schema.
  - For example, if a phone number is not required, but the user does input a partial input, the zod validation will still alert the user if the input is valid or not, but if the input is empty, no error will display.

### **onSubmit & POST request to HubSpot:**

Once a form is successfully validated, the form data is formatted, and sent to HubSpot through an API handler in the application ⇒ `app/api/form/route.ts`

Endpoint and Request Example:

```jsx
const url = https://api.hsforms.com/submissions/v3/integration/secure/submit/{portal_id}/{form_id}const data = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${HUBSPOT_TOKEN}`,
  },
  body: JSON.stringify({
    submittedAt: Date.now(),
    fields: [
      {
        objectTypeId: "0-1",
        name: "email",
        value: "draketesting@example.com",
      },
      {
        objectTypeId: "0-1",
        name: "upload_your_pdf_resume",
        value:
          "https://www.exampleurl.com",
      },
    ],
    context: {
      hutk: trackingCookie,
      pageUri: window.location.href,
      pageName: "Example page",
    },
  }),
});

```

HubSpot Documentation: [Here](https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication#:~:text=As%20this%20API%20is%20authenticated%2C)

### Considerations

- If ReCaptcha is turned on for a form on hubspot, the API will return with an error.
- for fields with a multiple_checkboxes type, only a string of values separated by a semicolon is accepted. Example: “value1;value2;value3”
- For number fields, even if not required, a null value causes a non-descriptive error, and only accepts either a number or an empty string.
- Viewing Submission: After a form is submitted, submission can be viewed in the submissions tab of the Form Detail page on HubSpot.

## **Considerations and Future Iterations**

- Validation Data:
  - Some fields in HubSpot, such as the phone field, have a validation object sent from the initial GET request. Example:
  ```json
  "validation": {
  	"minAllowedDigits": 7,
    "maxAllowedDigits": 20
   }
  ```
  - While the free version of HubSpot does not provide customization of this data, the pro version might. Currently, we are not using this validation object to configure any validation schemas in zod, but are instead adding specific rules to certain field types, such as phone, and email.
- ReCaptcha:
  - Since HubSpot does not allow for submission of form data through the API if reCaptcha is enabled, we would handle implementing reCaptcha on the Mountain side in order for it to be implemented. This also means that no forms with reCaptcha enabled on HubSpot can be used in this integration.
