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

  const { kakao } = window;

  const info = useRef([
    {
      title: "삼성역 코엑스",
      latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "넥슨 본사",
      latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "서울 시청",
      latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ]);

  const marker = new kakao.maps.Marker({
    position: info.current[index].latlng,
    image: new kakao.maps.MarkerImage(
      info.current[index].imgSrc,
      info.current[index].imgSize,
      info.current[index].imgPos
    ),
  });

  const setCenter = () => {
    instance.current.setCenter(info.current[index].latlng);
  };

  useEffect(() => {
    map.current.innerHTML = "";

    instance.current = new kakao.maps.Map(map.current, {
      center: info.current[index].latlng,
      level: 1,
    });
    marker.setMap(instance.current);
    const mapTypeControl = new kakao.maps.MapTypeControl();
    instance.current.addControl(
      mapTypeControl,
      kakao.maps.ControlPosition.BOTTOMLEFT
    );

    window.addEventListener("resize", setCenter);

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
  }, [index]);

  const sendEmail = (e) => {
    e.preventDefault();

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
        },
        (error) => {
          alert("문의내용 전송에 실패했습니다. ");
          console.log(error);
        }
      );
  };

  useEffect(() => {
    traffic
      ? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
      : instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  }, [traffic]);

  return (
    <Layout title={"Contact"} styleName={styles.contact}>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      <div className="mapBox">
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
      {/*       
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
      </ul> */}
    </Layout>
  );
};

export default Contact;
