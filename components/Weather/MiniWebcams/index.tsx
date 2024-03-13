import styles from "./miniWebcams.module.css";

import Loading from "@/components/Loading";

export function MiniWebcams({ webcams }: { webcams: any }) {
  if (webcams) {
    return (
      <div className={styles.miniWebcams}>
        <div className={styles.items} aria-label={`${webcams.length} Webcams`}>
          {webcams?.map((item: any, index: number) => (
            <div
              className={styles.item}
              key={item.id}
              tabIndex={0}
              aria-label={`Webcam number ${index + 1}`}
              role="img"
            >
              {/* eslint-disable-next-line */}
              <img src={item.urls[0].url} alt="" />
              <Loading />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <></>;
}
