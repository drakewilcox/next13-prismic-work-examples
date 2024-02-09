"use client";
// Hooks & Utilities
import { useStore } from "@/hooks/useStore";
// Types
import {
  WeatherInfo,
  SnowData,
  LiftsOverall,
  TrailsOverall,
} from "@/components/Weather/conditionTypes";
// Styles
import styles from "./banner.module.css";

export function Banner({
  data,
  snowData,
  liftsOverall,
  trailsOverall,
}: {
  data: WeatherInfo;
  snowData: SnowData;
  liftsOverall: LiftsOverall;
  trailsOverall: TrailsOverall;
}) {
  const temperature = data?.current?.temperature;
  const skyStatus = data?.current?.skyStatus;
  const snowTotalDepth = snowData?.snowTotalDepth;

  const [unitSystem] = useStore((state: any) => [state.unitSystem]);

  const currentTemp =
    unitSystem === "SI"
      ? `${Math.ceil(temperature?.value || 0)}\u00B0C`
      : `${Math.ceil(temperature?.countryValue || 0)}\u00B0F`;

  const currentSky = skyStatus?.replace(/_/g, " ");

  const currentSnow =
    unitSystem === "SI"
      ? `${Math.ceil(snowTotalDepth?.value || 0)} cm`
      : `${Math.ceil(snowTotalDepth?.countryValue || 0)}"`;

  const lifts = `${liftsOverall?.openLifts}/${liftsOverall?.lifts}`;
  const trails = `${trailsOverall?.openTrails}/${trailsOverall?.totalTrails}`;

  const weatherDataString = data
    ? `It's ${currentTemp} and ${currentSky} with`
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
