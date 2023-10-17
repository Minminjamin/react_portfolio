// 비동기 데이터 fetching 함수 등록
// 비동기 데이터의 상태에 따라서 자동으로 해당 데이터를 변경할 수 있는 리듀서라는 함수를 등록

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 비종기 서버 통시느ㅡㅇ로 데이터를 전달받아서 내부적으로 action 타입을 자동 생성해서 액션 객체 생성까지 완료하는 함수
export const fetchYoutube = createAsyncThunk("youtube/request", async () => {
  const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
  const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";
  const pid = "PLNXichiUWg4Ax7wNBYcC4rw16mS6MTind";
  const index = 8;
  const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${index}`;

  const result = await axios.get(resultURL);

  return result.data.items;
});

// createAsyncThunk가 반환하는 action 객체를 받아서 전역 store 데이터를 변형하는 reducer 함수 들록
const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchYoutube.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchYoutube.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchYoutube.rejected]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  },
});

export default youtubeSlice.reducer;
