"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
// Components & Icons
import { StatusIcon, Closed } from "@/components/Icons";
// Styles
import styles from "./roadConditionsKeyStyles.module.css";

export function RoadConditionsKey() {
  const statusKeyData = [
    {
      icon: <StatusIcon fill="#008500" />,
      text: "Dry Road. Any passenger vehicles can access.",
    },
    {
      icon: <StatusIcon fill="#FFD056" />,
      text: "Wet, icy or snowy road. Passenger vehicles should be outfitted with snow tires and all-wheel drive capabilities.",
    },
    {
      icon: <StatusIcon fill="#DA2F20" />,
      text: "Snowy Road. Passenger vehicles are required to have 4-wheel drive with snow tires and/or chains.",
    },
    {
      icon: <Closed />,
      text: "Road is CLOSED.",
    },
  ];
  return (
    <>
      <div className={styles.roadKeyContainer}>
        <Accordion.Root
          className={styles.accordionRoot}
          type="single"
          collapsible
          aria-label="Road Conditions Key"
        >
          <Accordion.Item
            className={styles.accordionItem}
            value={"roadConditions"}
          >
            <Accordion.Header className={styles.accordionHeader}>
              <Accordion.Trigger className={styles.accordionTrigger}>
                <div className={styles.triggerName}>Road Conditions Key</div>

                <div className={styles.chevContainer}>
                  <ChevronDownIcon
                    className={styles.accordionChevron}
                    aria-hidden
                  />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className={styles.accordionContent}>
              {statusKeyData.map((item) => (
                <div key={item.text} className={styles.statusKeyRow}>
                  <div className={styles.iconContainer}>{item.icon}</div>
                  <div className={styles.keyText}>{item.text}</div>
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
}
