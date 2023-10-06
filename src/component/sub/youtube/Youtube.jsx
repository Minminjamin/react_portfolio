import React from "react";
import clsx from "clsx";
import styles from "../youtube/Youtube.scss";
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

  return (
    <>
      <Layout title={"Youtube"}>
        {youtube.map((data, idx) => {
          return (
            <article key={idx}>
              <h2>{data.snippet.title}</h2>
              <p>{data.snippet.description}</p>
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
