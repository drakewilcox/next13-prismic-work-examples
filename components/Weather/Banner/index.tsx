"use client";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
// Types
import {
  WeatherInfo,
  SnowData,
  LiftsOverall,
  TrailsOverall,
  OSForecastResponse,
} from "@/components/Weather/conditionTypes";
// Styles
import styles from "./banner.module.css";

export function Banner({
  forecastImp,
  forecastMet,
  snowData,
  liftsOverall,
  trailsOverall,
}: {
  forecastImp?: OSForecastResponse;
  forecastMet?: OSForecastResponse;
  snowData: SnowData;
  liftsOverall: LiftsOverall;
  trailsOverall: TrailsOverall;
}) {
  const [unitSystem] = useStore((state: any) => [state.unitSystem]);
  const forecastCurrent =
    unitSystem === "US"
      ? forecastImp?.forecastCurrent
      : forecastMet?.forecastCurrent;

  const { temp, conditionsLabel } = forecastCurrent ?? {};

  const snowTotalDepth = snowData?.snowTotalDepth;

  const currentTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temp || 0)}\u00B0C`
      : `${Math.ceil(temp || 0)}\u00B0F`;

  const currentSnow =
    unitSystem === "SI"
      ? `${Math.ceil(snowTotalDepth?.value || 0)} cm`
      : `${Math.ceil(snowTotalDepth?.countryValue || 0)}"`;

  const lifts = `${liftsOverall?.openLifts}/${liftsOverall?.lifts}`;
  const trails = `${trailsOverall?.openTrails}/${trailsOverall?.totalTrails}`;

  const weatherDataString = forecastCurrent
    ? `It's ${currentTemp} and ${conditionsLabel} with`
    : "";
  const snowDataString = snowData ? `${currentSnow} base depth.` : "";
  const liftsAndTrails = liftsOverall && trailsOverall;
  const poiDataString = liftsAndTrails
    ? `${lifts} lifts and ${trails} trails are open`
    : "";

  const bannerStatement = `${weatherDataString} ${snowDataString} ${poiDataString}`;

  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <div className="grid">
          <div className="feature">
            <h1>{bannerStatement}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
