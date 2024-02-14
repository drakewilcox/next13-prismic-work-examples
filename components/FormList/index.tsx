"use client";
//types
import { FormData } from "../Form/hubspotFormTypes";
// Styles
import styles from "./formList.module.css";
import classNames from "classnames";

export function FormList({ formList }: { formList: FormData[] }) {
  return (
    <div className="grid">
      <div className={classNames(styles.formListContainer, "feature")}>
        <div className={styles.listTitle}>Available Forms:</div>
        {formList?.map((form) => (
          <div key={form.name} className={styles.formItem}>
            <div className={styles.name}>{form.name}:</div>
            <div className={styles.id}>{form.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
