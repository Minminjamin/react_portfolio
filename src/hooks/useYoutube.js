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

// peding : 데이터 요청을 보내고 응답을 받기까지의 상태
// fresh : 작업자가 직접 지정한 데이터의 신선한 상태
// stale : 작업자가 직접 지정한 데이터의 신선하지 못한 신선하지 못한 옛날 데이터의 상태
// inactive : 해당 컴포넌트에서 리액트 쿼리로 관리하고 있는 데이터를 활용하지 않고 있는 상태
// 비동기 data가 stale 상태에서 inActive 상태가 되면 그 때  시점부터 캐시타임 카운트

// 비동기 데이터가 inactive가 되면 무조건 캐시타임 카운트됨
// inActive 아닌 상태에서 data가 state 상태면 refetching 발생
// inactive 상태가 아니고 아직 fresh 상태면 refetchiing 발생 안함

// react0query로 관리하는 서버 데이터가 만약 24시간 주기로 변경된다고 하면 staleTime을 24시간으로 지정해서 24시간 안에는 데이터를 refatching 하지 않도록 처리
export const useYoutubeQuery = () => {
  return useQuery(["youtubeData"], fetchYoutube, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
};
