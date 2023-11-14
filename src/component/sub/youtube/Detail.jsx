import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";

const Detail = () => {
  const { id } = useParams();

  const [youtube, setYoutube] = useState();

  useEffect(() => {
    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
    const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";

    fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippet`)
      .then((data) => data.json())
      .then((json) => setYoutube(json.items[0].snippet));
  }, [id]);

  return (
    <div>
      <div className="vidBox">
        <iframe
          src={`https://www.youtube.com/embed/${youtube?.resourceId.videoId}`}
          title="youtube"
        ></iframe>
      </div>
      <h2>{youtube?.title}</h2>
      <p>{youtube?.description}</p>
    </div>
  );
};

export default Detail;
