"use client";
// Packages
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { isEmpty } from "lodash";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
import { findWeatherData } from "@/utilities/findWeatherData";
// Types
import {
  LiftsOverall,
  OpenSnowConditionsData,
  RoadCondition,
  SnowData,
  TrailsOverall,
} from "@/components/Weather/conditionTypes";
// Components
import { CurrentConditionsFlyout } from "../CurrentConditionsFlyout";
// Styles
import styles from "./navConditionsStyles.module.css";

export function NavConditions({
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

  if (!isEmpty(openSnowData)) {
    return (
      <NavigationMenu.Item className={styles.NavigationConditions}>
        <NavigationMenu.Trigger className="NavigationMenuTrigger">
          <div className={styles.navItem}>
            {freshSnowFallDepth48H && (
              <>
                <span aria-hidden={true}>
                  <span>{snowfall48H}</span> <span>&frasl;</span>{" "}
                  <span>48Hrs</span>
                </span>
                <span className="visually-hidden">
                  {`${snowfall48HA11y} of snowfall in the last 48 hours`}
                </span>
              </>
            )}
            {temp && (
              <>
                <span className="visually-hidden">{`${conditionsLabel} and ${currentTemp}`}</span>
                {/* eslint-disable-next-line */}
                <img className={styles.icon} src={conditionsIconUrl} />

                <span aria-hidden={true}>{currentTemp}</span>
              </>
            )}
          </div>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="NavigationMenuContent WithConditions">
          <CurrentConditionsFlyout
            openSnowData={openSnowData}
            snowData={currentSnow}
            roadsData={roadsData}
            trailsOverall={trailsOverall}
            liftsOverall={liftsOverall}
          />
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    );
  }
  return <></>;
}
