import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Viewport } from 'next';
import Script from 'next/script';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName, createClient } from '@/prismicio';
import type { Content } from '@prismicio/client';

import { SkipToContent } from '@/components/SkipToContent';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PodiumChatManager } from '@/components/PodiumChatManager';

import {
  fetchSnowReport,
  fetchResortAccessService,
  fetchPOIOverall,
  fetchWebcamService,
  fetchOSForecast,
  CurrentTime,
} from '@/app/(main)/conditions/actions';

import {
  RoadCondition,
  SnowData,
  LiftsOverall,
  TrailsOverall,
  Webcams,
} from '@/components/Weather/conditionTypes';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const metadata = await client
    .getSingle<Content.MetadataDocument>('metadata')
    .catch(() => {});

  return {
    metadataBase: new URL('https://powdermountain.vercel.app'),
    title: {
      template: `%s – ${metadata?.data?.meta_title}`,
      default: 'Powder Mountain – Uncrowded by Design',
    },
    description: metadata?.data?.meta_description,
    openGraph: {
      images: [metadata?.data?.meta_image?.url || ''],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: 'black',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();

  const menuData = (await client
    .getSingle<Content.MenuDocument>('menu', {
      graphQuery: `
    {
      menu {
        button_link
        button_label
        slices {
          ...on menu_item {
            variation {
              ...on withSubmenu {
                primary {
                  label
                  submenu {
                    description
                    slices {
                      ...on submenu_item {
                        variation {
                          ...on default {
                            primary {
                              label
                              link
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    })
    .catch(() => {})) as any;
  const footerData = (await client
    .getSingle<Content.FooterDocument>('footer')
    .catch(() => {})) as any;
  const snow = await fetchSnowReport();
  const poiOverall = await fetchPOIOverall();
  const roads = await fetchResortAccessService();
  const webcams = await fetchWebcamService();
  const forecastImperial = fetchOSForecast('imperial');
  const forecastMetric = fetchOSForecast('metric');
  const currentSnow: SnowData = snow?.content.snowZones[0];
  const roadsData: RoadCondition[] = roads?.content.resorts[0].roadConditions;
  const liftsOverall: LiftsOverall =
    poiOverall?.content?.overalls[0].liftsOverall;
  const trailsOverall: TrailsOverall =
    poiOverall?.content?.overalls[0].trailsOverall;

  const webCamsData: Webcams[] = webcams?.content.resorts[0]?.webcams;
  const openSnowConditionsData = await Promise.allSettled([
    forecastImperial,
    forecastMetric,
  ]).then((results: any) => {
    const [forecastImperial, forecastMetric] = results;

    return {
      forecastImperial: forecastImperial.value,
      forecastMetric: forecastMetric.value,
    };
  });

  const conditionsData = await Promise.allSettled([
    currentSnow,
    roadsData,
    liftsOverall,
    trailsOverall,
    webCamsData,
  ]).then((results: any) => {
    const [currentSnow, roadsData, liftsOverall, trailsOverall, webCamsData] =
      results;

    return {
      currentSnow: currentSnow.value,
      roadsData: roadsData.value,
      liftsOverall: liftsOverall.value,
      trailsOverall: trailsOverall.value,
      webcams: webCamsData.value,
    };
  });

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-N8ZW7Z4" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-N8ZW7Z4');
        `}
      </Script>
      <SkipToContent />
      <Header
        menuData={menuData}
        conditionsData={conditionsData}
        openSnowData={openSnowConditionsData}
      />
      {children}
      <Footer footerData={footerData} />
      <div className="preventTransparency" />
      <PrismicPreview repositoryName={repositoryName} />
      <PodiumChatManager />
    </>
  );
}
