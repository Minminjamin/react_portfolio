import React from "react";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-component";

const Gallery = () => {
  const [pics, setPics] = useState([]);
  const search = useRef(null);

  const myId = "199348831@N08";

  const fetchData = async (opt) => {
    let url = "";
    const api_key = process.env.REACT_APP_FLICKR_API_KEY;
    const num = 50;
    const methodInterest = "flickr.interestingness.getList";
    const methodUser = "flickr.people.getPhotos";
    const methodSearch = "flickr.photos.search";

    if (opt.type === "interest") {
      url = `https://www.flickr.com/services/rest/?method=${methodInterest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
    }
    if (opt.type === "user") {
      url = `https://www.flickr.com/services/rest/?method=${methodUser}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
    }
    if (opt.type === "search") {
      url = `https://www.flickr.com/services/rest/?method=${methodSearch}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
    }

    const data = await fetch(url);
    const json = await data.json();
    setPics(json.photos.photo);
    console.log(pics);
    // console.log(json);
  };

  useEffect(() => {
    // fetchData({ type: "search", tags: "landscape" });
    fetchData({ type: "user", id: myId });
    // fetchData({ type: "user" });
  }, []);

  return (
    <Layout title={"Gallery"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (search.current.value.trim() === "") {
            return alert("검색어를 입력하세요");
          }
          fetchData({ type: "search", tags: search.current.value });
        }}
      >
        <input ref={search} type="text" placeholder="검색어를 입력하세요." />
        <button>검색</button>
      </form>

      <button onClick={() => fetchData({ type: "interest" })}>
        interest 갤러리
      </button>
      <button onClick={() => fetchData({ type: "user", id: myId })}>
        나의 갤러리 호출
      </button>
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
                  <span
                    onClick={() => fetchData({ type: "user", id: item.owner })}
                  >
                    {item.owner}
                  </span>
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
