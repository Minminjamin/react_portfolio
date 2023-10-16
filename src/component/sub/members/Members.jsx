import React from "react";
import Layout from "../../common/layout/Layout";
import "./Members.scss";
import { useState } from "react";

const Members = () => {
  const initval = {
    userId: "",
    pw1: "",
    pw2: "",
    email: "",
    genders: false,
    interests: false,
    edu: "",
    comments: "",
  };

  const [val, setVal] = useState(initval);
  const [errs, setErrs] = useState();

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    setVal({ ...val, [name]: value });
  };

  const onHanldeRadio = (e) => {
    const { name, checked } = e.target;
    setVal({ ...val, [name]: checked });
  };

  const onHandleCheck = (e) => {
    const { name } = e.target;
    let isChecked = false;
    const inputs = e.target.parentElement.querySelectorAll("input");

    inputs.forEach((input) => input.checked && (isChecked = true));

    setVal({ ...val, [name]: isChecked });
  };

  // 인수값으로 state를 전달받아서 각 데이터별로 인증처리 후 만약 인증 에러가 발생하면 해당 name 값으로 에러 문구를 생성해서 반환하는 함수
  const check = (value) => {
    const num = /[0-9]/;
    const txt = /[a-zA-Z]/;
    const spc = /[!@#$%^&*()_]/; //모든 특수 문자 지정
    const checkeErrs = {};

    if (value.userId.length < 5) {
      checkeErrs.userId = "아이디는 최소 5글자 이상 입력하세요.";
    }

    if (
      value.pw1 < 5 ||
      !num.test(value.pw1) ||
      !txt.test(value.pw1) ||
      !spc.test(value.pw1)
    ) {
      checkeErrs.pw1 =
        "비밀번호는 5글자 이상, 문자, 숫자, 특수문자를 모두 포함하세요.";
    }

    if (value.pw1 !== value.pw2) {
      checkeErrs.pw2 = "2개의 비밀번호를 같게 입력하세요.";
    }

    if (!value.email || !/@/.test(value.email)) {
      checkeErrs.email = "이메일은 무조건 @를 포함해야 합니다.";
    } else {
      const [forward, backwrad] = value.email.split("@");
      if (!forward || !backwrad) {
        checkeErrs.email = "이메일에 @앞뒤로 문자값이 있어야 됩니다.";
      } else {
        const [forward, backwrad] = value.email.split(".");
        if (!forward || !backwrad) {
          checkeErrs.email = "이메일 . 앞뒤로 문자값이 있어야 됩니다";
        }
      }
    }

    if (!value.genders) {
      checkeErrs.genders = "성별은 필수 체크항목입니다.";
    }

    if (!value.interests) {
      checkeErrs.interests = "관심사를 하나 이상 체크해주세요.";
    }

    if (!value.edu) {
      checkeErrs.edu = "학력을 선택하세요.";
    }

    if (value.comments.length < 10) {
      checkeErrs.comments = "남길 말은 10글자 이상 입력해주세요.";
    }
    return checkeErrs;
  };

  // 전송이벤트 발생시 state에 있는 input 값들을 check 함수에 전달해서 호출
  // 만약 check 함수가 에러 객체를 하나도 내보내지 않으면 인증성공
  // 하나라도 에러객체가 전달되면 인증실패 처리하면서 name값과 매칭이 되는 input 요소 아래쪽에 에러메세지 출력
  const onHanldeSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(check(val)).length === 0) {
      alert("인증 통과");
    } else {
      setErrs(check(val));
    }
  };

  return (
    <Layout title={"Members"}>
      <form onSubmit={onHanldeSubmit}>
        <fieldset>
          <legend>회원가입 폼 양식</legend>
          <table border="1">
            <tbody>
              {/* userId */}
              <tr>
                <th scope="row">
                  <label htmlFor="userId">user id</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={val.userId}
                    onChange={onHandleChange}
                  />
                  {errs?.userId && <p>{errs?.userId}</p>}
                </td>
              </tr>

              {/* password */}
              <tr>
                <th scope="row">
                  <label htmlFor="pw1">password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pw1"
                    name="pw1"
                    value={val.pw1}
                    onChange={onHandleChange}
                  />
                  {errs?.pw1 && <p>{errs?.pw1}</p>}
                </td>
              </tr>

              {/*re password */}
              <tr>
                <th scope="row">
                  <label htmlFor="pw2">re-password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pw2"
                    name="pw2"
                    value={val.pw2}
                    onChange={onHandleChange}
                  />
                  {errs?.pw2 && <p>{errs?.pw2}</p>}
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
                  {errs?.email && <p>{errs?.email}</p>}
                </td>
              </tr>

              {/* genders */}
              <tr>
                <th scope="row">
                  <label htmlFor="genders">genders</label>
                </th>
                <td>
                  <label htmlFor="female">female</label>
                  <input
                    type="radio"
                    id="female"
                    name="genders"
                    value={val.radio}
                    onChange={onHanldeRadio}
                  />

                  <label htmlFor="female">male</label>
                  <input
                    type="radio"
                    id="male"
                    name="genders"
                    value={val.radio}
                    onChange={onHanldeRadio}
                  />
                  {errs?.genders && <p>{errs?.genders}</p>}
                </td>
              </tr>

              {/* interest */}
              <tr>
                <th scope="row">
                  <label htmlFor="interests">Interests</label>
                </th>
                <td>
                  <label htmlFor="sports">sports</label>
                  <input
                    type="checkbox"
                    id="sport"
                    name="interests"
                    onChange={onHandleCheck}
                  />

                  <label htmlFor="sports">misic</label>
                  <input
                    type="checkbox"
                    id="misuc"
                    name="interests"
                    onChange={onHandleCheck}
                  />

                  <label htmlFor="sports">game</label>
                  <input
                    type="checkbox"
                    id="game"
                    name="interests"
                    onChange={onHandleCheck}
                  />
                  {errs?.interests && <p>{errs?.interests}</p>}
                </td>
              </tr>

              {/* Education */}
              <tr>
                <th scope="row">
                  <label htmlFor="edu">Education</label>
                </th>
                <td>
                  <select name="edu" id="edu" onChange={onHandleChange}>
                    <option value="">최종학력을 선택하세요.</option>
                    <option value="elementary-school">초등학교 졸업</option>
                    <option value="middle-school">중학교 졸업</option>
                    <option value="high-school">고등학교 졸업</option>
                    <option value="college">대학교 졸업</option>
                  </select>

                  {errs?.edu && <p>{errs?.edu}</p>}
                </td>
              </tr>

              {/* comments */}
              <tr>
                <th scope="row">
                  <label htmlFor="comments">comments</label>
                </th>
                <td>
                  <textarea
                    name="comments"
                    id=""
                    cols="30"
                    rows="3"
                    value={val.comments}
                    onChange={onHandleChange}
                  ></textarea>
                  {errs?.comments && <p>{errs?.comments}</p>}
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
