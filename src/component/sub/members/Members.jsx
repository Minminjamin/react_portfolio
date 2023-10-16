import React from "react";
import Layout from "../../common/layout/Layout";

const Members = () => {
  return (
    <Layout title={"Members"}>
      <form>
        <fieldset>
          <legend>회원가입 폼 양식</legend>
          <table>
            <tbody border="1">
              {/* userid */}
              <tr>
                <th scope="row">
                  <label htmlFor="userid">user id</label>
                </th>
                <td>
                  <input type="text" id="userid" name="userid" />
                </td>
              </tr>

              {/* password */}
              <tr>
                <th scope="row">
                  <label htmlFor="pwd1">password</label>
                </th>
                <td>
                  <input type="password" id="pwd1" name="pwd1" />
                </td>
              </tr>

              {/*re password */}
              <tr>
                <th scope="row">
                  <label htmlFor="pwd1">re-password</label>
                </th>
                <td>
                  <input type="password" id="pwd2" name="pwd2" />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
};

export default Members;
