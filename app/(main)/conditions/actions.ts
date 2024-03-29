"use server";
import { camelizeKeys } from "@/utilities/camelizeKeys";
import {
  OSForecastResponse,
  OSSnowResponse,
} from "@/components/Weather/conditionTypes";
import osForecastMockData from "@/mockData/osForecastMockData.json";
import osSnowDetailMockData from "@/mockData/osSnowDetailMockData.json";
import snowReportMockData from "@/mockData/snowReportMockData.json";
import poiMockData from "@/mockData/poiMockData.json";
import poiOverallMockData from "@/mockData/poiOverallMockData.json";
import webCamServiceMockData from "@/mockData/webCamServiceMockData.json";
import resortOpeningServiceMockData from "@/mockData/resortOpeningServiceMockData.json";
import resortAccessServiceMockData from "@/mockData/resortAccessServiceMockData.json";

const SECRET_KEY = process.env.LUMIPLAN_SECRET_KEY;
const OPEN_SNOW_API_KEY = process.env.OPEN_SNOW_API_KEY;
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA;

export async function fetchOSForecast(
  units = "imperial"
): Promise<OSForecastResponse> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const responseData =
      units === "imperial"
        ? osForecastMockData.imperial
        : osForecastMockData.metric;
    return camelizeKeys(responseData) as OSForecastResponse;
  } else {
    const endpoint = `https://api.opensnow.com/forecast/detail/powmow?api_key=${OPEN_SNOW_API_KEY}&v=1&units=${units}`;

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        next: {
          revalidate: 60,
        },
      });

      if (res.ok) {
        return camelizeKeys(await res.json()) as OSForecastResponse;
      } else {
        console.error(`Failed to fetch forecast data. Status: ${res.status}`);
        return null as OSForecastResponse;
      }
    } catch (error) {
      console.error("Error while fetching forecast data", error);
      return null as OSForecastResponse;
    }
  }
}

export async function fetchOSSnowDetail(
  units = "imperial"
): Promise<OSSnowResponse> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const responseData =
      units === "imperial"
        ? osSnowDetailMockData.imperial
        : osSnowDetailMockData.metric;
    return camelizeKeys(responseData) as OSSnowResponse;
  } else {
    const endpoint = `https://api.opensnow.com/forecast/snow-detail/powmow?api_key=${OPEN_SNOW_API_KEY}&v=1&units=${units}`;

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        next: {
          revalidate: 60,
        },
      });

      if (res.ok) {
        return camelizeKeys(await res.json()) as OSSnowResponse;
      } else {
        console.error(`Failed to fetch forecast data. Status: ${res.status}`);
        return null as OSSnowResponse;
      }
    } catch (error) {
      console.error("Error while fetching forecast data", error);
      return null as OSSnowResponse;
    }
  }
}

// LUMIPLAN

async function fetchToken() {
  const endpoint =
    "https://mountain.live/auth/realms/lumiserveur/protocol/openid-connect/token";
  const clientId = "powdermountainweb";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${SECRET_KEY}`,
      next: {
        revalidate: 60,
      },
    });

    if (res.ok) {
      return res.json();
    } else {
      console.error(`Failed to fetch token. Status: ${res.status}`);
      return { access_token: "" };
    }
  } catch (error) {
    console.error("Error while fetching token:", error);
    return { access_token: "" };
  }
}

export async function fetchSnowReport() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return camelizeKeys(snowReportMockData);
  } else {
    try {
      const token = await fetchToken();

      const res = await fetch(
        "https://api.mountain.live/mountain_secured/snow/1.0?country=en_US&snowZone=919",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (res.ok) {
        return res.json();
      } else {
        console.error(`Failed to fetch Snow Data. Status: ${res.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error while fetching snow report:", error);
      return null;
    }
  }
}

export async function fetchPOI() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return camelizeKeys(poiMockData);
  } else {
    try {
      const token = await fetchToken();
      const res = await fetch(
        "https://api.mountain.live/mountain_secured/poi/2.0?resort=894",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (res.ok) {
        return res.json();
      } else {
        console.error(`Failed to fetch POI data. Status: ${res.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error while fetching POI Data:", error);
      return null;
    }
  }
}

export async function fetchPOIOverall() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return camelizeKeys(poiOverallMockData);
  } else {
    try {
      const token = await fetchToken();

      const res = await fetch(
        "https://api.mountain.live/mountain_secured/poi-overall/2.0?country=en_US&resort=894",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (res.ok) {
        return res.json();
      } else {
        console.error(
          `Failed to fetch POI Overall Status. Status: ${res.status}`
        );
        return null;
      }
    } catch (error) {
      console.error("Error while fetching POI overall data:", error);
      return null;
    }
  }
}

export async function fetchResortOpeningService() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return camelizeKeys(resortOpeningServiceMockData);
  } else {
    try {
      const token = await fetchToken();

      const res = await fetch(
        "https://api.mountain.live/mountain_secured/resort-opening/1.0?country=en_US&resort=894",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (res.ok) {
        return res.json();
      } else {
        console.error(
          `Failed to fetch Resort Opening Service Data. Status: ${res.status}`
        );
        return null;
      }
    } catch (error) {
      console.error("Error while fetching Resort Opening Service Data:", error);
      return null;
    }
  }
}

export async function fetchResortAccessService() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return camelizeKeys(resortAccessServiceMockData);
  } else {
    try {
      const token = await fetchToken();

      const res = await fetch(
        "https://api.mountain.live/mountain_secured/resort-access/1.0?country=en_US&resort=894",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (res.ok) {
        return res.json();
      } else {
        console.error(
          `Failed to fetch Resort Access Service. Status: ${res.status}`
        );
        return null;
      }
    } catch (error) {
      console.error("Error while fetching Resort Access Service:", error);
      return null;
    }
  }
}

export async function fetchWebcamService() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return camelizeKeys(webCamServiceMockData);
  } else {
    try {
      const token = await fetchToken();

      const res = await fetch(
        "https://api.mountain.live/mountain_secured/resort-webcam/1.0?country=en_US&resort=894",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (res.ok) {
        return res.json();
      } else {
        console.error(`Failed to fetch Webcam Service. Status: ${res.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error while fetching Webcam Service:", error);
      return null;
    }
  }
}

// FOR TESTING NEXT JS CACHING
export async function CurrentTime() {
  try {
    let res = await fetch(
      "http://worldtimeapi.org/api/timezone/America/Los_Angeles",
      {
        next: { revalidate: 5 },
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error while fetching", error);
    return null;
  }
}
