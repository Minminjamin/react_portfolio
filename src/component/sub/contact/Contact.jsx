import React, { useRef, useEffect } from "react";
import Layout from "../../common/layout/Layout";
import styles from "../contact/Contact.scss";

const Contact = () => {
  const map = useRef(null);

  const { kakao } = window;

  const mapOption = {
    center: new kakao.maps.LatLng(37.584943947008455, 126.8857970238249), // 지도의 중심좌표
    level: 1, // 지도의 확대 레벨
  };
  const markerPosition = mapOption.center;

  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  useEffect(() => {
    const instance = new kakao.maps.Map(map.current, mapOption);
    marker.setMap(instance);
  }, []);

  return (
    <Layout title={"Contact"} styleName={styles.contact}>
      <div className="map" ref={map}></div>
    </Layout>
  );
};

export default Contact;
