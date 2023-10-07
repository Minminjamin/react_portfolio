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

  const fetchYoutube = () => {
    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
    const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";
    const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
    const index = 5;
    const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${index}`;

    fetch(resultURL)
      .then((data) => data.json())
      .then((json) => {
        console.log(json.itmes);
        setYoutube(json.items);
      });
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

  return (
    <>
      <Layout title={"Youtube"}>
        {youtube.map((data, idx) => {
          let date = data.snippet.publishedAt;
          return (
            <article key={idx}>
              <h2>{sliceTxt(data.snippet.title, 60)}</h2>
              <p>{sliceTxt(data.snippet.description, 180)}</p>
              <p>{date.split("T")[0].split("-").join(".")}</p>
              <div className="pic" onClick={() => setIsModal(true)}>
                <img
                  src={data.snippet.thumbnails.standard.url}
                  alt={data.title}
                  onClick={() => setIndex(idx)}
                />
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
