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
