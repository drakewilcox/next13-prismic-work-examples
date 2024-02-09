"use client";
import classNames from "classnames";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
import { formatDate } from "@/utilities/formatDate";
// Types
import { WeatherInfo, SnowData } from "@/components/Weather/conditionTypes";
// Components
import { Card } from "../Card";
import { UnitToggle } from "../UnitToggle";
// Styles
import styles from "./snowReport.module.css";
import sharedStyles from "../sharedWeatherStyles.module.css";

export function SnowReport({
  weatherInfo,
  snowData,
}: {
  weatherInfo: WeatherInfo;
  snowData: SnowData;
}) {
  const {
    snowTotalDepth,
    snowFallDepthCompleteSeason,
    freshSnowFallDepth12H,
    freshSnowFallDepth24H,
    freshSnowFallDepth48H,
    freshSnowFallDepth72H,
    freshSnowFallDepth7D,
    lastModified,
  } = snowData ?? {};

  const [unitSystem] = useStore((state: any) => [state.unitSystem]);

  if (!snowData) {
    return <></>;
  }

  const temperature = weatherInfo?.current?.temperature;
  const formattedDate = formatDate(lastModified);

  const currentTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temperature?.value || 0)}\u00B0C`
      : `${Math.ceil(temperature?.countryValue || 0)}\u00B0F`;

  const snowfallBase =
    unitSystem === "SI"
      ? `${Math.ceil(snowTotalDepth.value)} cm`
      : `${Math.ceil(snowTotalDepth.countryValue)}"`;
  const snowfallSeason =
    unitSystem === "SI"
      ? `${Math.ceil(snowFallDepthCompleteSeason?.value || 0)} cm`
      : `${Math.ceil(snowFallDepthCompleteSeason?.countryValue || 0)}"`;

  const snowfall12H =
    unitSystem === "SI"
      ? `${Math.ceil(freshSnowFallDepth12H.value)} cm`
      : `${Math.ceil(freshSnowFallDepth12H.countryValue)}"`;

  const snowfall24H =
    unitSystem === "SI"
      ? `${Math.ceil(freshSnowFallDepth24H.value)} cm`
      : `${Math.ceil(freshSnowFallDepth24H.countryValue)}"`;

  const snowfall48H =
    unitSystem === "SI"
      ? `${Math.ceil(freshSnowFallDepth48H.value)} cm`
      : `${Math.ceil(freshSnowFallDepth48H.countryValue)}"`;

  const snowfall72H =
    unitSystem === "SI"
      ? `${Math.ceil(freshSnowFallDepth72H.value)} cm`
      : `${Math.ceil(freshSnowFallDepth72H.countryValue)}"`;

  const snowfall7D =
    unitSystem === "SI"
      ? `${Math.ceil(freshSnowFallDepth7D.value)} cm`
      : `${Math.ceil(freshSnowFallDepth7D.countryValue)}"`;

  const stats = [
    ...(snowData
      ? [
          {
            title: "Surface \nConditions",
            data: currentTemp,
          },
        ]
      : []),
    {
      title: "12HR \nSnowfall",
      data: snowfall12H,
    },
    {
      title: "24HR \nSnowfall",
      data: snowfall24H,
    },
    {
      title: "48HR \nSnowfall",
      data: snowfall48H,
    },
    {
      title: "7 Day \nSnowfall",
      data: snowfall7D,
    },
    {
      title: "Base \nDepth",
      data: snowfallBase,
    },
    {
      title: "Current \nSeason",
      data: snowfallSeason,
    },
  ];

  return (
    <>
      <Card
        title="Snow Report"
        subTitle={`Updated: ${formattedDate}`}
        headerComponent={<UnitToggle usLabel="In" siLabel="cm" />}
      >
        <div className={sharedStyles.section}>
          {stats.map((item) => (
            <div
              key={item.title}
              aria-label={`${item.title}: ${item.data}`}
              className={sharedStyles.statContainer}
            >
              <div
                className={classNames(
                  sharedStyles.statHeader,
                  styles.snowfallHeader
                )}
              >
                {item.title}
              </div>
              <div className={sharedStyles.statData}>{item.data}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
