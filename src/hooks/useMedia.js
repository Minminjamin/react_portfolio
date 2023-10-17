import { useEffect, useState } from "react";

export const useMedia = (opt) => {
  // 커스텀 훅 호출시 미디어쿼리 옵션이 없을 떄 디폴트로 적용할 수치값
  const [type, setType] = useState("");

  // 해당 커스텀훅 호출시 특정 옵션이 전달되면 해당값으로 defaultOption 값을 덮어쓰기해서 합침
  const defaultOpt = {
    mmobile: 640,
    tablet: 1000,
    laptop: 1400,
  };
  const result = { ...defaultOpt, opt };

  // 합쳐진 미디어 쿼리 수치값과 현재 브라우저 넓이값을 비교해서 Type의 문자값을 변경해주는 ㅎ마수
  const getClientWid = () => {
    let wid = window.innerWidth;

    if (wid >= result.tablet && wid < result.laptop) setType("laptop");
    if (wid >= result.mobile && wid < result.tablet) setType("tablet");
    if (wid >= 0 && wid < result.mobile) setType("mobile");
  };
  useEffect(() => {
    // 마운트 시 실행하기 위해 일단 호출
    getClientWid();

    // 리사이즈 될 때마다 getClientWid가 변경해주는 Type 문자값을 리턴
    window.addEventListener("resize", getClientWid);

    return () => window.removeEventListener("resize", getClientWid);
  }, []);

  return type;
};
