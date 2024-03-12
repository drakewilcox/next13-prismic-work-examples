"use client";
// Packages
import parse from "html-react-parser";
import classNames from "classnames";
// Hooks & Utilities
import { findLiftData } from "@/utilities/findLiftData";
import { formatTimeRange } from "@/utilities/formatTimeRange";
import { sectorOpeningStatus } from "@/utilities/sectorOpeningStatus";
// Types
import {
  Sector,
  LiftsOverall,
  TrailsOverall,
  Lift,
  ResortInfo,
} from "@/components/Weather/conditionTypes";
// Components
import { SnowCat } from "@/components/Icons";
import { Card } from "../Card";
import sharedStyles from "../sharedWeatherStyles.module.css";
import styles from "./liftStatus.module.css";

export function LiftStatus({
  sectorsData,
  liftsOverall,
  trailsOverall,
  hoursOfOperation,
}: {
  sectorsData?: Sector[];
  liftsOverall: LiftsOverall;
  trailsOverall: TrailsOverall;
  hoursOfOperation?: ResortInfo;
}) {
  const allLifts: Lift[] = sectorsData
    ?.flatMap((sector) => sector.lifts)
    .filter(Boolean) as Lift[];

  // const allTerrains = sectorsData?.filter((sector) => !sector.lifts);
  const adventureTerrain = sectorsData?.filter((sector) => sector.id === "986");
  const adventureTerrainTrails = adventureTerrain
    ? adventureTerrain[0]?.trails
    : null;

  const {
    openTrails,
    totalTrails,
    openTrailsTotalSurface,
    openTrailsSurfaceRatio,
  } = trailsOverall ?? {};

  const { openLifts, lifts } = liftsOverall ?? {};

  const terrainOpen =
    openTrailsSurfaceRatio?.value === "NaN"
      ? "0"
      : openTrailsSurfaceRatio?.value;

  const hideStats = !liftsOverall || !trailsOverall;

  const stats = [
    // {
    //   title: "Acres Open",
    //   data: openTrailsTotalSurface?.countryValue,
    // },
    {
      title: "Lifts Open",
      data: `${openLifts} / ${lifts}`,
    },
    // {
    //   title: "Terrain Open",
    //   data: `${terrainOpen}%`,
    // },
    {
      title: "Trails Open",
      data: `${openTrails} / ${totalTrails}`,
    },
    ...(hoursOfOperation?.data[0]?.data
      ? [
          {
            title: "Hours of Operation",
            data: parse(hoursOfOperation?.data[0]?.data),
          },
        ]
      : []),
  ];

  return (
    <>
      <Card
        title="Lift & Terrain Status"
        subTitle={
          "Conditions change rapidly in the mountains and the website may not reflect real-time conditions. Always obey mountain closures, signs, rope lines and posted warnings as they reflect real-time conditions."
        }
      >
        {!hideStats && (
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
        {allLifts && (
          <>
            <p className={styles.label}>Lifts</p>
            <div
              aria-label="Lifts"
              className={classNames(
                sharedStyles.section,
                styles.liftGridContainer
              )}
            >
              {allLifts?.map((item: Lift) => {
                const liftType = findLiftData(
                  item.liftType,
                  item.capacity.value
                ).name;

                const timesTh: any = item.openingTimesTh
                  ? formatTimeRange(item.openingTimesTh[0])
                  : null;

                const timesReal: any = item.openingTimesReal
                  ? formatTimeRange(item.openingTimesReal[0])
                  : null;

                const hours = {
                  beginTime:
                    timesReal?.beginTime || timesTh?.beginTime || "? AM",
                  endTime: timesReal?.endTime || timesTh?.endTime || "? PM",
                };

                const operatingHours = `${hours.beginTime} - ${hours.endTime}`;
                return (
                  <div key={item.name} className={styles.liftContainer}>
                    <div
                      aria-label={`Lift Name: ${item.name}`}
                      className={styles.liftTitle}
                    >
                      {item.name}
                    </div>
                    <div className={styles.liftBody}>
                      <div
                        aria-label={`Lift Type: ${liftType}`}
                        className={styles.liftTypeContainer}
                      >
                        <div className={styles.liftTypeIcon}>
                          {
                            findLiftData(item.liftType, item.capacity.value)
                              .icon
                          }
                        </div>
                        <div className={styles.liftType}>{liftType}</div>
                      </div>
                      <div
                        aria-label={`Lift Hours: ${operatingHours} `}
                        className={styles.availContainer}
                      >
                        <div className={styles.liftType}>{operatingHours}</div>
                        <div
                          aria-label={`Opening Status: ${item.openingStatus}`}
                          className={classNames(
                            styles.openingStatus,
                            styles[`lift${item.openingStatus}`]
                          )}
                        >
                          {item.openingStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {adventureTerrainTrails && (
          <>
            <p className={styles.label}>Adventure Terrain</p>
            <div
              aria-label="Adventure Terrain"
              className={classNames(
                sharedStyles.section,
                styles.liftGridContainer
              )}
            >
              {adventureTerrainTrails?.map((item: any) => {
                const timesTh: any = item.openingTimesTh
                  ? formatTimeRange(item.openingTimesTh[0])
                  : null;

                const timesReal: any = item.openingTimesReal
                  ? formatTimeRange(item.openingTimesReal[0])
                  : null;

                const hours = {
                  beginTime:
                    timesReal?.beginTime || timesTh?.beginTime || "? AM",
                  endTime: timesReal?.endTime || timesTh?.endTime || "? PM",
                };

                const operatingHours = `${hours.beginTime} - ${hours.endTime}`;
                return (
                  <div key={item.name} className={styles.liftContainer}>
                    <div
                      aria-label={`Lift Name: ${item.name}`}
                      className={styles.liftTitle}
                    >
                      {item.name}
                    </div>
                    <div className={styles.liftBody}>
                      <div className={styles.liftTypeContainer}>
                        <div className={styles.liftTypeIcon}>
                          <SnowCat />
                        </div>
                        <div
                          aria-label={"Lift Type: Adventure Terrain"}
                          className={styles.liftType}
                        >
                          Adventure Terrain
                        </div>
                      </div>
                      <div
                        aria-label={`Lift Hours: ${operatingHours} `}
                        className={styles.availContainer}
                      >
                        <div className={styles.liftType}>{operatingHours}</div>
                        <div
                          aria-label={`Opening Status: ${item.openingStatus}`}
                          className={classNames(
                            styles.openingStatus,
                            styles[`lift${item.openingStatus}`]
                          )}
                        >
                          {item.openingStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* {allTerrains && (
          <>
            <p className={styles.label}>Adventure Terrain</p>
            <div
              aria-label="Adventure Terrain"
              className={classNames(
                sharedStyles.section,
                styles.liftGridContainer
              )}
            >
              {allTerrains?.map((item: Sector) => {
                const openingStatus = sectorOpeningStatus(item.trails);
                console.log(item);
                return (
                  <div key={item.name} className={styles.liftContainer}>
                    <div
                      aria-label={`Sector Name: ${item.name}`}
                      className={styles.liftTitle}
                    >
                      {item.name}
                    </div>
                    <div className={styles.liftBody}>
                      <div className={styles.liftTypeContainer}>
                        <div className={styles.liftTypeIcon}>
                          <SnowCat />
                        </div>
                        <div
                          aria-label={"Lift Type: Adventure Terrain"}
                          className={styles.liftType}
                        >
                          Adventure Terrain
                        </div>
                      </div>
                      <div className={styles.availContainer}>
               
                        <div
                          aria-label={`Opening Status: ${openingStatus}`}
                          className={classNames(
                            styles.openingStatus,
                            styles[`lift${openingStatus}`]
                          )}
                        >
                          {openingStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )} */}
      </Card>
    </>
  );
}
