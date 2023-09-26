import React from "react";
import clsx from "clsx";
import styles from "../department/Department.module.scss";

const Department = () => {
  return (
    <section className={clsx(styles.department)}>
      <figure></figure>

      <div className={clsx(styles.content)}>
        <h1>Department</h1>
      </div>
    </section>
  );
};

export default Department;
