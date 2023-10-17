import React, { useState, useEffect } from "react";
import "./Department.scss";
import Layout from "../../common/layout/Layout";

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
    <Layout title={"Department"}>
      <h2>Team</h2>
      <div className="line"></div>
      <div className="memberBox">
        {department.map((member, index) => (
          <article key={index}>
            <h3>{member.name}</h3>
            {/* <div className={line}></div> */}
            <div className="pic">
              <img src={`${path}/img/${member.pic}`} alt={member.name} />
            </div>
            <h4>{member.position}</h4>
            <p>
              <b>Email:</b> <a href={`mailto:${member.mail}`}>{member.mail}</a>
            </p>
            <p>
              <b>Phone :</b> {member.phone}
            </p>
          </article>
        ))}
      </div>

      <h2>About</h2>
      <div className="line"></div>
      <article className="aboutBox">
        <div className="pic">
          <>
            <img src={`${path}/img/department01.jpg`} alt="bird" />
          </>
        </div>
        <div className="text">
          <h3>Philosophy</h3>
          {/* <div className={innerText}> */}
          <h4>
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            tempore quibusdam odio! Eius esse adipisci possimus voluptatem eos
            laboriosam doloribus!"
          </h4>
          {/* </div> */}

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
