import React from "react";
import clsx from "clsx";
import "./Youtube.scss";
import Layout from "../../common/layout/Layout";
import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Youtube = () => {
  const youtube = useSelector((store) => store.youtube.data);
  const history = useHistory();

  const refEl = useRef(null);

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
        <h2>Happy video page. Listen to the songs of my favorite musicians.</h2>

        {youtube.map((data, idx) => {
          let date = data.snippet.publishedAt;
          return (
            <article key={idx}>
              <div className="pic">
                <Link to={`/detail/${data.id}`}>
                  <img
                    src={data.snippet.thumbnails.standard.url}
                    alt={data.title}
                    // onClick={() => setIndex(idx)}
                  />
                </Link>
              </div>

              <div className="info">
                <div className="innerTopText">
                  <h3>{sliceTxt(data.snippet.title, 60)}</h3>
                  <p>{data.snippet.videoOwnerChannelTitle}</p>
                </div>

                <p>{sliceTxt(data.snippet.description, 200)}</p>
                <p className="date">
                  {date.split("T")[0].split("-").join(".")}
                </p>

                <div className="btnSet">
                  <button onClick={() => history.push(`/detail/${data.id}`)}>
                    View More
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </Layout>
    </>
  );
};

export default Youtube;
