import { useSelector } from "react-redux";
import "../info/Info.scss";

const Info = () => {
  const { data } = useSelector((store) => store.flickr);

  console.log(data);
  return (
    <section className="info">
      <div className="wrap">
        {data.map((item, idx) => {
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
