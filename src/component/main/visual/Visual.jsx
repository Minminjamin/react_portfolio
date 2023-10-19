import React from "react";
import "./Visual.scss";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";

const Visual = () => {
  const { data } = useSelector((store) => store.youtube);

  const [index, setIndex] = useState();

  return (
    <section className="visual">
      <div className="titBox">
        <ul>
          {data.map((item, idx) => {
            if (idx >= 6) return null;
            return (
              <li key={idx} className={idx === index ? "on" : ""}>
                <h3>{item.snippet.title}</h3>

                <button>View Detail</button>
              </li>
            );
          })}
        </ul>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={50}
        loop={true}
        centeredSlides={true}
        // swiper loop 기능을 적용하는 순간 실제 연결되어 있는 패널갯수보다 동적으로 패널이 생성되면서 일반적인 방법으로는 활성화 패널이 순서값을 구할 수 없기 때문에 아래와 같은 방법으로 순서를 구함
        onSlideChange={(el) => setIndex(el.realIndex)} //item과 중복을 피하기 위해 el 사용
      >
        {data.map((item, idx) => {
          if (idx >= 6) return null;
          return (
            <SwiperSlide key={idx}>
              <div className="pic">
                <img
                  src={item.snippet.thumbnails.maxres.url}
                  alt={item.title}
                />
                <img
                  src={item.snippet.thumbnails.maxres.url}
                  alt={item.title}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Visual;
