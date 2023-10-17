import React from "react";
import Layout from "../../common/layout/Layout";
import "./Members.scss";
import { useState, useRef } from "react";
import { AiFillNotification } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";

const Members = () => {
  const initval = {
    userId: "",
    pw1: "",
    pw2: "",
    email: "",
    gender: false,
    interests: false,
    edu: "",
    comments: "",
  };

  const [val, setVal] = useState(initval);
  const [errs, setErrs] = useState();

  const refCheckGroup = useRef(null);
  const refRadioGroup = useRef(null);
  const refSelGroup = useRef(null);

  const resetForm = (e) => {
    e.preventDefault();

    setVal(initval);
    [refCheckGroup, refRadioGroup].forEach((item) =>
      item.current
        .querySelectorAll("input")
        .forEach((input) => (input.checked = false))
    );

    refSelGroup.current.value = "";
  };

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

    if (!value.gender) {
      checkeErrs.gender = "성별은 필수 체크항목입니다.";
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
      <h2>
        Welcome to our website. Give me your brief information for membership
        registration.
      </h2>

      <content>
        <div className="leftBox">
          <form onSubmit={onHanldeSubmit}>
            <fieldset>
              <legend>
                <h3>회원가입</h3>
              </legend>
              <table border="1">
                <tbody>
                  {/* userId */}
                  <tr>
                    <th scope="row">
                      <label htmlFor="userId">User id</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={val.userId}
                        onChange={onHandleChange}
                        placeholder="아이디를 입력해주세요."
                      />
                      {errs?.userId && <p>{errs?.userId}</p>}
                    </td>
                  </tr>

                  {/* password */}
                  <tr>
                    <th scope="row">
                      <label htmlFor="pw1">Password</label>
                    </th>
                    <td>
                      <input
                        type="password"
                        id="pw1"
                        name="pw1"
                        value={val.pw1}
                        onChange={onHandleChange}
                        placeholder="비밀번호를 입력해주세요."
                      />
                      {errs?.pw1 && <p>{errs?.pw1}</p>}
                    </td>
                  </tr>

                  {/*re password */}
                  <tr>
                    <th scope="row">
                      <label htmlFor="pw2">Re-Password</label>
                    </th>
                    <td>
                      <input
                        type="password"
                        id="pw2"
                        name="pw2"
                        value={val.pw2}
                        onChange={onHandleChange}
                        placeholder="비밀번호를 다시 한 번 입력해주세요."
                      />
                      {errs?.pw2 && <p>{errs?.pw2}</p>}
                    </td>
                  </tr>

                  {/* e-mail */}
                  <tr>
                    <th scope="row">
                      <label htmlFor="email">E-mail</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={val.email}
                        onChange={onHandleChange}
                        placeholder="E-mail을 입력해주세요."
                      />
                      {errs?.email && <p>{errs?.email}</p>}
                    </td>
                  </tr>

                  {/* gender */}
                  <tr>
                    <th scope="row">
                      <label htmlFor="gender">Gender</label>
                    </th>
                    <td useRef={refRadioGroup}>
                      <label htmlFor="female">Female</label>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        onChange={onHanldeRadio}
                      />

                      <label htmlFor="female">Male</label>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        onChange={onHanldeRadio}
                      />
                      {errs?.gender && <p>{errs?.gender}</p>}
                    </td>
                  </tr>

                  {/* interest */}
                  <tr>
                    <th scope="row">
                      <label htmlFor="interests">Interests</label>
                    </th>
                    <td useRef={refCheckGroup}>
                      <label htmlFor="sports">Sports</label>
                      <input
                        type="checkbox"
                        id="sport"
                        name="interests"
                        onChange={onHandleCheck}
                      />

                      <label htmlFor="sports">Music</label>
                      <input
                        type="checkbox"
                        id="misuc"
                        name="interests"
                        onChange={onHandleCheck}
                      />

                      <label htmlFor="sports">Game</label>
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
                    <td useRef={refSelGroup}>
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
                      <label htmlFor="comments">Comments</label>
                    </th>
                    <td>
                      <textarea
                        name="comments"
                        id=""
                        cols="30"
                        rows="3"
                        value={val.comments}
                        placeholder="남기는 말을 써주세요."
                        onChange={onHandleChange}
                      ></textarea>
                      {errs?.comments && <p>{errs?.comments}</p>}
                    </td>
                  </tr>

                  {/* btnSet */}
                  <tr className="btnSet">
                    <th colSpan="2">
                      <input type="reset" value="cancel" onClick={resetForm} />
                      <input type="submit" value="send" />
                    </th>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
        </div>
        <div className="rightBox">
          <div className="inner">
            <h3>Volutpat odio facilisis</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad quis
              at quaerat veritatis doloremque. In ipsa et cumque non ducimus?
            </p>

            <article>
              <div className="con">
                <AiFillNotification fontSize={44} />
                <div className="txt">
                  <h4>Nisl tincidunt eget nullam non. </h4>
                  <p>
                    Non tellus orci ac auctor augue. Elit at imperdiet dui
                    accumsan sit. Ornare arcu dui vivamus arcu felis.
                  </p>
                </div>
              </div>
              <div className="con">
                <BsPeopleFill fontSize={33} />
                <div className="txt">
                  <h4>Ut sem nulla pharetra diam.</h4>
                  <p>Bibendum neque egestas congue quisque egestas diam.</p>
                </div>
              </div>
              <div className="con">
                <BiSolidPhoneCall fontSize={33} />
                <div className="txt">
                  <h4> Quis hendrerit dolor.</h4>
                  <p>Pulvinar elementum integer enim neque volutpat ac.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </content>
    </Layout>
  );
};

export default Members;
