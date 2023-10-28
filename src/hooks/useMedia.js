import { useEffect, useState } from "react";

export const useMedia = (opt) => {
  // 커스텀 훅 호출시 미디어쿼리 옵션이 없을 떄 디폴트로 적용할 수치값
  const [type, setType] = useState("");

  // 해당 커스텀훅 호출시 특정 옵션이 전달되면 해당값으로 defaultOption 값을 덮어쓰기해서 합침
  const defaultOpt = {
    mobile: 640,
    tablet: 1000,
    laptop: 1400,
  };

  console.log(type);
  const result = { ...defaultOpt, ...opt };
  console.log(result);
  // 합쳐진 미디어 쿼리 수치값과 현재 브라우저 넓이값을 비교해서 Type의 문자값을 변경해주는 ㅎ마수
  const getClientWid = () => {
    let wid = window.innerWidth;
    if (wid >= result.laptop) setType("");
    if (wid >= result.tablet && wid < result.laptop) setType("laptop");
    else if (wid >= result.mobile && wid < result.tablet) setType("tablet");
    else if (wid >= 0 && wid < result.mobile) setType("mobile");
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

/*
	스타일의 미디어쿼리를 사용하지 않고 useMedia.js라는 커스텀 훅으로 반응형 스타일링 하는 이유
	- 현재 각 컴포넌트 별로 일반 scss파일이 쪼개져 있기 때문에 관리할 scss파일이 많음
	- 많은 scss파일에 일일이 미디어쿼리의 디바이스폭을 지정하기엔 무리가 있기 때문에 변수를 활용해야 되는데
	- 일반 css변수에서는 스타일 속성은 변수로 치환가능하나 미디어쿼리의 폭은 변수로 치환이 불가능
	- scss변수를 활용하기에는 일일이 scss파일에 변수가 등록된 scss파일을 import하기때문에 비효율적
	- 대안으로 postcss를 설정해서 웹팹에 번들링 설정을 하면 되지만 번거로움
	- 따라로 애초에 해당 훅을 이용해서 브라우저 리사이즈시 브라우저 폭을 인지해서 특정 클래스명을 리턴하도록 처리하고 
	- 루트 컴포넌트인 App의 클래스에 해당 커스텀훅의 리턴값을 지정하면 효율적으로 미디어쿼리 구간을 관리 가능
	
 */
