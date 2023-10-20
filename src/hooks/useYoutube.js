import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchYoutube = async () => {
  const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
  const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";
  const pid = "PLNXichiUWg4Ax7wNBYcC4rw16mS6MTind";
  const index = 8;
  const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${index}`;

  const { data } = await axios.get(resultURL);

  return data.items;
};

// react-query에는 query 키를 문자열로 지정해서 데이터 호출시 query 키가 동일하면 동일한 데이터로 인지해서 refetching 처리하지 않고 캐싱되어 있는 데이터를 재활용
// useQuery([쿼리키], fetching 함수, 캐싱 옵션)
export const useYoutubeQuery = () => {
  return useQuery(["youtubeData"], fetchYoutube);
};
