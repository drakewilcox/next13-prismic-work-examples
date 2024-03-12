import { useStore } from "@/hooks/useStore";

import Link from "next/link";
import {
  LiftsOverall,
  OpenSnowConditionsData,
  RoadCondition,
  SnowData,
  TrailsOverall,
} from "@/components/Weather/conditionTypes";
import { StatusIcon, Closed } from "@/components/Icons";
import { UnitToggle } from "@/components/Weather/UnitToggle";

import styles from "./miniConditionsStyles.module.css";

export function MiniConditions({
  currentSnow,
  roadsData,
  trailsOverall,
  liftsOverall,
  openSnowData,
}: {
  currentSnow: SnowData;
  roadsData: RoadCondition[];
  trailsOverall: TrailsOverall;
  liftsOverall: LiftsOverall;
  openSnowData: OpenSnowConditionsData;
}) {
  const [unitSystem] = useStore((state: any) => [state.unitSystem]);

  const { forecastImperial, forecastMetric } = openSnowData;

  const currentForecast =
    unitSystem === "US"
      ? forecastImperial?.forecastCurrent
      : forecastMetric?.forecastCurrent;

  const { temp, conditionsLabel, conditionsIconUrl } = currentForecast ?? {};

  const freshSnowFallDepth48H = currentSnow?.freshSnowFallDepth48H;

  const snowfall48H =
    unitSystem === "SI"
      ? `${Math.ceil(freshSnowFallDepth48H?.value ?? 0)} cm`
      : `${Math.ceil(freshSnowFallDepth48H?.countryValue ?? 0)}"`;

  const snowfall48HA11y =
    unitSystem === "SI"
      ? `${Math.ceil(freshSnowFallDepth48H?.value ?? 0)} centimeter`
      : `${Math.ceil(freshSnowFallDepth48H?.countryValue ?? 0)} inches`;

  const currentTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temp || 0)}\u00B0C`
      : `${Math.ceil(temp || 0)}\u00B0F`;

  const { openLifts, lifts } = liftsOverall ?? {};
  const { openTrails, totalTrails } = trailsOverall ?? {};

  const stats = [
    ...(liftsOverall
      ? [
          {
            title: "Lifts Open",
            data: `${openLifts} ${String.fromCodePoint(0x2044)} ${lifts}`,
          },
        ]
      : []),
    ...(trailsOverall
      ? [
          {
            title: "Trails Open",
            data: `${openTrails} ${String.fromCodePoint(
              0x2044
            )} ${totalTrails}`,
          },
        ]
      : []),
  ];

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

  return (
    <div className={styles.miniConditions}>
      <div className={styles.item}>
        {freshSnowFallDepth48H && (
          <>
            <span aria-hidden={true}>
              <span>{snowfall48H}</span> <span>&frasl;</span> <span>48Hrs</span>
            </span>
            <span className="visually-hidden">
              {`${snowfall48HA11y} of snowfall in the last 48 hours`}
            </span>
          </>
        )}
        {temp && (
          <>
            <span className="visually-hidden">{`${conditionsLabel} and ${currentTemp}`}</span>
            <span aria-hidden={true}>
              {/* eslint-disable-next-line */}
              <img className={styles.icon} src={conditionsIconUrl} />
              <span>{currentTemp}</span>
            </span>
          </>
        )}
        <span className={styles.units}>
          <UnitToggle usLabel={"F\u00B0"} siLabel={"C\u00B0"} />
        </span>
      </div>
      <div className={styles.item}>
        {stats.map((item) => {
          if (item.data) {
            return (
              <span key={item.title}>
                <span>{item.title}</span>
                <span>{item.data}</span>
              </span>
            );
          }
        })}
      </div>

      {roadsData &&
        roadsData.map((road) => (
          <div
            className={styles.item}
            key={road.id}
            aria-label={`Road: ${road.name}, Status: ${
              renderRoadStatusIcon(road.surface).description
            }`}
          >
            <span>
              <span className={styles.roadStatusIcon}>
                {renderRoadStatusIcon(road.surface).icon}
              </span>
              <span className={styles.roadName}>
                <span>{road.name}</span>
                <span className={styles.roadStatus}>
                  {renderRoadStatusIcon(road.surface).shortDescription}
                </span>
              </span>
            </span>
          </div>
        ))}

      <div className={styles.item} style={{ justifyContent: "center" }}>
        <span>
          <Link href={"/conditions"}>View Full Report</Link>
        </span>
      </div>
    </div>
  );
}
