import React, { useRef, useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import styles from "../contact/Contact.scss";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const instance = useRef(null);
  const map = useRef(null);
  const view = useRef(null);
  const form = useRef(null);

  const [traffic, setTraffic] = useState(false);
  const [index, setIndex] = useState(0);
  const [isMap, setIsMap] = useState(true);

  // kakao API를 cdn 방식으로 불러오고 있기에 React 컴포넌트가 실행되면 window 객체에서 직접 비구조화 활당으로 kakako 객체를 뽑아옴
  const { kakao } = window;

  //  지도 정보 데이터를 객체 형식으로 구조화한 다음에 데이터 기반으로 자동 지도화면이 생성되도록 만듬
  // 데이터 정보가 많아질 때를 대비해 유지보수에 최적화 되도록 코드 개선
  //  이 정보값은 자주 정보값이 자주 바뀌지 않기에 굳이 state에 담아서 불필요한 제렌더링을 막기 위해서 ref에 담음
  const info = useRef([
    {
      title: "경남로봇고등학교",
      latlng: new kakao.maps.LatLng(35.34831491821686, 128.43883312404466),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "에이블런",
      latlng: new kakao.maps.LatLng(37.585, 126.8854),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "김해 시청",
      latlng: new kakao.maps.LatLng(35.22859521186741, 128.88929749274934),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ]);

  // 위의 정보값을 활용한 마커 객체 생성
  const marker = new kakao.maps.Marker({
    position: info.current[index].latlng,
    image: new kakao.maps.MarkerImage(
      info.current[index].imgSrc,
      info.current[index].imgSize,
      info.current[index].imgPos
    ),
  });

  // 지도 위치를 중심으로 이동시키는

  const setCenter = () => {
    instance.current.setCenter(info.current[index].latlng);
  };

  useEffect(() => {
    //Index값이 변경될때마다 새로운 지도 레이어가 중첩되므로
    //일단은 기존 map안의 모든 요소를 없애서 초기화
    map.current.innerHTML = "";

    // 객체 정보를 활용한 지도 객체 생성
    instance.current = new kakao.maps.Map(map.current, {
      center: info.current[index].latlng,
      level: 1,
    });
    marker.setMap(instance.current);

    // 지도 타입 변경 UI 추가
    const mapTypeControl = new kakao.maps.MapTypeControl();
    instance.current.addControl(
      mapTypeControl,
      kakao.maps.ControlPosition.BOTTOMLEFT
    );

    // 지도 생성 시 마커 고정적으로 적용되기에 브라우저 리사이즈시 마커가 가운데 위치하지 않는 문제
    // 마커를 가운데 고정하는 함수를 제작한 뒤 우니도우 객체 직접 resize 이벤트 발생시마다 핸들러함수 호출해서 마커 위치 보정

    // contact 페이지에만 동작되야 되는 핸들러 함수를 최상위 객체인 window에 직접 연결했기에 라우터로 다른 페이지 이동하더라도 계속해서 setCenter 호출되는 문제점 방법
    // 해결 : Contact 컴포넌트가 언마툰트시 강제로 윈도우 객체에서 setCenter 함수 제거
    window.addEventListener("resize", setCenter);

    // 로드뷰 관련 코드
    new kakao.maps.RoadviewClient().getNearestPanoId(
      info.current[index].latlng,
      50,
      (panoId) => {
        new kakao.maps.Roadview(view.current).setPanoId(
          panoId,
          info.current[index].latlng
        ); //panoId와 중심좌표를 통해 로드뷰 실행
      }
    );

    return () => {
      window.removeEventListener("resize", setCenter);
    };
  }, [index]); // //Index값이 변경될때마다 지도화면이 다시 갱신되어야 하므로 Index값을 의존성 배열에 등록ㄴ

  const resetForm = () => {
    const nameForm = form.current.querySelector(".nameEl");
    const mailForm = form.current.querySelector(".emailEl");
    const msgForm = form.current.querySelector(".msgEl");

    nameForm.value = "";
    mailForm.value = "";
    msgForm.value = "";
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const nameForm = form.current.querySelector(".nameEl");
    const mailForm = form.current.querySelector(".emailEl");
    const msgForm = form.current.querySelector(".msgEl");

    if (!nameForm.value || !mailForm.value || !msgForm.value)
      return alert("사용자 이름, 이메일 주소, 문의내용은 필수입력 사항입니다.");

    emailjs
      .sendForm(
        `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
        `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`,
        form.current,
        `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          alert("문의내용이 메일로 발송되었습니다.");
          console.log(result);
          resetForm();
        },
        (error) => {
          alert("문의내용 전송에 실패했습니다. ");
          console.log(error);
        }
      );
  };

  useEffect(() => {
    // traffic 값이 바뀔 떄마다 실행
    traffic
      ? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
      : instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  }, [traffic]);

  return (
    <Layout title={"Contact"} styleName={styles.contact}>
      <h2>Contact Me</h2>
      <div className="contactMe">
        <form ref={form} onSubmit={sendEmail}>
          <div className="upper">
            <label>Name</label>
            <input type="text" name="user_name" className="nameEl" />
            <label>Email</label>
            <input type="email" name="user_email" className="emailEl" />
          </div>
          <div className="lower">
            <label>Message</label>
            <textarea name="message" className="msgEl" />
          </div>
          <div className="btnSet">
            <input type="reset" value="Cancel" />
            <input type="submit" value="Send" />
          </div>
        </form>

        <div className="contactInfo">
          <span>Phone</span>
          <span>010-1234-5678</span>
          <span>Email</span>
          <span>0429el@gmail.com</span>
          <span>School Address</span>
          <span>경상남도 함안군 대산면 대산중앙로 102-2 (평림리)</span>
        </div>
      </div>

      {/* 데이터 기반으로 자동 버튼 생성 및 자동 이벤트 연결 처리 */}
      <div className="mapBox">
        <div className="upperBtn">
          <button
            onClick={() => {
              setTraffic(!traffic);
            }}
          >
            {traffic ? "교통정보 끄기" : "교통정보 켜기"}
          </button>
          <button onClick={setCenter}>지도 위치 초기화</button>
          <button onClick={() => setIsMap(!isMap)}>
            {isMap ? "로드뷰보기" : "지도보기"}
          </button>
        </div>

        <div className="container">
          <div className={`view ${isMap ? " " : "on"}`} ref={view}></div>
          <div className={`map ${isMap ? "on" : " "}`} ref={map}></div>
        </div>
        <ul>
          {info.current.map((data, idx) => (
            <li
              key={idx}
              onClick={() => {
                setIndex(idx);
                setIsMap(true);
              }}
              className={index === idx ? "on" : ""}
            >
              {data.title}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Contact;
