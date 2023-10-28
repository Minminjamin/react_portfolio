import { createContext, useContext, useState } from "react";

// 컴포넌트 선언을 위한 camel case 사용
export const GlobalContext = createContext();

// provider이므로 camel case 사용
export function GlobalProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        modalOpen,
        setModalOpen,
        theme,
        setTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalData() {
  const globalContext = useContext(GlobalContext);

  return globalContext;
}

/*
	useGlobalData라는 커스텀훅을 사용해서 Client-side-data를 전역관리하는 이유
	- 기존 리덕스를 쓰는 가장 큰 이유는 비동기(Server-side-data)를 효율적으로 전역관리하기 위함이었으나..
	- 최근에는 클라이언트에서 데이터의 제어권이 없은 서버쪽 데이터를 static한 상태로 리덕스를 통해 store에 저장한뒤 재활용하는 것이 좋지 않게 여겨짐
	- 왜냐하면 빈번하게 변경될수도 있는 서버사이드 데이터를 전역 store에 저장하는 순간 해당 데이터는 최신 데이터 상태가 아닌 이미 옛날 데이터의 상태로 저장되어 있기 때문
	- 이러한 문제점을 방지하지 위해서 Server-side-data를 react-query를 이용해서 항상 최신상태로 호출하도록 처리하고 만약 일정시간동안 변경되지 않는 서버사이드 데이터의 경우 캐싱처리해서 클라이언트에서 요청시 같은 데이터의 경우 refetching을 하지 않고 캐싱된 데이터를 재사용하도록 처리
	- 결국 서버사이드 데이터의 관리를 react-query가 담당하게 되면서...
	- 굳이 간단한 구조의 client-side-date를 리덕스라는 외부 라이브러리로 전역 데이터관리하는게 비효율적으로 판단됨
	- 리액트의 기본 기능인 context api기반 createContext, useContext를 활용하여 커스텀 훅 형태로 client-side-date를 간소하면서 효율적으로 관리하기 위함
 */
