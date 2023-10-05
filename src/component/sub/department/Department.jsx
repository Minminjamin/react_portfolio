import React, { useState, useEffect } from "react";
import styles from "../department/Department.module.scss";
import Layout from "../../common/layout/Layout";
import clsx from "clsx";

const path = process.env.PUBLIC_URL;

const Department = () => {
  const [department, setDepartment] = useState([]);
  const [history, setHistory] = useState([]);

  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    fetch(`${path}/DB/department.json`)
      .then((data) => data.json())
      .then((json) => setDepartment(json.members));

    fetch(`${path}/DB/history.json`)
      .then((data) => data.json())
      .then((json) => setHistory(json.history));
  }, []);

  useEffect(() => {
    console.log(history);
  }, [history]);

  return (
    <Layout title={"Department"} styleName={styles.department}>
      <h2 className={styles.title}>Our History</h2>
      <div className={styles.historyBox}>
        {[...history].reverse().map((item, index) => (
          <article key={index}>
            {/* 일단 json의 key에 접근(2016, 2018) */}

            <div className={styles.inner}>
              <h3>{Object.keys(item)}</h3>
              <ul>
                {Object.values(item).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {/* 그리고 나서 json 키의 value에 접근해서 value의 값을 하나하나 뽑아냄 */}
            {/* Object.values(item)이라는 것은 item에 담긴 값을 추출하는 것 */}
          </article>
        ))}
      </div>

      <h2>Members</h2>
      <div className={styles.memberBox}>
        {department.map((member, index) => (
          <article key={index}>
            <div className={styles.pic}>
              <img src={`${path}/img/${member.pic}`} alt={member.name} />
              <div className={styles.imgInnerText}>
                <h3>{member.name}</h3>
                <span>{member.position}</span>
              </div>
            </div>
            {/* 
            <div className={styles.text}>
              <span>{member.position}</span>
            </div> */}
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default Department;
