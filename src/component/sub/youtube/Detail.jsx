import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../common/layout/Layout";

const Detail = () => {
  const { id } = useParams();

  const [youtube, setYoutube] = useState();

  useEffect(() => {
    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
    const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";

    fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippet`)
      .then((data) => data.json())
      .then((json) => setYoutube(json.items[0].snippet));
  }, []);

  return (
    <Layout title={"Youtube Detail"}>
      <h2>{youtube?.title}</h2>
      <iframe
        src={`https://www.youtube.com/embed/${youtube?.resourceId.videoId}`}
        title="youtube"
      ></iframe>
      <p>{youtube?.description}</p>
    </Layout>
  );
};

export default Detail;
