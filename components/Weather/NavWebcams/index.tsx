import styles from "./navWebcams.module.css";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import Loading from "@/components/Loading";
import { Webcams } from "@/components/Icons";

export function NavWebcams({ webcams }: { webcams: any }) {
  if (webcams) {
    return (
      <NavigationMenu.Item className={styles.navigationWebcams}>
        <NavigationMenu.Trigger className="NavigationMenuTrigger">
          <div className={styles.navItem}>
            <span>Webcams</span>
            <Webcams />
          </div>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="NavigationMenuContent">
          <div
            className={styles.items}
            aria-label={`${webcams.length} Powder Mountain Webcams`}
          >
            {webcams?.map((item: any, index: number) => (
              <div
                className={styles.item}
                key={item.id}
                tabIndex={0}
                aria-label={`Powder Mountain Webcam number ${index + 1}`}
                role="img"
              >
                {/* eslint-disable-next-line */}
                <img src={item.urls[0].url} alt="" />
                <Loading />
              </div>
            ))}
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    );
  }
  return <></>;
}
