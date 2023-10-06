import React, { useRef, useEffect } from "react";
import Layout from "../../common/layout/Layout";
import styles from "../contact/Contact.scss";

const Contact = () => {
  const instance = useRef(null);
  const map = useRef(null);

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

  return (
    <Layout title={"Contact"} styleName={styles.contact}>
      <button
        onClick={() => {
          instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        }}
      >
        주변 교통정보 보기
      </button>
      <button
        onClick={() =>
          instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        }
      >
        주변 교통정보 끄기
      </button>
      <div className="map" ref={map}></div>
    </Layout>
  );
};

export default Contact;
