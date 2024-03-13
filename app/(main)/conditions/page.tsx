import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isEmpty } from "lodash";
// PRISMIC
import { createClient } from "@/prismicio";
import { fetchConditionData, getNavSections } from "./conditionsHelpers";
// TYPES
import { ResortInfo } from "@/components/Weather/conditionTypes";
// COMPONENTS
import { CurrentConditions } from "@/components/Weather/CurrentConditions";
import { SnowReport } from "@/components/Weather/SnowReport";
import { LiftStatus } from "@/components/Weather/LiftStatus";
import { TrailStatus } from "@/components/Weather/TrailStatus";
import { Forecast } from "@/components/Weather/Forecast";
import { InPageNav } from "@/components/Weather/InPageNav";
import { Banner } from "@/components/Weather/Banner";
import { PageWrapper } from "@/components/PageWrapper";
import { LiveFeed } from "@/components/Weather/LiveFeed";
import classNames from "classnames";
import styles from "./conditions.module.css";
// Styles

export default async function Conditions() {
  const client = createClient();
  const page = await client.getSingle("conditions").catch(() => notFound());
  const conditionsData = await fetchConditionData();

  const {
    currentTime,
    forecastImperial,
    forecastMetric,
    snowDetailImperial,
    snowDetailMetric,
    currentSnow,
    sectorsData,
    resortData,
    roadsData,
    liftsOverall,
    trailsOverall,
    webcams,
  } = conditionsData;

  const dailyReport: ResortInfo | undefined = resortData?.find(
    (item: ResortInfo) => item.title === "Daily Report"
  );
  const hoursOfOperation: ResortInfo | undefined = resortData?.find(
    (item: ResortInfo) => item.title === "Hours of Operation"
  );

  const openSnowDataEmpty = !forecastImperial || !forecastMetric;
  const hideCurrentConditions = openSnowDataEmpty && !roadsData && resortData;
  const hideLiftStatus = !liftsOverall && !trailsOverall;
  const allConditionsEmpty = hideCurrentConditions && hideLiftStatus;

  const navSections = getNavSections(conditionsData);

  return (
    <PageWrapper>
      <Banner
        forecastImp={forecastImperial}
        forecastMet={forecastMetric}
        snowData={currentSnow}
        liftsOverall={liftsOverall}
        trailsOverall={trailsOverall}
      />
      {!allConditionsEmpty ? (
        <>
          {/* <div>{currentTime?.datetime}</div> */}
          <InPageNav sections={navSections} />
          <div className="grid">
            <div className="inset">
              {!hideCurrentConditions && (
                <CurrentConditions
                  forecastImp={forecastImperial}
                  forecastMet={forecastMetric}
                  snowData={currentSnow}
                  dailyReport={dailyReport}
                  roadsData={roadsData}
                />
              )}
              <SnowReport snowData={currentSnow} />
              {!openSnowDataEmpty && (
                <Forecast
                  forecastImp={forecastImperial}
                  forecastMet={forecastMetric}
                  snowImp={snowDetailImperial}
                  snowMet={snowDetailMetric}
                />
              )}
              {!hideLiftStatus && (
                <LiftStatus
                  sectorsData={sectorsData}
                  liftsOverall={liftsOverall}
                  trailsOverall={trailsOverall}
                  hoursOfOperation={hoursOfOperation}
                />
              )}
              {!isEmpty(sectorsData) && (
                <TrailStatus sectorsData={sectorsData} />
              )}
              <LiveFeed data={webcams} />
            </div>
          </div>
        </>
      ) : (
        <div className={classNames("grid")}>
          <div className={classNames("feature", styles.errorText)}>
            {page.data.error_message}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("conditions").catch(() => {});

  // Pass optional metadata, if available
  const title = {
    ...(page?.data?.title ? { title: page.data.title } : null),
    ...(page?.data?.meta_title ? { title: page.data.meta_title } : null),
  };

  const description = {
    ...(page?.data?.meta_description
      ? { description: page.data.meta_description }
      : null),
  };

  const openGraph = {
    ...(page?.data?.meta_image?.url
      ? { openGraph: { images: page?.data?.meta_image?.url } }
      : null),
  };

  return {
    ...title,
    ...description,
    ...openGraph,
  };
}
