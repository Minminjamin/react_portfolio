import React, { useRef, useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import styles from "../contact/Contact.scss";

const Contact = () => {
  const instance = useRef(null);
  const map = useRef(null);

  const [traffic, setTraffic] = useState(false);
  const [index, setIndex] = useState(0);

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
  }, [index]);

  useEffect(() => {
    traffic
      ? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
      : instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  }, [traffic]);

  return (
    <Layout title={"Contact"} styleName={styles.contact}>
      <button
        onClick={() => {
          setTraffic(!traffic);
        }}
      >
        {traffic ? "교통정보 끄기" : "교통정보 켜기"}
      </button>

      <button onClick={setCenter}>지도 위치 초기화</button>

      <div className="map" ref={map}></div>

      <ul>
        {info.current.map((data, idx) => (
          <li
            key={idx}
            onClick={() => setIndex(idx)}
            className={index === idx ? "on" : ""}
          >
            {data.title}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Contact;
