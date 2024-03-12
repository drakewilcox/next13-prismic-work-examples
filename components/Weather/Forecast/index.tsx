"use client";
// Packages
import classNames from "classnames";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
import { formatDate } from "@/utilities/formatDate";
// Types
import {
  OSForecastResponse,
  OSForecastDaily,
  OSSnowResponse,
} from "@/components/Weather/conditionTypes";
// Components
import Link from "next/link";
import { Card } from "../Card";
import { UnitToggle } from "../UnitToggle";
// Styles
import sharedStyles from "../sharedWeatherStyles.module.css";

export function Forecast({
  forecastImp,
  forecastMet,
  snowImp,
  snowMet,
}: {
  forecastImp?: OSForecastResponse;
  forecastMet?: OSForecastResponse;
  snowImp?: OSSnowResponse;
  snowMet?: OSSnowResponse;
}) {
  // OPEN SNOW
  const [unitSystem] = useStore((state: any) => [state.unitSystem]);
  const forecastDaily =
    unitSystem === "US"
      ? forecastImp?.forecastDaily || []
      : forecastMet?.forecastDaily || [];
  const forecastSemiDaily =
    unitSystem === "US"
      ? snowImp?.forecastSemiDaily || []
      : snowMet?.forecastSemiDaily || [];

  const lastModified = forecastDaily[0].displayAt;
  const formattedDate = formatDate(lastModified);

  const { linkUrl, linkText } = forecastImp?.attribution ?? {};

  const showForecastLink = !!linkUrl && !!linkText;

  const convertDate = (date: Date) => {
    if (!date) return;
    return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const formatOSValues = (info: OSForecastDaily) => {
    const infoDate = new Date(info.displayAt);
    const currentDate = new Date();
    const isToday = convertDate(infoDate) === convertDate(currentDate);
    const weekDay = isToday
      ? "Today"
      : infoDate.toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC",
        });
    const amInfo = forecastSemiDaily.find(
      (obj) =>
        obj.displayAtLocalLabel === info.displayAtLocalLabel &&
        obj.dayPeriod === "day"
    );
    const pmInfo = forecastSemiDaily.find(
      (obj) =>
        obj.displayAtLocalLabel === info.displayAtLocalLabel &&
        obj.dayPeriod === "night"
    );
    const measurement = unitSystem === "SI" ? "cm" : "in";

    const amSnowMin = Math.round(amInfo?.precipSnowMin || 0);
    const amSnowMax = Math.round(amInfo?.precipSnowMax || 0);
    const showAMRange = amSnowMin !== amSnowMax;
    const amSnowRange = showAMRange
      ? `${amSnowMin} - ${amSnowMax} ${measurement} (AM)`
      : `${amSnowMax} ${measurement} (AM)`;

    const pmSnowMin = Math.round(pmInfo?.precipSnowMin || 0);
    const pmSnowMax = Math.round(pmInfo?.precipSnowMax || 0);
    const showPMRange = pmSnowMin !== pmSnowMax;
    const pmSnowRange = showPMRange
      ? `${pmSnowMin} - ${pmSnowMax} ${measurement} (PM)`
      : `${pmSnowMax} ${measurement} (PM)`;

    // const amSnow = `${Math.round(amInfo?.precipSnow || 0)} ${measurement} (AM)`;
    // const pmSnow = `${Math.round(pmInfo?.precipSnow || 0)} ${measurement} (PM)`;

    const tempMax =
      unitSystem === "SI"
        ? `${Math.ceil(info.tempMax)}\u00B0`
        : `${Math.ceil(info.tempMax)}\u00B0F`;

    const tempMin =
      unitSystem === "SI"
        ? `${Math.ceil(info.tempMin)}\u00B0`
        : `${Math.ceil(info.tempMin)}\u00B0F`;

    return {
      title: weekDay,
      temp: `H: ${tempMax} / L: ${tempMin}`,
      snowfall: `${amSnowRange} / ${pmSnowRange}`,
      iconUrl: info.conditionsIconUrl,
      condition: info.conditionsLabel,
    };
  };

  return (
    <>
      <Card
        openSnowAttr={forecastImp?.attribution}
        title="Weather Forecast"
        subTitle={`Updated: ${formattedDate}`}
        headerComponent={<UnitToggle usLabel={"\u00B0F"} siLabel={"\u00B0C"} />}
      >
        <div role="group" className={sharedStyles.section}>
          {forecastDaily.slice(0, 5).map((item) => {
            const stat = formatOSValues(item);
            return (
              <div
                key={stat.title}
                role="listitem"
                aria-label={stat.title}
                className={sharedStyles.statContainer}
              >
                <div className={sharedStyles.statHeader}>{stat.title}</div>
                <div aria-hidden="true" className={sharedStyles.iconContainer}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={stat.iconUrl} />
                </div>
                <div className={sharedStyles.statData}>{stat.condition}</div>
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
        {showForecastLink && (
          <Link
            className={classNames("button", sharedStyles.osLink)}
            href={linkUrl}
            target="_blank"
          >
            <span>{linkText}</span>
          </Link>
        )}
      </Card>
    </>
  );
}
