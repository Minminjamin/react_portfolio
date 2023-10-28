import React from "react";
import "./Youtube.scss";
import Layout from "../../common/layout/Layout";
import { Link } from "react-router-dom";
import { useYoutubeQuery } from "../../../hooks/useYoutube";
import SubTitle from "../../common/subTitle/SubTitle";

const Youtube = () => {
  const { data: youtube, isSuccess } = useYoutubeQuery();

  const sliceTxt = (text, num) => {
    if (text.length > num) {
      return text.substr(0, num) + "...";
    } else {
      return text;
    }
  };

  return (
    <>
      <Layout title={"Youtube"}>
        <SubTitle
          description={"THIS IS WE ARE WORK PLAYLIST"}
          title={"Our Playlist"}
        />

        <div className="youtubeBox">
          {isSuccess &&
            youtube.map((item, idx) => {
              let date = item.snippet.publishedAt;
              return (
                <article key={idx}>
                  <div className="pic">
                    <Link to={`/detail/${item.id}`}>
                      <img
                        src={item.snippet.thumbnails.standard.url}
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <h3>{sliceTxt(item.snippet.title, 17)}</h3>
                  <p>{item.snippet.videoOwnerChannelTitle}</p>
                  <p className="date">
                    {date.split("T")[0].split("-").join(".")}
                  </p>
                  <div className="line"></div>
                  <p>{sliceTxt(item.snippet.description, 100)}</p>

                  {/* <div className="btnSet">
                    <button onClick={() => history.push(`/detail/${item.id}`)}>
                      View More
                    </button>
                  </div> */}
                </article>
              );
            })}
        </div>
      </Layout>
    </>
  );
};

export default Youtube;

/*
## Youtube API fetch에 대해

- 유튜브 api를 활용해 비동기 데이터, server side 데이터를 활용하는 페이지
- 유튜브 데이터를 유튜브 컴포넌트에서만 호출하는 것이 아닌 메인 컴포넌트의 비주얼 컴포넌트에서 호출해야함
- 로직 반복을 피하기 위해 redux라는 전역 상태 관리 라이브러리를 사용함
    - redux-saga 방식도 채택할 수는 있으나 로직과 개념의 복잡도가 커서 비효율적으로 느껴짐
    - 대안으로 redux-toolkit 사용
- 비동기 데이터의 상태값에 따라 자동으로 action 객체를 생성해 주고 action 객체의 상태에 따라 reducer가 알아서 전역 데이터를 변경해주는 방식이 효율적임
- 컴포넌트 안쪽에서 비동기 데이터 함수를 관리하는 게 아닌 컴포넌트 외부의 slice 파일을 통해 데이터 fetching 함수와 reducer 함수를 한 번에 관리할 수 있는 게 편했음

 */

/*
react-query를 이용해서 비동기 데이터 관리 개선
	- 기존에 youtube데이터를 static한 상태로 젼역 store에 저장하는 방식이 적절치 않다고 판다
	- useYoutbueQuery라는 커스텀훅을 활용하여 Serverside-data를 기존 clinet- data와 분리해서 관리
	- caching Time, Stale Time을 지정해서 해당 서버 데이터가 변경되는 주기를 직적 지정하여 Caching처리
	- 전역에 저장하지 않고 해당 데이터가 필요할때마다 신선한 (Fresh) 상태의 데이터를 가져오기 위해선 매번 컴포넌트마다 react-query기반으로 데이터를 호출해야 되는 번거로움 때문에 커스텀 훅으로 제작해서 간단하게 데이터 호출
*/
