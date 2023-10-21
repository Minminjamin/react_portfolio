import React from "react";
import clsx from "clsx";
import "./Youtube.scss";
import Layout from "../../common/layout/Layout";
import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useYoutubeQuery } from "../../../hooks/useYoutube";

const Youtube = () => {
  // const youtube = useSelector((store) => store.youtube.data);
  const history = useHistory();

  const refEl = useRef(null);

  const { data: youtube, isSuccess } = useYoutubeQuery();

  const sliceTxt = (text, num) => {
    if (text.length > num) {
      return text.substr(0, num) + "...";
    } else {
      return text;
    }
  };

  const sliceDate = (date) => {
    return date.splite("T")[0];
  };

  return (
    <>
      <Layout title={"Youtube"}>
        <div className="top">
          <p>THIS IS WE ARE WORK PLAYLIST</p>
          <h2>Our Playlist</h2>
        </div>

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
