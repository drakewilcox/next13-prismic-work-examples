"use client";
import classNames from "classnames";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import styles from "./liveFeedStyles.module.css";

export function LiveFeed({ data }: { data: any }) {
  const webcams = data?.content?.resorts[0]?.webcams ?? [];

  if (webcams.length) {
    return (
      <div
        id={"live-feed"}
        aria-labelledby={`live-feed-label`}
        aria-describedby={`live-feed-subtitle`}
        className={classNames([styles.card])}
      >
        <div className={classNames([styles.cardHeader])}>
          <h2
            id={`live-feed-label`}
            className={classNames([styles.cardHeaderTitle])}
          >
            Live Feed
          </h2>
        </div>
        <div className={classNames([styles.cardBody])}>
          {webcams.map((item: any) => (
            <div className={styles.item} key={item.id}>
              {/* eslint-disable-next-line */}
              <img src={item.urls[0].url} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <></>;
}
