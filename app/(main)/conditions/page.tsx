import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';
// PRISMIC
import { createClient } from '@/prismicio';
// ACTIONS
import {
  fetchWeather,
  fetchSnowReport,
  fetchPOI,
  fetchPOIOverall,
  fetchResortOpeningService,
  fetchResortAccessService,
  fetchWebcamService,
} from './actions';
// TYPES
import {
  LiftsOverall,
  ResortInfo,
  RoadCondition,
  Sector,
  SnowData,
  TrailsOverall,
  WeatherInfo,
} from '@/components/Weather/conditionTypes';
// COMPONENTS

import { CurrentConditions } from '@/components/Weather/CurrentConditions';
import { SnowReport } from '@/components/Weather/SnowReport';
import { LiftStatus } from '@/components/Weather/LiftStatus';
import { TrailStatus } from '@/components/Weather/TrailStatus';
import { Forecast } from '@/components/Weather/Forecast';
import { InPageNav } from '@/components/Weather/InPageNav';
import { Banner } from '@/components/Weather/Banner';
import { PageWrapper } from '@/components/PageWrapper';
import { LiveFeed } from '@/components/Weather/LiveFeed';
import classNames from 'classnames';
import styles from './conditions.module.css';
// Styles

export default async function Conditions() {
  const client = createClient();
  const page = await client.getSingle('conditions').catch(() => notFound());

  const weather = await fetchWeather();
  const snow = await fetchSnowReport();
  const poiData = await fetchPOI();
  const poiOverall = await fetchPOIOverall();
  const resort = await fetchResortOpeningService();
  const roads = await fetchResortAccessService();
  const webCams = await fetchWebcamService();

  const liftsOverall: LiftsOverall =
    poiOverall?.content?.overalls[0].liftsOverall;
  const trailsOverall: TrailsOverall =
    poiOverall?.content?.overalls[0].trailsOverall;
  const currentWeather: WeatherInfo =
    weather?.content?.weatherZones[0].weatherInfos[0];
  const forecast: WeatherInfo[] =
    weather?.content?.weatherZones[0].weatherInfos;
  const currentSnow: SnowData = snow?.content?.snowZones[0];
  const sectorsData: Sector[] = poiData?.content?.resorts[0].sectors;
  const resortData: ResortInfo[] = resort?.content?.resorts[0].resortInfos;
  const roadsData: RoadCondition[] = roads?.content?.resorts[0].roadConditions;

  const dailyReport: ResortInfo | undefined = resortData?.find(
    (item: ResortInfo) => item.title === 'Daily Report'
  );
  const hoursOfOperation: ResortInfo | undefined = resortData?.find(
    (item: ResortInfo) => item.title === 'Hours of Operation'
  );

  const hideCurrentConditions =
    isEmpty(currentWeather) && isEmpty(roadsData) && isEmpty(resortData);
  const hideLiftStatus = isEmpty(poiOverall) && isEmpty(poiData);
  const allConditionsEmpty = hideCurrentConditions && hideLiftStatus;

  const navSections = [
    ...(!hideCurrentConditions
      ? [
          {
            first: 'Current',
            second: 'Conditions',
          },
        ]
      : []),
    ...(!!currentSnow
      ? [
          {
            first: 'Snow',
            second: 'Report',
          },
        ]
      : []),
    ...(!isEmpty(currentWeather)
      ? [
          {
            first: 'Weather',
            second: 'Forecast',
          },
        ]
      : []),
    ...(!hideLiftStatus
      ? [
          {
            first: 'Lift &',
            second: 'Terrain Status',
          },
        ]
      : []),
    ...(!isEmpty(sectorsData)
      ? [
          {
            first: 'Trail',
            second: 'Status',
          },
        ]
      : []),
    ...(!isEmpty(webCams)
      ? [
          {
            first: 'Live',
            second: 'Feed',
          },
        ]
      : []),
  ];

  return (
    <PageWrapper>
      <Banner
        data={currentWeather}
        snowData={currentSnow}
        liftsOverall={liftsOverall}
        trailsOverall={trailsOverall}
      />
      {!allConditionsEmpty ? (
        <>
          <InPageNav sections={navSections} />
          <div className="grid">
            <div className="inset">
              {!hideCurrentConditions && (
                <CurrentConditions
                  data={currentWeather}
                  snowData={currentSnow}
                  dailyReport={dailyReport}
                  roadsData={roadsData}
                />
              )}
              <SnowReport weatherInfo={currentWeather} snowData={currentSnow} />
              {!isEmpty(currentWeather) && <Forecast forecast={forecast} />}
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
              <LiveFeed data={webCams} />
            </div>
          </div>
        </>
      ) : (
        <div className={classNames('grid')}>
          <div className={classNames('feature', styles.errorText)}>
            {page.data.error_message}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('conditions').catch(() => {});

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
