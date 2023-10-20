import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import flickrReducer from "./redux/flickrSlice";
import modalReducer from "./redux/modalSlice";
import menuReduver from "./redux/menuSlice";

const store = configureStore({
  reducer: {
    flickr: flickrReducer,
    modal: modalReducer,
    menu: menuReduver,
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

/*
  react-toolkit으로 클라이언트, 서버 데이터 구분없이 전역 상태 관리의 문제점
  - 기존의 서버사이드 데이터로 전역 store의 static 하게 저장을 하다보니 실시간으로 자주바ㅜ끼는 데이터 경우에는 결ㄹ국 전역 store에 최신 데이터가 아닌 예전 데이터를 관리하게 됨
  - 서버 데이터를 전역에 저장하는 것 자체가 잘못된 방식이기 때문에 서버 데이터가 필요할 때마다 계속 가져와야됨
  - 새로 fetching을 할 때 이미 불러온 적이 있는 똑같은 데이터의 경우는 caching 처리된 데이터를 재활용해서 불필요한 refetching 방지

	redux-toolkit으로 클라이언트, 서버 데이터 구분없이 전역상태관리의 문제점
	- 기존에는 서버사이드 데이터로 전역store에 static하게 저장을 하다보니 실시간으로 자주바뀌는 데이터 경우에는
	- 결국 전역 store에 최신데이터가아닌 예전 데이터를 관리하게 됨 
	- 서버 데이터를 전역에 저장하는 것 자체가 잘못된 방식이기 때문에 
	- 서버 데이터가 필요할때마다 계속 가져와야됨
	- 새로 fetching을 할때 이미 불러온적이 있는 똑같은 데이터경우는 caching 처리된 데이터를 재활용해서 불필요한 refetching방지

	client-side-data (useContext를 활용한 커스텀훅을 전역관리)
	server-side-data (react-query를 활용해서 전역상태로 저장하는 것이 아닌 캐싱처리)

 */
