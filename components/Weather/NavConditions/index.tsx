'use client';
// Packages
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { isEmpty } from 'lodash';
// Hooks & Utilities
import { useStore } from '@/hooks/useStore';
import { findWeatherData } from '@/utilities/findWeatherData';
// Types
import {
  LiftsOverall,
  ResortInfo,
  RoadCondition,
  SnowData,
  TrailsOverall,
  WeatherInfo,
} from '@/components/Weather/conditionTypes';
// Components
import { CurrentConditionsFlyout } from '../CurrentConditionsFlyout';
// Styles
import styles from './navConditionsStyles.module.css';

export function NavConditions({
  currentWeather,
  currentSnow,
  roadsData,
  trailsOverall,
  liftsOverall,
}: {
  currentWeather: WeatherInfo;
  currentSnow: SnowData;
  roadsData: RoadCondition[];
  trailsOverall: TrailsOverall;
  liftsOverall: LiftsOverall;
}) {
  const [unitSystem] = useStore((state: any) => [state.unitSystem]);

  const temperature = currentWeather?.current?.temperature;
  const freshSnowFallDepth48H = currentSnow?.freshSnowFallDepth48H;
  const skyStatus = currentWeather?.current?.skyStatus;

  const snowfall48H =
    unitSystem === 'SI'
      ? `${Math.ceil(freshSnowFallDepth48H?.value ?? 0)} cm`
      : `${Math.ceil(freshSnowFallDepth48H?.countryValue ?? 0)}"`;

  const snowfall48HA11y =
    unitSystem === 'SI'
      ? `${Math.ceil(freshSnowFallDepth48H?.value ?? 0)} centimeter`
      : `${Math.ceil(freshSnowFallDepth48H?.countryValue ?? 0)} inches`;

  const currentTemp =
    unitSystem === 'SI'
      ? `${Math.ceil(temperature?.value)}\u00B0C`
      : `${Math.ceil(temperature?.countryValue)}\u00B0F`;

  const skyStatusData = findWeatherData(skyStatus);

  if (!isEmpty(currentWeather)) {
    return (
      <NavigationMenu.Item className={styles.NavigationConditions}>
        <NavigationMenu.Trigger className="NavigationMenuTrigger">
          <div className={styles.navItem}>
            {freshSnowFallDepth48H && (
              <>
                <span aria-hidden={true}>
                  <span>{snowfall48H}</span> <span>&frasl;</span>{' '}
                  <span>48Hrs</span>
                </span>
                <span className="visually-hidden">
                  {`${snowfall48HA11y} of snowfall in the last 48 hours`}
                </span>
              </>
            )}
            {temperature && (
              <>
                <span className="visually-hidden">{`${skyStatusData?.text} and ${currentTemp}`}</span>
                <span aria-hidden={true}>{skyStatusData.icon}</span>
                <span aria-hidden={true}>{currentTemp}</span>
              </>
            )}
          </div>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="NavigationMenuContent WithConditions">
          <CurrentConditionsFlyout
            data={currentWeather}
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
