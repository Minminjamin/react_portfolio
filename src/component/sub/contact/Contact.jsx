import React, { useRef, useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import styles from "../contact/Contact.scss";

const Contact = () => {
  const instance = useRef(null);
  const map = useRef(null);

  const [traffic, setTraffic] = useState(false);

  const { kakao } = window;

  const info = {
    latlng: new kakao.maps.LatLng(37.584943947008455, 126.8857970238249),
    imageSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
    imageSize: new kakao.maps.Size(232, 99),
    imageOption: { offset: new kakao.maps.Point(116, 99) },
  };

  const marker = new kakao.maps.Marker({
    position: info.latlng,
    image: new kakao.maps.MarkerImage(
      info.imageSrc,
      info.imageSize,
      info.imagePos
    ),
  });

  useEffect(() => {
    instance.current = new kakao.maps.Map(map.current, {
      center: info.latlng,
      level: 1,
    });
    marker.setMap(instance.current);
  }, []);

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

      <div className="map" ref={map}></div>
    </Layout>
  );
};

export default Contact;
