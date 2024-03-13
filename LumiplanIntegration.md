# Lumiplan Integration Documentation

## Overview

The following is a technical overview of the recent integration of data from the Lumiplan/MountainLive API into the Mountain application. This feature takes data from multiple endpoints of the Lumiplan API, and displays them in multiple areas of the platform.

Included in this documentation:

- A brief overview of the MountainLive API. Including the endpoints used, authentication, parameters sent, and response examples.
- Examples of which values from the API responses are being used for display on the platform.
- And a technical overview of the Actions, Components, Types, and Utility methods created for this feature to be used in future development.

## API, Endpoints, Server Actions & Types

### References:

[Swagger Documentation](https://api-portal.mountain.live/catalog/api/165b5b92-bbdb-49d1-9b5b-92bbdb79d1c1) (Requires Login Information)

[Developer Portal](https://api-portal.mountain.live/) (to obtain Client ID and Secret Key)

[Next JS Data Fetching and Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation)

[Next JS Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)

Data fetching for this feature is done through Server Actions in the Next JS application, which can currently be found in the codebase here: `app/conditions/actions.ts`.

Since Lumiplan limits API requests to 1 per minute, each request to the api is set to revalidate every 30 minutes. Since these actions are done on the server, when a user visits a site, the data shown will be accessed from the cache.

### OAuth Token:

Authentication is done through OAuth 2.0. Before each request, a token is either fetched, or retrieved from the cache to authenticate the request. This token expires after 30 minutes.

```tsx
// REQUEST EXAMPLE:
async function fetchToken() {
  const endpoint =
    "https://mountain.live/auth/realms/lumiserveur/protocol/openid-connect/token";
  const clientId = "mountainweb";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${SECRET_KEY}`,
    next: {
      revalidate: 1800,
    },
  });

  return res.json();
}
```

### Weather Data:

Endpoint: [https://api.mountain.live/mountain_secured/weather/2.0](https://api.mountain.live/mountain_secured/weather/2.0)

Params:

- `weatherZone`: This endpoint allows 5 optional params which include country, daysNumber, domain, resort, and weatherZone. When resort is used, the object that is returned also includes a weatherZones array, which includes one weatherZone with `id: 915`. Because of this, the weatherZone param is used to fetch the data.
- `country`: This param is specified for each endpoint. Specifying this param means that whenever we receive measurement data, such as snowFall or temperature, the API will return both a value and a countryValue. For example, this allows us to have measurement values in both inches and centimeters.
- `daysNumber`: For this request, we are specifying 4 days, which means that the response will only include 5 objects in the weatherInfos array. The weatherInfo for the current day, and for the following 4 days, which we are displaying the forecast section of the Conditions page.

```tsx
// EXAMPLE:
export async function fetchWeather() {
  const token = await fetchToken();

  const res = await fetch(
    "https://api.mountain.live/mountain_secured/weather/2.0?country=en_US&daysNumber=4&weatherZone=915",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1800,
      },
    }
  );

  return res.json();
}
```

API JSON Response Example:

```json
// Only Fields in use are shown
{
    ...
    "content": {
        // "domains": [],
        // "resorts": [],
        "weatherZones": [
            {
              ...
              "weatherInfos": [
                {
                  "date": "2023-10-09",
                  "lastModified": "2023-10-09T03:06:00.000-06:00",
                  "temperatureMin": {
                      "value": 7.0,
                      "unit": "CELSIUS",
                      "countryValue": 44.6,
                      "countryUnit": "FAHRENHEIT"
                  },
                  "temperatureMax": {},
                  "current": {
                    "skyStatus": "SUNNY",
                    "temperature": {
                      "value": 11.0,
                      "unit": "CELSIUS",
                      "countryValue": 51.8,
                      "countryUnit": "FAHRENHEIT"
                    },
                    "wind": {
                      "value": {
                          "value": 17.0,
                          "unit": "KMH",
                          "countryValue": 10.56,
                          "countryUnit": "MPH"
                        },
                      "direction": "SOUTH"
                    },
                    "snow": {}
                  },
                  "am": {},
                  "pm": {},
                }
              ]
            }
        ]
    }
}
```

*\*\* NOTE: *the data for “snow” is not currently being sent, but must be manually entered by the client so that the daily snow forecast will be shown at the bottom of each day in the forecast card component.\*

Types and Data Used in NextJS Application:

```tsx
// This is passed to the CurrentConditions Component:
const currentWeather: WeatherInfo =
  responseBody.content.weatherZones[0].weatherInfos[0];

export type WeatherInfo = {
  date: string; // Day of Request
  lastModified: string; // Displayed in Card Subheader
  temperatureMin: Measurement; // Low
  temperatureMax: Measurement; // High
  current: WeatherInfoDetails; // only present in first object
  am: WeatherInfoDetails; // used for forecast data of all future days
  pm: WeatherInfoDetails;
};

export type WeatherInfoDetails = {
  hour: number;
  lastModified: string;
  skyStatus: Slug; // Formatted to display custom text and Icon
  temperature: Measurement;
  wind: {
    value: Measurement;
    direction: string; // Formatted to be "S", or "NE" etc.
  };
  snow: SnowMeasurement;
  windchill: Measurement; // not currently in use
};

export type Measurement = {
  value: number;
  unit: "KMH" | "MPH" | "CELSIUS" | "FAHRENHEIT";
  countryValue: number;
  countryUnit?: "KMH" | "MPH" | "CELSIUS" | "FAHRENHEIT";
};

export type Slug =
  | "SNOW"
  | "CLOUDY"
  | "CLOUDY_LIGHT_RAIN"
  | "CLOUDY_LIGHT_SNOWFALL"
  | "CLOUDY_MODERATE_HEAVY_RAIN"
  | "CLOUDY_MODERATE_HEAVY_SNOWFALL"
  | "FAIR_WEATHER_PARTLY_CLOUDY"
  | "FOG"
  | "MOSTLY_CLOUDY_LIGHT_RAIN"
  | "MOSTLY_CLOUDY_SOME_SUN"
  | "MOSTLY_SUNNY"
  | "SUNNY"
  | "THUNDERSTORMS"
  | "VARIABLE_SKY_LIGHT_SNOWFALL"
  | "VARIABLE_SKY_SCATTERED_THUNDERSTORMS";
```

### Snow Data:

Endpoint: `https://api.mountain.live/mountain_secured/snow/1.0?country=en_US&snowZone=919`

Server Action: `fetchSnowReport()`

JSON Response Example:

```json
// Only Fields in Use are shown.
{
  ...
  "content": {
    "snowZones": [
      {
        ...
        "snowTotalDepth": {
          "value": 0.0,
          "unit": "CENTIMETER",
          "countryValue": 0.0,
          "countryUnit": "INCH"
        },
        // Same Keys used for each snowFallDepth
        "freshSnowFallDepth12H": {
        ...
        },
        "freshSnowFallDepth24H": {
        ...
        },
        "freshSnowFallDepth48H": {
        ...
        },
        "freshSnowFallDepth72H": {
        ...
        },
        "freshSnowFallDepth7D": {
        ...
        },
        "snowFallDepthCompleteSeason": null,
        "lastSnowFallDepth": {
        ...
        },
        "lastModified": "2023-09-25T14:49:00.000-06:00"
      }
    ]
  }
}
```

Types:

```tsx
const currentSnow: SnowData = snow.content.snowZones[0];
// Passed to Banner, Current Conditions, and SnowReport Components.

export type SnowData = {
  snowTotalDepth: SnowMeasurement;
  freshSnowFallDepth12H: SnowMeasurement;
  freshSnowFallDepth24H: SnowMeasurement;
  freshSnowFallDepth48H: SnowMeasurement;
  freshSnowFallDepth72H: SnowMeasurement;
  freshSnowFallDepth7D: SnowMeasurement;
  snowFallDepthCompleteSeason: SnowMeasurement;
  lastModified: string;
};

export type SnowMeasurement = {
  value: number;
  unit: "CENTIMETER | METER";
  countryValue: number;
  countryUnit?: "FOOT | INCH";
};
```

### Lift & Trail Data (POI):

Endpoint: `https://api.mountain.live/mountain_secured/poi/2.0?country=en_US&resort=894`

Server Action: `fetchPOI()`

JSON Response Example:

```json
// Only Fields in Use are shown
{
  ...
  "content": {
    "resorts": [
      {
        ...
        "sectors": [
          {
            "lifts": [
						{
              ...
              "name": "Hidden Lake Express",
              "openingStatus": "CLOSED",
              "openingTimesTh": [
                  {
                    "beginTime": "09:00",
                    "endTime": "16:00"
                  }
              ],
              "liftType": "DETACHABLE_CHAIRLIFT",
		          ...
              "capacity": {
                "value": 4.0,
                 ...
              },
              ...
	          }
		      ],
					"trails": [
            {
		          ...
	            "name": "Burntwood - Lower",
	            "openingStatus": "CLOSED",
	            "trailLevel": "GREEN_CIRCLE",
	            ...
            },
					...
          }
				]
      }
    ]
  }
  ...
}

```

Types:

```tsx
const sectorsData: Sector[] = poiData.content.resorts[0].sectors;

export type Sector = {
  id: string;
  name: string;
  lifts?: Lift[];
  trails: Trail[];
};

export type LiftType =
  | "CHAIRLIFT"
  | "DETACHABLE_CHAIRLIFT"
  | "SURFACE_LIFT"
  | "ROPE_TOW";

export type Lift = {
  name: string;
  liftType: LiftType; // Lift Type + Capacity used to determine Icon/Text
  capacity: {
    value: number;
  };
  openingStatus: string;
  openingTimesTh: OperatingHours[];
};

export type OperatingHours = {
  beginTime: number;
  endTime: number;
};

export type Trail = {
  name: string;
  trailType: string;
  trailLevel: string;
  operating: boolean;
  openingStatus: string;
};
```

### POI OVERALL

Endpoint: `https://api.mountain.live/mountain_secured/poi-overall/2.0?country=en_US&resort=894`

Server Action: `fetchPOIOverall()`

This endpoint is used for the stats displayed in the banner and in the Lift & Terrain section.

JSON Response Example:

```json
// All of the following fields are being used.
{
 ...
  "content": {
    "overalls": [
      {
       ...
        "liftsOverall": {
          "liftsInPeriode": 9,
          "lifts": 9,
          "expectedLifts": 0,
          "openLifts": 0,
          "closedLifts": 9,
        },
      }
    ]
  }
}
...
```

Types:

```tsx
const liftsOverall: LiftsOverall = poiOverall.content.overalls[0].liftsOverall;

const trailsOverall: TrailsOverall =
  poiOverall.content.overalls[0].trailsOverall;

export type LiftsOverall = {
  liftsInPeriode: number;
  lifts: number;
  openLifts: number;
  expectedLifts: number;
  closedLifts: number;
};

export type TrailsOverall = {
  openTrails: number;
  trailsInPeriode: number;
  totalTrails: number;
  closedTrails: number;
  openTrailsTotalSurface: OpenTrailsMeasurement;
  openTrailsSurfaceRatio: OpenTrailsMeasurement;
};

export type OpenTrailsMeasurement = {
  value: number | string;
  countryValue: number | string;
};
```

### Resort Data (Resort Opening Service):

Endpoint: `https://api.mountain.live/mountain_secured/resort-opening/1.0?country=en_US&resort=894`

Server Action: `fetchResortOpeningService()`

JSON Response Example:

```json
...
"content": {
  "resorts": [
    {
		  "resortInfos": [
		    {
		      ...
		      "title": "Daily Report",
		      "data": [
		        {
		          "language": "en_US",
		          "data": "<p>The ... </p>"
		        }
		      ]
		    },
		    {
		      ...
		      "title": "Hours of Operation",
		      "data": [
		          {
		            "language": "en_US",
		            "data": "<p>8am - 5pm</p>"
		          }
		      ]
		      }
		    ]
		  }
		]
	}
```

Types:

```tsx
// Passed to the Current Conditions Card
const dailyReport: ResortInfo | undefined = resortData.find(
  (item: ResortInfo) => item.title === "Daily Report"
);
const hoursOfOperation: ResortInfo | undefined = resortData.find(
  (item: ResortInfo) => item.title === "Hours of Operation"
);

export type ResortInfo = {
  title: string; // Title is used to determine the type of report.
  data: ResortData[];
};

export type ResortData = {
  language: string;
  data: string; // HTML String that is parsed and displayed
};
```

### Road Data (Resort Access Service):

Endpoint: `https://api.mountain.live/mountain_secured/resort-access/1.0?country=en_US&resort=894`

Server Action: `fetchResortAccessService()`

The data in this response is used to display the Road Conditions in the Current Conditions Card.

JSON Response Example:

```json
// Only fields in use are shown
{
  ...
  "content": {
    "resorts": [
      {
        "roadConditions": [
          {

            "name": "Mountain Road",
            "number": "158",

            "surface": "CLEAR_DRY",
          }
        ],
	      ... // Currently 2 Roads are returned in this array
      },
    ]
  }
}
```

Types:

```tsx
const roadsData: RoadCondition[] = roads.content.resorts[0].roadConditions;

export type RoadCondition = {
  id: string;
  name: string;
  number: string;
  status: boolean;
  surface: string;
};
```

## Technical Notes and Utility Methods:

Unit System:

- Through the useStore hook, a value for `unitSystem` is stored. In any of the cards on the conditions page, when the user switches the measurement value, all of the measurement values on the site will change to either US values, or International values.
- When the value for unitSystem is “US”, the `countryValue` for a measurement is used, when the unitSystem is “SI”, the default `value` is used.

sectorOpeningStatus():

Custom Utility used to determine if a sector is open based on the status of the trails.

If all trails are open, it will display OPEN, if none, CLOSED, and if only some, PARTIAL.

```tsx
export const sectorOpeningStatus = (trails: Trail[]): string => {
  const allOperating = trails.every((trail) => trail.openingStatus === "OPEN");
  const allClosed = trails.every((trail) => trail.openingStatus === "CLOSED");

  if (allOperating) {
    return "OPEN";
  } else if (allClosed) {
    return "CLOSED";
  } else {
    return "PARTIAL";
  }
};
```

findLiftData():

`utilities/findLiftData.tsx`

This is a custom utility method used to determine the type of lift, and Icon based on the `liftType`, and the `capacity` values of a specific lift.

```tsx
const liftData: Record<
  LiftType,
  Record<number, { name: string; icon: JSX.Element }>
> = {
  CHAIRLIFT: {
    4: { name: "Fixed Grip Quad", icon: <Quad /> },
    3: { name: "Fixed Grip Triple", icon: <Triple /> },
  },
  DETACHABLE_CHAIRLIFT: {
    4: { name: "High Speed Quad", icon: <Quad /> },
  },
  SURFACE_LIFT: {
    1: { name: "J-Bar", icon: <SurfaceTow /> },
  },
  ROPE_TOW: {
    1: { name: "Rope Tow", icon: <SurfaceTow /> },
  },
};

export const findLiftData = (liftType: LiftType, capacity: number) => {
  return liftData[liftType]?.[capacity] || { name: "", icon: <></> };
};
```

findWeatherData():

`utilities/findWeatherData.tsx`

A custom utility used to determine the Icon, and Condition displayed in the cards for Current Conditions, Weather Forecast, as well as the banner and Nav Fly-out.

*\*\* *The text values in this method may need to be updated depending on what is wanted for the text shown in the Conditions or Forecast Stats\*

These are the values currently being used:

```tsx
export const findWeatherData = (slug: Slug | string) => {
  const weatherIcons: WeatherValues = {
    SNOW: {
      text: "Snow",
      icon: <Snow />,
    },
    CLOUDY: {
      text: "Cloudy",
      icon: <Cloudy />,
    },
    CLOUDY_LIGHT_RAIN: {
      text: "Light Rain",
      icon: <CloudyLightRain />,
    },
    CLOUDY_LIGHT_SNOWFALL: {
      text: "Light Snowfall",
      icon: <CloudyLightSnowfall />,
    },
    CLOUDY_MODERATE_HEAVY_RAIN: {
      text: "Heavy Rain",
      icon: <CloudyModerateHeavyRain />,
    },
    CLOUDY_MODERATE_HEAVY_SNOWFALL: {
      text: "Heavy Snowfall",
      icon: <CloudyModerateHeavySnowfall />,
    },

    FAIR_WEATHER_PARTLY_CLOUDY: {
      text: "Partly Cloudy",
      icon: <FairWeatherPartlyCloudy />,
    },
    FOG: {
      text: "Foggy",
      icon: <Fog />,
    },
    MOSTLY_CLOUDY_LIGHT_RAIN: {
      text: "Light Rain",
      icon: <MostlyCloudyLightRain />,
    },
    MOSTLY_CLOUDY_SOME_SUN: {
      text: "Mostly Cloudy",
      icon: <MostlyCloudySomeSun />,
    },
    MOSTLY_SUNNY: {
      text: "Mostly Sunny",
      icon: <MostlySunny />,
    },
    SUNNY: {
      text: "Sunny",
      icon: <Sunny />,
    },
    THUNDERSTORMS: {
      text: "Thunderstorms",
      icon: <Thunderstorms />,
    },
    VARIABLE_SKY_LIGHT_SNOWFALL: {
      text: "Light Snowfall",
      icon: <VariableSkyLightSnowfall />,
    },
    VARIABLE_SKY_SCATTERED_THUNDERSTORMS: {
      text: "Scattered Thunderstorms",
      icon: <VariableSkyScatteredThunderstorms />,
    },
  };

  return weatherIcons[slug] || { text: "", icon: <div></div> };
};
```

## Final Notes & Current Missing Data:

- Details:
  - In the designs for the Current Conditions Card, there was a details section. This data is not currently getting sent from the API. Once we determine where we want this data sent, this field can be updated.
  - One option, would be sent similarly to Daily Report and Hours of Operation, from the Resort Opening Service endpoint.
- Daily Snow:
  - This is a manual field that Lumiplan added for us to the Weather Endpoint.
  - For each day, snow data will be returned similarly to wind, and temp.
  - Example:
  ```tsx
  const morningSnowFormatted =
    unitSystem === "SI"
      ? `${Math.ceil(info.am.snow?.value || 0)} cm (AM)`
      : `${Math.ceil(info.am.snow?.countryValue || 0)} in (AM)`;
  ```
  - _However, we are not currently receiving data for this value, so it will display as 0 for each day until that value is manually entered._
- Sector Hours of Operation:
  - In the Lift & Terrain Status card, the hours of each lift are displayed by looking at the `openingTimesTh` for the first lift in the `lifts` array
  - However, for the second part of this grid, all 9 of the sectors are Adventure Terrains with no lifts. So because sectors do not have openingTimes, we are not currently displaying the operating hours for Adventure Terrain
  - One option, is that we could display the operating hours for the resort if the value returned by the sectorOpeningStatus method is OPEN or PARTIAL
