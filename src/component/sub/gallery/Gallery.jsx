import React from "react";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-component";

const masonryOptions = {
  transitionDuration: 0,
};

const Gallery = () => {
  const [pics, setPics] = useState([]);

  const fetchData = async () => {
    const api_key = process.env.REACT_APP_FLICKR_API_KEY;
    const num = 50;
    const methodInterest = "flickr.interestingness.getList";
    const url = `https://www.flickr.com/services/rest/?method=${methodInterest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

    const data = await fetch(url);
    const json = await data.json();
    setPics(json.photos.photo);
    console.log(pics);
    // console.log(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout title={"Gallery"}>
      <div className="picFrame">
        <Masonry
          elementType={"div"}
          options={{ transitionDuration: "0.5s" }}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
          {pics.map((item, index) => (
            <article key={index}>
              <div className="inner">
                <img
                  className="pic"
                  src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                  alt={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
                />
                <h2>{item.title}</h2>

                <div className="profile">
                  <img
                    src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg
                `}
                    alt={item.owner}
                  />
                  <span>{item.owner}</span>
                </div>
              </div>
            </article>
          ))}
        </Masonry>
      </div>
    </Layout>
  );
};

export default Gallery;
