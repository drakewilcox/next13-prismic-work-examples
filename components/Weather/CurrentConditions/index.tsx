"use client";
// Packages
import classNames from "classnames";
import parse from "html-react-parser";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
import { formatDate } from "@/utilities/formatDate";
import { isEmpty } from "lodash";
// Types
import {
  SnowData,
  ResortInfo,
  RoadCondition,
  OSForecastResponse,
} from "@/components/Weather/conditionTypes";
// Components & Icons
import { Card } from "../Card";
import { UnitToggle } from "../UnitToggle";
import { StatusIcon, Closed } from "@/components/Icons";
// Styles
import sharedStyles from "../sharedWeatherStyles.module.css";
import { RoadConditionsKey } from "../RoadConditionsKey";

export function CurrentConditions({
  snowData,
  dailyReport,
  roadsData,
  forecastImp,
  forecastMet,
}: {
  forecastImp?: OSForecastResponse;
  forecastMet?: OSForecastResponse;
  snowData: SnowData;
  dailyReport?: ResortInfo;
  roadsData: RoadCondition[];
}) {
  // OPEN SNOW:
  const unitSystem = useStore((state: any) => state.unitSystem);
  const currentForecast =
    unitSystem === "US"
      ? forecastImp?.forecastCurrent
      : forecastMet?.forecastCurrent;
  const forecastResponse = unitSystem === "US" ? forecastImp : forecastMet;

  const {
    displayAt,
    conditionsLabel,
    temp,
    windDirLabel,
    windSpeed: OSWindSpeed,
  } = currentForecast ?? {};

  const fiveDayForecast = forecastResponse?.forecastDaily || [];

  const dailyForecast = fiveDayForecast[0];
  const { tempMin, tempMax } = dailyForecast ?? {};

  const formattedDate = currentForecast
    ? `Updated: ${formatDate(displayAt)}`
    : "Recent Weather Conditions Unavailable";

  const renderRoadStatusIcon = (surface: string) => {
    const green = ["CLEAR_DRY", "UNDEF"];

    const yellow = ["CLEAR_WET", "SOGGY", "PACKED", "PART_SNOW", "ICY"];
    const red = ["SNOWY"];

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
    if (red.includes(surface)) {
      return {
        icon: <StatusIcon fill={"#DA2F20"} />,
        description:
          "Snowy road. Passenger vehicles are required to have 4 wheel drive or all-wheel drive with snow tires and/or chains.",
        shortDescription: "Snowy",
      };
    }
    return {
      icon: <Closed />,
      description: "Road is Closed.",
      shortDescription: "Closed",
    };
  };

  const currentTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temp || 0)}\u00B0C`
      : `${Math.ceil(temp || 0)}\u00B0F`;

  const lowTemp =
    unitSystem === "SI"
      ? `${Math.ceil(tempMin || 0)}\u00B0`
      : `${Math.ceil(tempMin || 0)}\u00B0`;

  const highTemp =
    unitSystem === "SI"
      ? `${Math.ceil(tempMax || 0)}\u00B0`
      : `${Math.ceil(tempMax || 0)}\u00B0`;

  const windSpeed =
    unitSystem === "SI"
      ? `${Math.ceil(OSWindSpeed || 0)} KPH ${windDirLabel || ""}`
      : `${Math.ceil(OSWindSpeed || 0)} MPH ${windDirLabel || ""}`;

  const snowfall48 =
    unitSystem === "SI"
      ? `${Math.ceil(snowData?.freshSnowFallDepth48H?.value || 0)} cm`
      : `${Math.ceil(snowData?.freshSnowFallDepth48H?.countryValue || 0)} "`;

  const stats = [
    {
      title: "Temp",
      data: currentTemp,
    },
    {
      title: "Conditions",
      data: conditionsLabel,
    },
    {
      title: "High / Low",
      data: `${highTemp} / ${lowTemp}`,
    },
    {
      title: "48HR Snowfall",
      data: snowfall48,
    },
    {
      title: "Wind",
      data: windSpeed,
    },
  ];

  const headerComponent: React.ReactNode = (
    <UnitToggle usLabel={"\u00B0F"} siLabel={"\u00B0C"} />
  );

  return (
    <>
      <Card
        openSnowAttr={forecastImp?.attribution}
        title="Current Conditions"
        id="current_conditions"
        subTitle={formattedDate}
        headerComponent={headerComponent}
      >
        {currentForecast && (
          <div className={classNames(sharedStyles.section)}>
            {stats.map((item) => (
              <div
                aria-label={`${item.title}: ${item.data}`}
                key={item.title}
                className={sharedStyles.statContainer}
              >
                <div className={sharedStyles.statHeader}>{item.title}</div>
                <div className={sharedStyles.statData}>{item.data}</div>
              </div>
            ))}
          </div>
        )}
        {roadsData && (
          <>
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
            <RoadConditionsKey />
          </>
        )}
        {dailyReport?.data[0]?.data && (
          <div aria-labelledby="daily-message" className={sharedStyles.section}>
            <div className={sharedStyles.dataContainer}>
              <div id="daily-message" className={sharedStyles.statHeader}>
                Daily Message
              </div>
              <div className={sharedStyles.paragraph}>
                {parse(dailyReport.data[0].data)}
              </div>
            </div>
          </div>
        )}

        {/* <div aria-labelledby="details" className={sharedStyles.section}>
          <div className={styles.detailsContainer}>
            <div className={sharedStyles.dataContainer}>
              <div id="details" className={sharedStyles.statHeader}>
                Details
              </div>
              <div className={sharedStyles.paragraph}>???</div>
            </div>
          </div>
        </div> */}
      </Card>
    </>
  );
}
