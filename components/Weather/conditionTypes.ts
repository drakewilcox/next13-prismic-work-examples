// WEATHER ENDPOINT: body.content.weatherZones[0].weatherInfos[0]
export type WeatherInfo = {
  date: string;
  lastModified: string;
  temperatureMin: Measurement;
  temperatureMax: Measurement;
  current: WeatherInfoDetails;
  am: WeatherInfoDetails;
  pm: WeatherInfoDetails;
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

export type WeatherInfoDetails = {
  hour: number;
  lastModified: string;
  skyStatus: Slug;
  temperature: Measurement;
  wind: {
    value: Measurement;
    direction: string;
  };
  snow: SnowMeasurement;
  windchill: Measurement;
};

export type Measurement = {
  value: number;
  unit: "KMH" | "MPH" | "CELSIUS" | "FAHRENHEIT";
  countryValue: number;
  countryUnit?: "KMH" | "MPH" | "CELSIUS" | "FAHRENHEIT";
};

// SNOW ENDNPOINT: body.content.snowZones[0]

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

// POI: body.resorts[0].sectors
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
  | "ROPE_TOW"
  | "MAGIC_CARPET";

export type Lift = {
  name: string;
  liftType: LiftType;
  capacity: {
    value: number;
  };
  openingStatus: string;
  openingTimesTh: OperatingHours[];
  openingTimesReal: OperatingHours[];
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

// POI OVERALL: body.content.overalls[0].liftsOverall
export type LiftsOverall = {
  liftsInPeriode: number;
  lifts: number;
  openLifts: number;
  expectedLifts: number;
  closedLifts: number;
};

// POI OVERALL: body.content.overalls[0].trailsOverall
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

export type Resort = {
  id: string;
  name: string;
  resortInfos: ResortInfo[];
};

export type WebcamUrls = {
  tag: string;
  url: string;
};

export type Webcams = {
  id: string;
  name: any;
  altitude: any;
  latitude: any;
  longitude: any;
  description: string;
  type: string;
  urls: WebcamUrls[];
  lastModified: any;
  main: any;
  enabledOnDevice: boolean;
  order: number;
};

// RESORT OPENING SERVICE: body.content.resorts[0].resortInfos
export type ResortInfo = {
  title: string;
  data: ResortData[];
};

export type ResortData = {
  language: string;
  data: string;
};

// RESORT ACCESS SERVICE: body.content.resorts[].roadConditions
export type RoadCondition = {
  id: string;
  name: string;
  number: string;
  status: boolean;
  surface: string;
};

// Collection of all conditions data
export type AllConditions = {
  currentWeather: WeatherInfo;
  currentSnow: SnowData;
  dailyReport?: ResortInfo;
  roadsData: RoadCondition[];
  liftsOverall: LiftsOverall;
  trailsOverall: TrailsOverall;
  webcams: Webcams[];
};
