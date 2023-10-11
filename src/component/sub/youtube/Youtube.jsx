import React from "react";
import clsx from "clsx";
import "./Youtube.scss";
import Layout from "../../common/layout/Layout";
import { useState, useEffect, useRef } from "react";
import Modal from "../../common/modal/Modal";

const Youtube = () => {
  const [youtube, setYoutube] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [index, setIndex] = useState();

  const refEl = useRef(null);

  const fetchYoutube = async () => {
    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
    const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";
    const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
    const index = 5;
    const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${index}`;

    const res = await fetch(resultURL);
    const json = await res.json();

    setYoutube(json.items);
  };
  useEffect(() => {
    fetchYoutube();
  }, []);

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

  useEffect(() => {
    console.log(youtube);
  }, [youtube]);

  return (
    <>
      <Layout title={"Youtube"}>
        {youtube.map((data, idx) => {
          let date = data.snippet.publishedAt;
          return (
            <article key={idx}>
              <div className="pic" onClick={() => setIsModal(true)}>
                <img
                  src={data.snippet.thumbnails.standard.url}
                  alt={data.title}
                  onClick={() => setIndex(idx)}
                />
              </div>

              <div className="info">
                <div className="innerTopText">
                  <h2>{sliceTxt(data.snippet.title, 60)}</h2>
                  <p>{data.snippet.videoOwnerChannelTitle}</p>
                </div>

                <p>{sliceTxt(data.snippet.description, 200)}</p>
                <p className="date">
                  {date.split("T")[0].split("-").join(".")}
                </p>

                <div className="btnSet">
                  <button
                    onClick={() => {
                      setIsModal(true);
                      setIndex(idx);
                    }}
                  >
                    View More
                  </button>
                </div>

                {/* <div>
                  <h2>{sliceTxt(data.snippet.title, 60)}</h2>
                  <p>{data.snippet.videoOwnerChannelTitle}</p>
                </div>
                <p>{sliceTxt(data.snippet.description, 200)}</p>
                <p className="date">
                  {date.split("T")[0].split("-").join(".")}
                </p>
                <div className="channel">
                  <span> View More</span>
                </div> */}
              </div>
            </article>
          );
        })}
      </Layout>
      {isModal && (
        <Modal setIsModal={setIsModal}>
          <iframe
            src={`https://www.youtube.com/embed/${youtube[index].snippet.resourceId.videoId}`}
            title="youtube"
          ></iframe>
        </Modal>
      )}
    </>
  );
};

export default Youtube;
