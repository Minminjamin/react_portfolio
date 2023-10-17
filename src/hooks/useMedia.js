import { useEffect } from "react";

export const useMedia = () => {
  let wid = 0;

  const getClientWid = () => {
    wid = window.innerWidth;
    if (wid < 1400) return "laptop";
    if (wid < 1000) return "tablet";
    if (wid < 639) return "mobile";
  };
  useEffect(() => {
    window.addEventListener("resize", getClientWid);
  }, []);
};
