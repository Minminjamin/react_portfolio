import React from "react";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useEffect } from "react";

const Gallery = () => {
  const [pics, setPics] = useState([]);
  const api_key = process.env.REACT_APP_FLICKR_API_KEY;
  const num = 500;
  const methodInterest = "flickr.interestingness.getList";
  const url = `https://www.flickr.com/services/rest/?method=${methodInterest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => {
        setPics(json.photos.photo);
        console.log(pics);
        // console.log(json);
      });
  }, []);

  return (
    <Layout title={"Gallery"}>
      <p>갤러리 페이지입니다.</p>
      <div className="galleryBox">
        {pics.map((item, index) => (
          <aricle key={index}>
            <div className="pic">
              <img
                src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                alt={item.title}
              />
            </div>
          </aricle>
        ))}
      </div>
    </Layout>
  );
};

export default Gallery;
