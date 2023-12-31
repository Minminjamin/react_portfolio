import React, { useRef, useEffect, useState, useCallback } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";
import emailjs from "@emailjs/browser";
import { PiParkBold } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiModernCity } from "react-icons/gi";

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
      pic: "PiParkBold",
      title: "망원한강공원",
      latlng: new kakao.maps.LatLng(37.555552791692904, 126.89473732590281),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
      address: "서울특별시 마포구 망원제1동 마포나루길 467",
      description: "맑은 강",
    },
    {
      pic: "HiOutlineBuildingOffice2",
      title: "DMC 첨단산업센터",
      latlng: new kakao.maps.LatLng(37.585, 126.8854),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
      address: "서울특별시 마포구 상암동 성암로 330",
      description: "마포구에 있는 회사",
    },
    {
      pic: "GiModernCity",
      title: "김해 시청",
      latlng: new kakao.maps.LatLng(35.22859521186741, 128.88929749274934),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
      address: "경상남도 김해시 김해대로 2401",
      description: "살아있는 문화재, 가야왕도 김해",
    },
  ]);

  // 지도 위치를 중심으로 이동시키는 핸들러 함수
  const setCenter = useCallback(() => {
    instance.current.setCenter(info.current[index].latlng);
  }, [index]);

  useEffect(() => {
    // 위의 정보값을 활용한 마커 객체 생성
    const marker = new kakao.maps.Marker({
      position: info.current[index].latlng,
      image: new kakao.maps.MarkerImage(
        info.current[index].imgSrc,
        info.current[index].imgSize,
        info.current[index].imgPos
      ),
    });

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
  }, [index, kakao, setCenter]); // //Index값이 변경될때마다 지도화면이 다시 갱신되어야 하므로 Index값을 의존성 배열에 등록ㄴ

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
  }, [traffic, kakao]);

  return (
    <Layout title={"Contact"} styleName="contact">
      <div className="contactMe">
        <form ref={form} onSubmit={sendEmail}>
          <h2>Contact Me</h2>
          <p>
            If you leave a post and click the Send button, the contents will be
            sent to my e-mail. If you want to communicate with me, please leave
            a message here.
          </p>

          <label htmlFor="Name">NAME</label>
          <input
            type="text"
            name="user_name"
            className="nameEl"
            placeholder="Enter your name"
          />
          <label htmlFor="E-Mail">E-MAIL</label>
          <input
            type="email"
            name="user_email"
            className="emailEl"
            placeholder="Enter your E-mail"
          />
          <label htmlFor="MESSAGE">MESSAGE</label>
          <textarea
            name="message"
            className="msgEl"
            placeholder="Hi there, I’m reaching out because I think we can collaborate…"
          />

          <div className="btnSet">
            <input type="reset" value="Cancel" />
            <input type="submit" value="Send" />
          </div>
        </form>
        <div className="contactInfo">
          <h3>OUR OFFICES</h3>
          <p>
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic.
          </p>
          <h3>OUR OFFICE</h3>
          <p>The moon, not the earth</p>
          <p>React-office, the seventh street of the moon</p>
          <h3>WORKING HOURS</h3>
          <p>9:00 ~ 18:00, Mon to Fri</p>
          <h3>CONTACT</h3>
          <p>
            <a href="mailto:0429el@gmail.con"> 0429el@gmail.com</a>
          </p>
          <p>011)-123-4567</p>
        </div>
      </div>

      {/* 데이터 기반으로 자동 버튼 생성 및 자동 이벤트 연결 처리 */}
      <div className="mapBox">
        <div className="mapInfo">
          {info.current.map((data, idx) => (
            <article
              key={idx}
              onClick={() => {
                setIndex(idx);
                setIsMap(true);
              }}
              className={index === idx ? "on" : ""}
            >
              <div className="pic">
                {data.pic === "PiParkBold" && <PiParkBold color="black" />}
                {data.pic === "HiOutlineBuildingOffice2" && (
                  <HiOutlineBuildingOffice2 color="black" />
                )}
                {data.pic === "GiModernCity" && <GiModernCity color="black" />}
              </div>

              <h4>{data.title}</h4>
              <p>{data.address}</p>
              <p>
                <b>{data.description}</b>
              </p>
            </article>
          ))}
        </div>
        <div className="container">
          <div className={`view ${isMap ? " " : "on"}`} ref={view}></div>
          <div className={`map ${isMap ? "on" : " "}`} ref={map}></div>
        </div>
        <div className="downBtn">
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
      </div>
    </Layout>
  );
};

export default Contact;

/*
- kakao 생성자를 통해 만들어진 지도 인스턴스값을 state에 담아서 각각의 이벤트에 연결
- 지점 버튼 클릭 시 다른 지도를 출력하도록 구현
    - 너무 코드가 지저분해져서 지도 정보값을 배열 형태로 묶음
    - 추후 배열 데이터가 변경이 되면 데이터 기반으로 자동으로 새로운 지도 인스턴스 생성과 이벤트 연결까지 한 번에 자동화 시키는 로직을 구성

## 브라우저 리사이즈

- 브라우저 리사이즈 시 마커가 가운데 가지 않아서 브라우저 리사이즈 이벤트 발생할 때마다 마커가 가운 데 위치하는 함수를 재호출

## 다른 컴포넌트에서 핸들러 함수가 호출되는 문제

- window 객체에 이벤트를 연결하다보니 리사이즈 이벤트가 발생할 필요가 없는 다른 컴포넌트에서도 이벤트 핸들러 함수가 호출
- 컴포넌트 언마운트시 window 객체에 이벤트 핸들러 제거 처리
 */
