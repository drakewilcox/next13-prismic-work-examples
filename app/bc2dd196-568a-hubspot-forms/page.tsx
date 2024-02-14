import { PageWrapper } from "@/components/PageWrapper";
import { FormList } from "@/components/FormList";

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const HUBSPOT_API = "https://api.hubapi.com/marketing/v3/forms/";

export default async function Forms() {
  try {
    if (!HUBSPOT_TOKEN) {
      throw new Error("Hubspot token is missing");
    }

    const formDataResponse = await fetch(`${HUBSPOT_API}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!formDataResponse.ok) {
      throw new Error(`Failed to fetch for data. Reason: ${formDataResponse}`);
    }

    const formList = await formDataResponse.json();

    return (
      <PageWrapper>
        <FormList formList={formList.results} />
      </PageWrapper>
    );
  } catch (error: any) {
    return (
      <PageWrapper>
        <div>No Forms Available</div>
      </PageWrapper>
    );
  }
}
