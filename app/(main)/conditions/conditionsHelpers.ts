import {
  fetchSnowReport,
  fetchPOI,
  fetchPOIOverall,
  fetchResortOpeningService,
  fetchResortAccessService,
  fetchWebcamService,
  fetchOSSnowDetail,
  fetchOSForecast,
  CurrentTime,
} from './actions';
// TYPES
import {
  OSForecastResponse,
  OSSnowResponse,
  AllConditions,
} from '@/components/Weather/conditionTypes';

export async function fetchConditionData(): Promise<AllConditions> {
  // OPEN SNOW
  const forecastImperial: OSForecastResponse =
    await fetchOSForecast('imperial');
  const forecastMetric: OSForecastResponse = await fetchOSForecast('metric');

  const snowDetailImperial: OSSnowResponse =
    await fetchOSSnowDetail('imperial');
  const snowDetailMetric: OSSnowResponse = await fetchOSSnowDetail('metric');

  const snow = await fetchSnowReport();
  const poiData = await fetchPOI();
  const poiOverall = await fetchPOIOverall();
  const resort = await fetchResortOpeningService();
  const roads = await fetchResortAccessService();
  const webCams = await fetchWebcamService();
  const currentTime = await CurrentTime();

  const allConditionsData = await Promise.allSettled([
    currentTime,
    forecastImperial,
    forecastMetric,
    snowDetailImperial,
    snowDetailMetric,
    snow,
    poiData,
    poiOverall,
    resort,
    roads,
    webCams,
  ]).then((results: any) => {
    const [
      currentTime,
      forecastImperial,
      forecastMetric,
      snowDetailImperial,
      snowDetailMetric,
      snow,
      poiData,
      poiOverall,
      resort,
      roads,
      webCams,
    ] = results;

    return {
      currentTime: currentTime.value,
      forecastImperial: forecastImperial?.value,
      forecastMetric: forecastMetric?.value,
      snowDetailImperial: snowDetailImperial?.value,
      snowDetailMetric: snowDetailMetric?.value,
      currentSnow: snow?.value?.content?.snowZones[0],
      sectorsData: poiData?.value?.content?.resorts[0]?.sectors,
      resortData: resort?.value?.content?.resorts[0]?.resortInfos,
      roadsData: roads?.value?.content?.resorts[0]?.roadConditions,
      liftsOverall: poiOverall?.value?.content?.overalls[0]?.liftsOverall,
      trailsOverall: poiOverall?.value?.content?.overalls[0]?.trailsOverall,
      webcams: webCams.value,
    };
  });

  return allConditionsData;
}

type NavSection = {
  first: string;
  second: string;
};

export function getNavSections(conditionsData: AllConditions): NavSection[] {
  const {
    forecastImperial,
    forecastMetric,
    currentSnow,
    sectorsData,
    resortData,
    roadsData,
    liftsOverall,
    trailsOverall,
    webcams,
  } = conditionsData;

  const openSnowDataEmpty = !forecastImperial || !forecastMetric;
  const hideCurrentConditions = openSnowDataEmpty && !roadsData && resortData;
  const hideLiftStatus = !liftsOverall && !trailsOverall;

  return [
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
    ...(!openSnowDataEmpty
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
    ...(!!sectorsData
      ? [
          {
            first: 'Trail',
            second: 'Status',
          },
        ]
      : []),
    ...(!!webcams
      ? [
          {
            first: 'Live',
            second: 'Feed',
          },
        ]
      : []),
  ];
}
