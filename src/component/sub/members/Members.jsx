import React from "react";
import Layout from "../../common/layout/Layout";
import "./Members.scss";
import { useState } from "react";

const Members = () => {
  const initval = {
    userid: "",
    pw1: "",
    pw2: "",
    email: "",
  };

  const [val, setVal] = useState(initval);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(val);
    setVal({ ...val, [name]: value });
  };

  return (
    <Layout title={"Members"}>
      <form>
        <fieldset>
          <legend>회원가입 폼 양식</legend>
          <table border="1">
            <tbody>
              {/* userid */}
              <tr>
                <th scope="row">
                  <label htmlFor="userid">user id</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="userid"
                    name="userid"
                    value={val.userid}
                    onChange={onHandleChange}
                  />
                </td>
              </tr>

              {/* password */}
              <tr>
                <th scope="row">
                  <label htmlFor="pwd1">password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pwd1"
                    name="pwd1"
                    value={val.pw1}
                    onChange={onHandleChange}
                  />
                </td>
              </tr>

              {/*re password */}
              <tr>
                <th scope="row">
                  <label htmlFor="pwd1">re-password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pwd2"
                    name="pwd2"
                    value={val.pw2}
                    onChange={onHandleChange}
                  />
                </td>
              </tr>

              {/* e-mail */}
              <tr>
                <th scope="row">
                  <label htmlFor="email">email</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={val.email}
                    onChange={onHandleChange}
                  />
                </td>
              </tr>
              {/* btnSet */}
              <tr>
                <th colSpan="2">
                  <input type="reset" value="cancel" />
                  <input type="submit" value="send" />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
};

export default Members;
