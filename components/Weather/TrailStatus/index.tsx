"use client";

// Packages & Libraries
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useMediaQuery, useIsClient } from "@uidotdev/usehooks";
// Hooks & Utilities
import { findLiftData } from "@/utilities/findLiftData";
import { sectorOpeningStatus } from "@/utilities/sectorOpeningStatus";
import useScrollTo from "@/hooks/useScrollTo";
// Types
import { Sector } from "@/components/Weather/conditionTypes";
// Components & Icons
import { Card } from "../Card";
import { Intermediate, Beginner, Advanced, Expert } from "@/components/Icons";
// Styles
import sharedStyles from "../sharedWeatherStyles.module.css";
import styles from "./trailStatus.module.css";

function renderIcon(skillLevel: string) {
  const skillIcons: Record<string, JSX.Element> = {
    GREEN_CIRCLE: <Beginner />,
    BLUE_SQUARE: <Intermediate />,
    BLACK_DIAMOND: <Advanced />,
    BLACK: <Advanced />,
    DOUBLE_BLACK_DIAMOND: <Expert />,
  };

  return skillIcons[skillLevel] || "";
}

function renderTrailLevelTitle(skillLevel: string) {
  const levelTitle: Record<string, string> = {
    GREEN_CIRCLE: "Beginner",
    BLUE_SQUARE: "Intermediate",
    BLACK_DIAMOND: "Advanced",
    BLACK: "Advanced",
    DOUBLE_BLACK_DIAMOND: "Expert",
  };

  return levelTitle[skillLevel] || "";
}

const AccordionItem = ({ sector }: { sector: Sector }) => {
  const [ref, scrollTo] = useScrollTo<HTMLDivElement>();

  const matchesMd = useMediaQuery("(min-width: 960px)");

  const handleScrollTo = (): any => {
    if (!matchesMd) {
      setTimeout(() => {
        scrollTo(true);
      }, 400);
    }
  };

  const liftType = sector.lifts
    ? findLiftData(sector.lifts[0].liftType, sector.lifts[0].capacity.value)
        .name
    : "Adventure Terrain";

  const openingStatus = sectorOpeningStatus(sector.trails);
  return (
    <Accordion.Item
      aria-label={`${sector.name}: ${liftType} - ${openingStatus}`}
      className={styles.accordionItem}
      value={sector.id}
      ref={ref}
    >
      <Accordion.Header className={styles.accordionHeader}>
        <Accordion.Trigger
          className={styles.accordionTrigger}
          onClick={handleScrollTo}
        >
          <div className={styles.triggerName}>{sector.name}</div>
          <div className={styles.rightCol}>
            <div className={styles.triggerLiftType}>{liftType}</div>
            <div
              className={classNames(
                styles.triggerOpenStatus,
                styles[`trail${openingStatus}`]
              )}
            >
              {openingStatus}
            </div>
          </div>

          <div className={styles.chevContainer}>
            <ChevronDownIcon className={styles.accordionChevron} aria-hidden />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={styles.accordionContent}>
        <div className={styles.gridContainer}>
          {sector.trails?.map((trail) => {
            return (
              <div key={trail.name} className={styles.trailRow}>
                <div className={styles.rowLeft}>
                  <div
                    className={styles.difficultyIcon}
                    title={renderTrailLevelTitle(trail.trailLevel)}
                  >
                    {renderIcon(trail.trailLevel)}
                  </div>
                  <div className={styles.trailName}>{trail.name}</div>
                </div>
                <div
                  className={classNames(
                    styles.trailStatus,
                    styles[`trail${trail.openingStatus}`]
                  )}
                >
                  {trail.openingStatus}
                </div>
              </div>
            );
          })}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export function TrailStatus({ sectorsData }: { sectorsData?: Sector[] }) {
  const isClient = useIsClient();
  // Prevents build errors
  // ref: https://github.com/uidotdev/usehooks/issues/218#issuecomment-1681205155
  if (isClient === false) {
    return null;
  }

  return (
    <>
      <Card title="Trail Status" subTitle="">
        <div className={classNames(sharedStyles.section, styles.gridContainer)}>
          <Accordion.Root
            aria-label="Lifts"
            className={styles.accordionRoot}
            type="single"
            collapsible
          >
            {sectorsData?.map((sector: Sector) => (
              <AccordionItem key={sector.id} sector={sector} />
            ))}
          </Accordion.Root>
        </div>
      </Card>
    </>
  );
}
