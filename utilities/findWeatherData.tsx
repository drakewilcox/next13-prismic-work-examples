import {
  Cloudy,
  CloudyLightRain,
  CloudyLightSnowfall,
  CloudyModerateHeavyRain,
  CloudyModerateHeavySnowfall,
  FairWeatherPartlyCloudy,
  Fog,
  MostlyCloudyLightRain,
  MostlyCloudySomeSun,
  MostlySunny,
  Snow,
  Sunny,
  Thunderstorms,
  VariableSkyLightSnowfall,
  VariableSkyScatteredThunderstorms,
} from "@/components/Icons";

import { Slug } from "@/components/Weather/conditionTypes";

type WeatherValues = {
  [key: string]: {
    text: string;
    icon: JSX.Element;
  };
};

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
