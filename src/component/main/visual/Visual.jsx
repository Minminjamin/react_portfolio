import React from "react";
import "./Visual.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import { useHistory } from "react-router-dom";
import { useYoutubeQuery } from "../../../hooks/useYoutube";

const Visual = () => {
  // const { data } = useSelector((store) => store.youtube);
  const { data, isSuccess } = useYoutubeQuery();

  const [index, setIndex] = useState();

  const history = useHistory();

  /*
    data : react-query가 반환 데이터
    isError : 데이터 응답 실패시 true,
    isSuccess : 데이터 응답 성공시 true,
    isLoading :  데이터 요청 peding 상태일 때 true
    isRefetching : true 동일한 데이터라도 다시 refetching 처리 유무(기본값 false)
   */

  return (
    <section className="visual">
      <div className="top">
        <p>WHACH OUR YOUTUBE PLAYLIST</p>
        <h1>Let's watch a short YouTube playlist</h1>
      </div>
      <div className="youtubeSwiper">
        <div className="titBox">
          <ul>
            {isSuccess &&
              data.map((item, idx) => {
                if (idx >= 6) return null;
                return (
                  <li key={idx} className={idx === index ? "on" : ""}>
                    <h3>{item.snippet.title}</h3>
                    <p>{item.snippet.description.substr(0, 300) + "..."}</p>
                    <button
                      onClick={() => {
                        history.push(`/detail/${item.id}`);
                      }}
                    >
                      View Detail
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          centeredSlides={true}
          // swiper loop 기능을 적용하는 순간 실제 연결되어 있는 패널갯수보다 동적으로 패널이 생성되면서 일반적인 방법으로는 활성화 패널이 순서값을 구할 수 없기 때문에 아래와 같은 방법으로 순서를 구함
          onSlideChange={(el) => setIndex(el.realIndex)} //item과 중복을 피하기 위해 el 사용
          breakpoints={{
            1000: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {isSuccess &&
            data.map((item, idx) => {
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
      </div>
      {/* <div className="titBox">
        <ul>
          {isSuccess &&
            data.map((item, idx) => {
              if (idx >= 6) return null;
              return (
                <li key={idx} className={idx === index ? "on" : ""}>
                  <h3>{item.snippet.title}</h3>
                  <p>{item.snippet.description.substr(0, 300) + "..."}</p>
                  <button
                    onClick={() => {
                      history.push(`/detail/${item.id}`);
                    }}
                  >
                    View Detail
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        // swiper loop 기능을 적용하는 순간 실제 연결되어 있는 패널갯수보다 동적으로 패널이 생성되면서 일반적인 방법으로는 활성화 패널이 순서값을 구할 수 없기 때문에 아래와 같은 방법으로 순서를 구함
        onSlideChange={(el) => setIndex(el.realIndex)} //item과 중복을 피하기 위해 el 사용
        breakpoints={{
          1000: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {isSuccess &&
          data.map((item, idx) => {
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
      </Swiper> */}
    </section>
  );
};

export default Visual;
