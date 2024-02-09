"use client";
// Packages
import Link from "next/link";
import classNames from "classnames";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
import { formatDate } from "@/utilities/formatDate";
import { findWeatherData } from "@/utilities/findWeatherData";
// Types
import {
  WeatherInfo,
  SnowData,
  ResortInfo,
  RoadCondition,
  LiftsOverall,
  TrailsOverall,
} from "@/components/Weather/conditionTypes";
// Components & Icons
import { UnitToggle } from "../UnitToggle";
import { StatusIcon, Closed, XIcon } from "@/components/Icons";
// Styles
import sharedStyles from "../sharedWeatherStyles.module.css";
import styles from "./currentConditionsFlyout.module.css";

export function CurrentConditionsFlyout({
  data,
  snowData,
  roadsData,
  trailsOverall,
  liftsOverall,
}: {
  data: WeatherInfo;
  snowData: SnowData;
  roadsData: RoadCondition[];
  liftsOverall: LiftsOverall;
  trailsOverall: TrailsOverall;
}) {
  const { current, temperatureMin, temperatureMax } = data;
  const { temperature, lastModified, wind, skyStatus } = current;
  const formattedDate = formatDate(lastModified);
  const unitSystem = useStore((state: any) => state.unitSystem);
  const renderRoadStatusIcon = (surface: string) => {
    const green = ["CLEAR_DRY", "UNDEF"];
    const yellow = ["CLEAR_WET", "SOGGY", "PACKED", "PART_SNOW", "ICY"];

    if (green.includes(surface)) {
      return {
        icon: <StatusIcon fill={"#008500"} />,
        description: "Dry road. Any passenger vehicles can access.",
        shortDescription: "Clear and dry",
      };
    }
    if (yellow.includes(surface)) {
      return {
        icon: <StatusIcon fill={"#FFD056"} />,
        description:
          "Wet, icy or snowy road. Passenger vehicles should be outfitted with snow tires and all-wheel drive capabilities.",
        shortDescription: "Wet, icy or snowy",
      };
    }
    if (surface === "CLEAR_DRY") {
      return {
        icon: <StatusIcon fill={"#DA2F20"} />,
        description:
          "Snowy road. Passenger vehicles are required to have 4 wheel drive or all-wheel drive with snow tires and/or chains.",
        shortDescription: "Snowy",
      };
    } else {
      return {
        icon: <Closed />,
        description: "Road is Closed.",
        shortDescription: "Closed",
      };
    }
  };

  const abbreviateDirection = (direction: string) => {
    const words = direction.split("_");
    const abbreviation = words
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    return abbreviation;
  };

  const currentTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temperature.value)}\u00B0C`
      : `${Math.ceil(temperature.countryValue)}\u00B0F`;

  const lowTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temperatureMin.value)}\u00B0`
      : `${Math.ceil(temperatureMin.countryValue)}\u00B0`;

  const highTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temperatureMax.value)}\u00B0`
      : `${Math.ceil(temperatureMax.countryValue)}\u00B0`;

  const windSpeed =
    unitSystem === "SI"
      ? `${Math.ceil(wind.value.value)} KPH ${abbreviateDirection(
          wind.direction
        )}`
      : `${Math.ceil(wind.value.countryValue)} MPH ${abbreviateDirection(
          wind.direction
        )}`;

  const snowfall48 =
    unitSystem === "SI"
      ? `${snowData?.freshSnowFallDepth48H?.value} cm`
      : `${snowData?.freshSnowFallDepth48H?.countryValue} "`;

  const { openLifts, lifts } = liftsOverall ?? {};
  const { openTrails, totalTrails } = trailsOverall ?? {};

  const stats = [
    {
      title: "Temp",
      data: currentTemp,
    },
    {
      title: "Conditions",
      data: findWeatherData(skyStatus).text,
    },
    {
      title: "High / Low",
      data: `${highTemp} / ${lowTemp}`,
    },
    ...(snowData?.freshSnowFallDepth48H
      ? [
          {
            title: "48HR Snowfall",
            data: snowfall48,
          },
        ]
      : []),
    {
      title: "Wind",
      data: windSpeed,
    },
    ...(liftsOverall
      ? [
          {
            title: "Lifts Open",
            data: `${openLifts} / ${lifts}`,
          },
        ]
      : []),
    ...(trailsOverall
      ? [
          {
            title: "Trails Open",
            data: `${openTrails} / ${totalTrails}`,
          },
        ]
      : []),
  ];

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderTitle}>
            <h2>Current Conditions</h2>
            <p className={styles.cardSubTitle}>Updated: {formattedDate}</p>
          </div>
          <div className={styles.cardToggleContainer}>
            <Link href="/conditions" className="button">
              <span>View Full Conditions Report</span>
            </Link>
            <UnitToggle usLabel={"F\u00B0"} siLabel={"C\u00B0"} />
          </div>
        </div>

        <div className={styles.cardBody}>
          <div className={classNames(sharedStyles.section)}>
            {stats.map((item) => {
              if (item.data) {
                return (
                  <div
                    aria-label={`${item.title}: ${item.data}`}
                    key={item.title}
                    className={sharedStyles.statContainer}
                  >
                    <div className={sharedStyles.statHeader}>{item.title}</div>
                    <div className={sharedStyles.statData}>{item.data}</div>
                  </div>
                );
              }
            })}
          </div>
          {roadsData && (
            <div className={sharedStyles.section}>
              <div
                aria-labelledby="road-conditions-label"
                className={classNames(
                  sharedStyles.statContainer,
                  sharedStyles.conditionsContainer
                )}
              >
                <div
                  id="road-conditions-label"
                  className={sharedStyles.statHeader}
                >
                  Road Conditions
                </div>
                <div className={classNames(sharedStyles.roadData)}>
                  {roadsData.map((road) => (
                    <div
                      className={sharedStyles.roadContainer}
                      key={road.id}
                      aria-label={`Road: ${road.name}, Status: ${
                        renderRoadStatusIcon(road.surface).description
                      }`}
                    >
                      <div className={sharedStyles.roadStatusIcon}>
                        {renderRoadStatusIcon(road.surface).icon}
                      </div>
                      <div>
                        <p className={sharedStyles.roadName}>{road.name}</p>
                        <p className={sharedStyles.roadStatus}>
                          {renderRoadStatusIcon(road.surface).shortDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
