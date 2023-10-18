import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFlickr = createAsyncThunk("flicker/request", async (opt) => {
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

  const result = await axios.get(url);
  return result.data.photos.photo;
});

const flickrSlice = createSlice({
  name: "fliker",
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchFlickr.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchFlickr.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchFlickr.rejected]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  },
});

export default flickrSlice.reducer;
