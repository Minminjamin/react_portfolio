import { createContext, useContext, useState } from "react";

// 컴포넌트 선언을 위한 camel case 사용
export const GlobalContext = createContext();

// provider이므로 camel case 사용
export function GlobalProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <GlobalContext.Provider
      value={{ menuOpen, setMenuOpen, modalOpen, setModalOpen }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalData() {
  const globalContext = useContext(GlobalContext);

  return globalContext;
}
