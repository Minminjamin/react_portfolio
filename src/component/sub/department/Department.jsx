import React, { useState, useEffect } from "react";
import "./Department.scss";
import Layout from "../../common/layout/Layout";
import SubTittle from "../../common/subTittle/SubTittle";

const path = process.env.PUBLIC_URL;

const Department = () => {
  const [department, setDepartment] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${path}/DB/department.json`)
      .then((data) => data.json())
      .then((json) => setDepartment(json.members));

    fetch(`${path}/DB/history.json`)
      .then((data) => data.json())
      .then((json) => setHistory(json.history));
  }, []);

  return (
    <Layout title={"Department"}>
      <SubTittle description={"OUR PEOPLE"} title={"Our world-class team"} />

      <div className="memberBox">
        {department.map((member, index) => (
          <article key={index}>
            <div className="pic">
              <img src={`${path}/img/${member.pic}`} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <div className="line"></div>
            <p>
              <a href={`mailto:${member.mail}`}>{member.mail}</a>
            </p>
            <p>{member.phone}</p>
          </article>
        ))}
      </div>

      <div className="topTxt">
        <p>ABOUT OUR COMPANY</p>
        <h2>About</h2>
      </div>
      <article className="aboutBox">
        <div className="pic">
          <>
            <img src={`${path}/img/department01.jpg`} alt="bird" />
          </>
        </div>
        <div className="text">
          <h3>Philosophy</h3>
          <h4>
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            tempore quibusdam odio! Eius esse adipisci possimus voluptatem eos
            laboriosam doloribus!"
          </h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
            quibusdam cupiditate et eveniet corporis, tempora adipisci ducimus
            perferendis qui obcaecati quas modi totam blanditiis, earum ut
            accusantium? Sunt totam ab modi expedita rem iusto quaerat ipsa
            architecto. Saepe, quibusdam molestias quidem, nihil voluptatibus
            culpa dolorem quo quae tenetur commodi, soluta nesciunt optio
            debitis aut reprehenderit nisi blanditiis sapiente esse veniam!
            Quod, ullam. Nam accusantium quisquam corporis sed aliquid dolore
            quia officiis aliquam consequuntur quibusdam similique ut, culpa
            reiciendis. Quos, consequatur. Quod quaerat nostrum voluptatem fuga
            voluptatibus commodi asperiores dignissimos voluptatum, blanditiis
            itaque animi nulla harum et sit cumque aperiam culpa?
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default Department;

/*
## 정적인 data에 fetch를 쓴 이유

- 정적인 data라서 굳이 fetch를 쓰지 않아도 됨
    - fetch를 쓰지 않고 static하게 컨텐츠를 집어넣을까 함
- 다만 데이터 기반으로 모든 화면단이 동적으로 생성되게 하고 싶어서 fetch를 통해 데이터가 변경되더라도 자동으로 화면이 갱신되도록 작업을 함.
 */
