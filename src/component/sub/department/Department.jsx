import React from "react";
import styles from "../department/Department.module.scss";
import Layout from "../../common/layout/Layout";

const Department = () => {
  return (
    <Layout title={"Department"} styleName={styles.content}>
      <p>department 페이지 입니다.</p>
    </Layout>
  );
};

export default Department;
