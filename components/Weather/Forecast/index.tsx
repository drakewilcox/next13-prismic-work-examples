"use client";
// Packages
import classNames from "classnames";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
import { formatDate } from "@/utilities/formatDate";
import { findWeatherData } from "@/utilities/findWeatherData";
// Types
import {
  WeatherInfo,
  SnowData,
  Measurement,
  WeatherInfoDetails,
} from "@/components/Weather/conditionTypes";
// Components
import { Card } from "../Card";
import { UnitToggle } from "../UnitToggle";
// Styles
import sharedStyles from "../sharedWeatherStyles.module.css";

export function Forecast({ forecast }: { forecast: WeatherInfo[] }) {
  const lastModified = forecast[0].lastModified;
  const formattedDate = formatDate(lastModified);
  const [unitSystem] = useStore((state: any) => [state.unitSystem]);

  const formatTemp = (temp: Measurement) => {
    const { value, countryValue } = temp;
    return unitSystem === "SI"
      ? `${Math.ceil(value)}\u00B0`
      : `${Math.ceil(countryValue)}\u00B0F`;
  };

  const convertDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const formatValues = (info: WeatherInfo) => {
    const details: WeatherInfoDetails = info.current || info.am;
    const infoDate = new Date(info.date);
    const currentDate = new Date();
    const isToday = convertDate(infoDate) === convertDate(currentDate);
    const weekDay = isToday
      ? "Today"
      : infoDate.toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC",
        });
    const morningSnowFormatted =
      unitSystem === "SI"
        ? `${Math.ceil(info?.am?.snow?.value || 0)} cm (AM)`
        : `${Math.ceil(info?.am?.snow?.countryValue || 0)} in (AM)`;
    const eveningSnowFormatted =
      unitSystem === "SI"
        ? `${Math.ceil(info?.pm?.snow?.value || 0)} cm (AM)`
        : `${Math.ceil(info?.pm?.snow?.countryValue || 0)} in (AM)`;

    return {
      title: weekDay,
      temp: `H: ${formatTemp(info?.temperatureMax)} / L: ${formatTemp(
        info?.temperatureMin
      )}`,
      snowfall: `${morningSnowFormatted} / ${eveningSnowFormatted}`,
      ...findWeatherData(details?.skyStatus),
    };
  };

  return (
    <>
      <Card
        title="Weather Forecast"
        subTitle={`Updated: ${formattedDate}`}
        headerComponent={<UnitToggle usLabel={"\u00B0F"} siLabel={"\u00B0C"} />}
      >
        <div role="group" className={sharedStyles.section}>
          {forecast.slice(0, 4).map((item) => {
            const stat = formatValues(item);
            return (
              <div
                key={stat.title}
                // tabIndex={0}
                role="listitem"
                aria-label={stat.title}
                className={sharedStyles.statContainer}
              >
                <div className={sharedStyles.statHeader}>{stat.title}</div>
                <div aria-hidden="true" className={sharedStyles.iconContainer}>
                  {stat.icon}
                </div>
                <div
                  aria-label={`Sky Status: ${stat.text}`}
                  className={sharedStyles.statData}
                >
                  {stat.text}
                </div>
                <div className={sharedStyles.statCaptionContainer}>
                  <div
                    aria-label={`Daily Temperature: ${stat.temp}`}
                    className={classNames(sharedStyles.statCaption)}
                  >
                    {stat.temp}
                  </div>
                  <div
                    aria-label={`Daily Temperature: ${stat.temp}`}
                    className={classNames(
                      sharedStyles.statCaption,
                      sharedStyles.weatherStatBottom
                    )}
                  >
                    {stat.snowfall}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
