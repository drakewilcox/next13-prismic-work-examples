import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <svg className={styles.loader} viewBox="25 25 50 50" strokeWidth="3">
        <circle cx="50" cy="50" r="20" />
      </svg>
      <svg className={styles.background} viewBox="25 25 50 50" strokeWidth="3">
        <circle cx="50" cy="50" r="20" />
      </svg>
    </div>
  );
};

export default Loading;
