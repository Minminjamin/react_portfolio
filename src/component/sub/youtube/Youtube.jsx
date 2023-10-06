import React from "react";
import clsx from "clsx";
// import styles from "../Youtube/Youtube.module.scss";
import Layout from "../../common/layout/Layout";
import { useState, useEffect } from "react";

const Youtube = () => {
  const [youtube, setYoutube] = useState([]);

  const fetchYoutube = () => {
    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
    const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";
    const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
    const num = 5;
    const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

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
    <Layout title={"Youtube"}>
      {youtube.map((data, idx) => {
        return (
          <article key={idx}>
            <h2>{data.snippet.title}</h2>
            <p>{data.snippet.description}</p>
            <div className="pic">
              <img
                src={data.snippet.thumbnails.standard.url}
                alt={data.title}
              />
            </div>
          </article>
        );
      })}
    </Layout>
  );
};

export default Youtube;
