# 🏔️ Mountain

This is a [Next.js](https://nextjs.org/) project that uses [Vercel](https://vercel.com/) to build, deploy and host the website and [Prismic](https://prismic.io/) to manage content.

<details>
  <summary>Lumiplan Integration</summary>

All [Conditions](https://localhost:3001/conditions) data, including data used in the menu, is fetched from [Lumiplan](https://www.lumiplan-north-america.com/).

For detailed information please review the [technical documentation](LumiplanIntegration.md) for our integration.

</details>

<details>
  <summary>HubSpot Integration</summary>

The Form Slice in Prismic uses HubSpot API data fetch forms using their HubSpot ID. To find all available HubSpot forms please refer to [HubSpot Forms](https://localhost:3001/bc2dd196-568a-hubspot-forms). There you will be able to copy the desired form ID and paste it into Prismic.

For detailed information please review the [technical documentation](HubspotIntegration.md) for our integration.

</details>

<details>
  <summary>Season Routing</summary>

Some pages in our website automatically route from the root page to the seasons specific page. This is done within `/middleware.ts`. The current season is a value defined in Prismic using the Season Custom Type.

Pages with season routing:

</details>
