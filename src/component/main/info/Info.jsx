// import { useSelector } from "react-redux";
import { useFlickrQuery } from "../../../hooks/useFlickr";
import "./Info.scss";

const Info = () => {
  const { data, isSuccess } = useFlickrQuery({
    type: "user",
    id: "199348831@N08",
  });
  return (
    <section className="mainInfo myScroll">
      <div className="top">
        <h1>Our Company Gallery</h1>
        <p>
          Congue quisque egestas diam in arcu cursus euismod. Sodales neque
          sodales ut etiam sit.
        </p>
      </div>

      <div className="wrap">
        {isSuccess &&
          data.map((item, idx) => {
            if (idx >= 6) return;
            return (
              <article key={idx}>
                <img
                  src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                  alt={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
                  className="galleryImg"
                />
              </article>
            );
          })}
      </div>
    </section>
  );
};

export default Info;
