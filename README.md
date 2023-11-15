# 소개

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/1be70c52-ad4d-402e-9955-131c048122fe)

2023년 7월부터 2023년 10월까지, 직업계고 채용연계 과정, 에이블런의 웹 프론트엔드 개발자 양성 과정을 수강하며 만든 React 포트폴리오입니다.

## 개발 기간

- 2023년 9월 26일 ~ 20023년 10월 31일 (총 1개월)

## 목적

- 채용 공고에서 신입 프론트엔드 개발자에게 요구되는 기술 실습
- 실무에서 자주 쓰이는 기능 구현 연습
- 웹 프론트엔드 개발자 양성 과정에서의 포트폴리오
- 반응형 웹 사이트 실습

## 대표 기능

- Context API를 통한 테마 변경
- localStorage를 통한 CRUD
- React-query를 통한 데이터 fetching
- kakao map api를 통해 지도에서 지점 출력, 교통 정보

## 사용한 기술

<img  src="https://img.shields.io/badge/react-61dafb?style=for-the-badge&logo=React&logoColor=white"> <img  src="https://img.shields.io/badge/Javascript-f7df1e?style=for-the-badge&logo=Javascript&logoColor=white"> <img  src="https://img.shields.io/badge/react query-ff4154?style=for-the-badge&logo=React Query&logoColor=white"> <img  src="https://img.shields.io/badge/sass-cc6699?style=for-the-badge&logo=sass&logoColor=white">

## 폴더 구조

- public의 사용하지 않은 파일 및 이미지 파일은 생략
  ```
  ┣ 📂 node_modules
  ┣ 📂 public
  ┃ ┣ 📂 DB
  ┃ ┃ ┣ 📜 department.json
  ┃ ┃ ┗ 📜 history.json
  ┃ ┗ 📂 img
  ┣ 📂 src
  ┃ ┣ 📂 asset
  ┃ ┃ ┗ 📜 Anime.js
  ┃ ┣ 📂 component
  ┃ ┃ ┣ 📂 common
  ┃ ┃ ┃ ┣ 📂 footer
  ┃ ┃ ┃ ┃ ┣ 📜 Footer.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Footer.scss
  ┃ ┃ ┃ ┣ 📂 header
  ┃ ┃ ┃ ┃ ┣ 📜 Header.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Header.scss
  ┃ ┃ ┃ ┣ 📂 layout
  ┃ ┃ ┃ ┃ ┣ 📜 Layout.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Layout.scss
  ┃ ┃ ┃ ┣ 📂 menu
  ┃ ┃ ┃ ┃ ┣ 📜 Menu.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Menu.scss
  ┃ ┃ ┃ ┣ 📂 modal
  ┃ ┃ ┃ ┃ ┣ 📜 Modal.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Modal.scss
  ┃ ┃ ┃ ┗ 📂 subTitle
  ┃ ┃ ┃ ┃ ┣ 📜 SubTitle.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 SubTitle.scss
  ┃ ┃ ┣ 📂 main
  ┃ ┃ ┃ ┣ 📂 btns
  ┃ ┃ ┃ ┃ ┣ 📜 Btns.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Btns.scss
  ┃ ┃ ┃ ┣ 📂 info
  ┃ ┃ ┃ ┃ ┣ 📜 Info.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Info.scss
  ┃ ┃ ┃ ┣ 📂 mainWrap
  ┃ ┃ ┃ ┃ ┣ 📜 MainWrap.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 MainWrap.scss
  ┃ ┃ ┃ ┣ 📂 news
  ┃ ┃ ┃ ┃ ┣ 📜 News.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 News.scss
  ┃ ┃ ┃ ┣ 📂 visual
  ┃ ┃ ┃ ┃ ┣ 📜 Visual.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Visual.scss
  ┃ ┃ ┃ ┗ 📂 welcome
  ┃ ┃ ┃ ┃ ┣ 📜 Welcome.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Welcome.scss
  ┃ ┃ ┗ 📂 sub
  ┃ ┃ ┃ ┣ 📂 community
  ┃ ┃ ┃ ┃ ┣ 📜 Community.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Community.scss
  ┃ ┃ ┃ ┣ 📂 contact
  ┃ ┃ ┃ ┃ ┣ 📜 Contact.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Contact.scss
  ┃ ┃ ┃ ┣ 📂 department
  ┃ ┃ ┃ ┃ ┣ 📜 Department.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Department.scss
  ┃ ┃ ┃ ┣ 📂 gallery
  ┃ ┃ ┃ ┃ ┣ 📜 Gallery.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Gallery.scss
  ┃ ┃ ┃ ┣ 📂 members
  ┃ ┃ ┃ ┃ ┣ 📜 Members.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Members.scss
  ┃ ┃ ┃ ┗ 📂 youtube
  ┃ ┃ ┃ ┃ ┣ 📜 Youtube.jsx
  ┃ ┃ ┃ ┃ ┗ 📜 Youtube.scss
  ┃ ┣ 📂 hooks
  ┃ ┃ ┣ 📜 useDebounce.js
  ┃ ┃ ┣ 📜 useFlick.js
  ┃ ┃ ┣ 📜 useGlobalContext.js
  ┃ ┃ ┣ 📜 useMedia.js
  ┃ ┃ ┣ 📜 useSplitText.js
  ┃ ┃ ┣ 📜 useThrottle.js
  ┃ ┃ ┗ 📜 useYoutube.js
  ┃ ┗ 📂 styles
  ┃ ┃ ┣ 📜 global.scss
  ┃ ┃ ┣ 📜 index.css
  ┃ ┃ ┗ 📜 variable.scss
  ┣ 📜 .gitignore
  ┣ 📜 package-lock.json
  ┣ 📜 package.json
  ┗ 📜 README.md
  ```

# 프로젝트 파일별 소개

## useDebounce.js

![제목-없는-동영상-Clipchamp로-제작-_2_](https://github.com/Minminjamin/react_portfolio/assets/122540708/0215ad7d-d271-4fa1-b380-8675d7914ffb)

- 특정 시간이 지난 후 한 번만 이벤트가 실행되게 하기위해 만든 custom hook
  - Members 페이지에서 예외처리를 하기 위해 사용
  - 0.5초 안에 계속 특정 값이 변경되고 있으면 state 변경을 하고 있지 않다가 값 변경 후 0.5초가 지나야만 state 갱신하는 로직

## useFlickr.js

![ezgif-2-9dd350d5f1](https://github.com/Minminjamin/react_portfolio/assets/122540708/d6b09931-ddbf-49df-942b-2d1fe6c4b5bc)

- react-query로 fetching하는 hook인 userFlickrQuery를 통해 Gallery 페이지에서 사용할 이미지를 전달

  - interest와 내가 flickr에 올린 이미지, 검색한 이미지와 같은 3가지 fetching 유형을 fetchFlickr을 통해 fetching

  ```
  const  fetchFlickr  =  async ({ queryKey }) => {

  	const  opt  =  queryKey[1];

  	let  url  =  "";
  	const  api_key  =  process.env.REACT_APP_FLICKR_API_KEY;
  	const  num  =  50;
  	const  methodInterest  =  "flickr.interestingness.getList";
  	const  methodUser  =  "flickr.people.getPhotos";
  	const  methodSearch  =  "flickr.photos.search";

  	if (opt.type ===  "interest") {
  		url  =  `https://www.flickr.com/services/rest/?method=${methodInterest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
  	}

  	if (opt.type ===  "user") {
  		url  =  `https://www.flickr.com/services/rest/?method=${methodUser}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
  	}

  	if (opt.type ===  "search") {
  		url  =  `https://www.flickr.com/services/rest/?method=${methodSearch}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
  	}



  	const { data } =  await  axios.get(url);

  	return  data.photos.photo;

  };
  ```

## useGlobalContext.js

![1](https://github.com/Minminjamin/react_portfolio/assets/122540708/89e7010c-5299-4d4f-891b-c88906531ae6)
![2](https://github.com/Minminjamin/react_portfolio/assets/122540708/40c9084f-8b1c-4c83-b132-3b94bfe05a2d)
![3](https://github.com/Minminjamin/react_portfolio/assets/122540708/0482ebc5-65a9-4e3a-aff1-312a47434902)

- Context API를 활용해 modal과 menu open을 전역으로 관리, 테마 상태 관리
- 기존에 redux-toolkit으로 관리하던 modal과 menu의 open 상태를 리덕스로 관리하는 이유
  - 간단한 구조의 client side data는 redux라는 외부 라이브러리보다 React의 자체 기능인 Context API 기반의 createContext, useContext를 사용해 custom hook 형태로 간소화하면서도 효율적으로 관리하기 위해서 Context API를 사용

## useMedia.js

- 반응형 웹 페이지를 위해 브라우저가 리사이즈 될 때마다 브라우저의 사이즈를 측정해 클로 laptop, tablet, mobile로 반환하는 costom hook
  - 관리할 scss 파일이 많기도 하며, scss 파일마다 일일히 미디어 쿼리의 디바이스 폭을 지정하기는 비효율이므로 custom hook을 만듬
  - useMedia hook을 이용해서 브라우저 리사이즈시 브라우저 폭을 인지해서 특정 클래스명을 리턴하도록 처리하고 루트 컴포넌트인 App의 클래스에 해당 커스텀훅의 리턴값을 지정하면 효율적으로 미디어쿼리 구간을 관리하도록 로직을 구성

## useSplitText.js

![ezgif-2-e5db40cc01](https://github.com/Minminjamin/react_portfolio/assets/122540708/7daac5db-e80d-4caf-ae88-23df8d1a559b)

- 클라이언트가 있는 페이지의 제목을 애니메이션처럼 순차적으로 출력하는 custom hook

## useTrottle.js

- 이벤트 핸들러 함수의 물리적인 호출 횟수를 강제로 줄이기 위해 만든 custom hook
  - 0.4초 안에 버튼을 반복적으로 클릭하는 이벤트가 발생 시에 이벤트 호출에 강제로 인터벌을 발생시킴

## useYoutube.js

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/8722ad32-66ea-42f5-b963-472350295ff7)

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/d2d3fca8-2d51-4bf1-a0d0-795b6f9f29f4)

- useFlickr와 마찬가지로 react-query를 통해 fetching
- 유튜브의 플레이리스트를 fetching하며 두 컴포넌트에서 사용하기에 custom hook으로 만듬

## Main.jsx

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/52652211-a1e8-46d9-af7d-3006a6c882fc)

- main 페이지를 감싸는 컴포넌트
  - main 페이지로 라우팅시 Main 컴포넌트만이 출력

## Btns.jsx

![ezgif-5-7d8207a3cc](https://github.com/Minminjamin/react_portfolio/assets/122540708/4e5f8af2-9070-4a27-99f6-c08e655a0bad)

- 버튼을 클릭 시 같은 index 번째의 section으로 스크롤
  - asset폴더의 Anime.js를 통해 스크롤 모션
  - 스크롤이 해당 section의 offsetTop에 도달하면 버튼이 활성화
- useThrottle hook을 통해 0.4 초안의 반복적인 이벤트 핸들러 함수 호출이 불가하도록 로직 구성

## Welcome.jsx

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/2933ef80-6674-45cc-a2e4-a727bf69205d)

- 메인 페이지의 최상단 환영 페이지
  - 사진과 글을 겹침, section 전체에 이미지를 삽입하기 위해 css의 background-img 속성 사용

## Visual.jsx

![ezgif-4-815b681fdf](https://github.com/Minminjamin/react_portfolio/assets/122540708/96830cdd-9d43-4102-8e7b-4c0de1cf5ee1)

- useYoutube custom hook을 통해 fetching한 유튜브의 플레이리스트 데이터를 보여주는 컴포넌트
- 유튜브 플레이리스트의 데이터가 swipe를 통해 출력되며, 옆으로 스와이프시 다음 index의 썸네일(이미지)와 영상 제목, 간단한 설명이 출력
  - React/swiper API를 통해 스와이퍼 기능 구현
  - 해당 index의 정보만 표시되도록 하기 위해 className에 on이 들어간 정보만이 표시되도록 로직을 구성

```
{isSuccess  &&
	data.map((item, idx) => {
		if (idx  >=  6) return  null;

		return (
			<li  key={idx}  className={idx  ===  index  ?  "on"  :  ""}>
				<h3>{item.snippet.title}</h3>
				<p>{item.snippet.description.substr(0, 300) +  "..."}</p>

				<button
					onClick={() => {
						history.push(`/detail/${item.id}`);
					}}
				>
					View Detail
				</button>
			</li>
	);
})}
```

- View More 버튼을 클릭시 영상 상세보기 페이지로 연결
- 썸네일의 이미지가 모두 번진듯한 효과 \*동일한 이미지를 2개가 호출되도록 한 뒤, 첫 이미지를 블러 효과 및 채도 조절, 위치값과 확대

  ```
  //jsx
  <SwiperSlide  key={idx}>
  	<div  className="pic">
  		<img
  			src={item.snippet.thumbnails.maxres.url}
  			alt={item.title}
  		/>
  		<img
  			src={item.snippet.thumbnails.maxres.url}
  			alt={item.title}
  		/>
  	</div>
  </SwiperSlide>

  //scss
  .pic {
  	width:  100%;
  	height:  100%;
  	opacity:  0.4;
  	transform:  scale(0.5);
  	transition:  opacity  0.5s, transform  0.5s;
  	position:  relative;

  	img {
  		width:  100%;
  		height:  100%;
  		object-fit:  cover;
  		position:  absolute;
  		top:  0;
  		left:  0;

  		&:nth-of-type(1) {
  			filter:  blur(30px) saturate(120%);
  			transform:  translate(40px, 40px);
  			opacity:  0.7;
  		}
  	}
  }
  ```

## Info.jsx

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/a2f518d0-f59b-4749-acf8-6bc3cc650d5d)

- flickr 이미지 중 프론트엔드 개발자가 올린 가장 최신 이미지 6개를 보여주는 컴포넌트
  - useFlickr custom hook을 통해 데이터를 가져옴
- 이미지의 스타일 작업은 css의 gird 속성을 사용

## News.jsx

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/8bc4a80d-48a4-45e2-9be0-810170b26dba)

- localstorage에 작성된 데이터를 보여주는 컴포넌트
  - localstorage에 데이터가 없을 경우 더미 데이터 fetching

```
const  dummyData  =  useMemo(() => {
	return [
		//더미 데이터는 생략
	]
}, []);

const  getLocalData  =  useCallback(() => {
	const  data  =  localStorage.getItem("post");

	if (data) return  JSON.parse(data);
	else  return  dummyData;
}, [dummyData]);

const [post, setPost] =  useState(getLocalData());

useEffect(() => {
	setPost(getLocalData);
}, [getLocalData]);
```

## Header.jsx

![1](https://github.com/Minminjamin/react_portfolio/assets/122540708/89e7010c-5299-4d4f-891b-c88906531ae6)
![2](https://github.com/Minminjamin/react_portfolio/assets/122540708/40c9084f-8b1c-4c83-b132-3b94bfe05a2d)

- laptop이 아닌 mobile이나 tablet 환경일 경우 햄버거 메뉴 할성화
  - menu 창의 open과 close 여부는 Context API를 통해 관리
- Theme 버튼을 클릭 시 밝음/어두움 테마로 변경 가능
  - 밝음/어두움 테마는 Context API를 통해 관리
    ![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/c6e5aa85-ebc0-442b-b2c8-404953db74be)
    _ 테마가 변경된다면 className이 변경
    _ className에 해당하는 css를 통해 background와 color 등의 요소가 변경

## Layout.jsx

```
<section  ref={frame}  className={`layout ${title}`}>
	<h1  ref={tit}  className="pageTitle">{title}</h1>

	<div  className="bar"></div>

	<figure>
		<img  src={`${path}/img/sub_figure.jpg`}  alt="banner"  />
	</figure>

	<div  className="childrenWrap">{children}</div>
</section>
```

- sub 페이지(폴더)에서 사용되는 컴포넌트
  - sub 페이지들 사이에 해당 페이지의 title 출력과 공통된 배너 이미지가 출력되기에 사용
  - 공통되지 않은 각 페이지의 내용은 children 인자를 통해 Layout.jsx 페이지에 받음
- 해당 페이지의 title과
  컴포넌트 or hook 이름

## Menu.tsx

![ezgif-1-f0ee44fdfa](https://github.com/Minminjamin/react_portfolio/assets/122540708/fd6b02e6-237a-4d4e-8115-3b131ffab511)

- tablet과 mobile 사이즈 시에 활성화되는 햄버거 메뉴를 누를 경우 나타나는 컴포넌트
  - framer-motion을 통해 Menu 컴포넌트가 나타나는 것을 왼쪽에서 오른쪽으로 슬라이드 하듯 나타나도록 구현
- Context API를 통해 open과 close를 관리

## Modal.jsx

![ezgif-5-41172468eb](https://github.com/Minminjamin/react_portfolio/assets/122540708/27ed34eb-f3f6-479f-bfe8-6e4cd8d6ef6f)

- Gallery 컴포넌트에서 이미지 상세 보기를 클릭 했을 때 상세 보기로 사용되는 컴포넌트
  - Modal 컴포넌트가 마운드 될 경우 화면 스크롤이 불가능하도록 css 사용
    ```
    useEffect(() => {
    	modalOpen
    		? (document.body.style.overflow  =  "hidden")
    		: (document.body.style.overflow  =  "auto");
    }, [modalOpen]);
    ```
- Context API를 통해 open과 close를 관리

## SubTitle.jsx

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/e7fe49eb-8367-4470-948a-1e88252a7e0d)
![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/9ffebe33-a798-4d83-b32a-8259cdd8e055)

- 각 컴포넌트 별로 작은 소제목과 소제목의 소갯말의 스타일이 반복되기에 만든 컴포넌트

## Department.jsx

![ezgif-2-89415ccb7c](https://github.com/Minminjamin/react_portfolio/assets/122540708/3478a7c7-1e1a-49f6-a126-a5ea6d03aa34)

- 가상 회사의 구성원들과 간단한 회사 소개를 보여주는 컴포넌트
- 회사 member 데이터는 json을 통해 전역으로 관리
  - 정적인 데이터기에 fetch를 쓰지 않아도 되지만 데이터 기반으로 모든 화면단이 동적으로 생성되게 하고 싶어 fetch를 통해 member 데이터 형성
- 회사 멤버 사진에 hover 하면 사진이 확대, 멤버의 email을 클릭하면 email 페이지로 이동
- 회사 소개 이미지에 hover 시에 이미지가 컬러로 바뀌며 왼쪽으로 살짝 이동

  ```
  .pic {
  	width:  50vw;
  	overflow:  hidden;
  	position:  relative;

  	img {
  		width:  100%;
  		height:  100%;
  		filter:  grayscale(1);
  		object-fit:  cover;
  		transition:  transform  0.3s;
  		scale:  1.2;

  		&:hover {
  			filter:  grayscale(0);
  			transform:  translateX(-25px);
  		}
  	}
  }
  ```

## Community.jsx

![ezgif-2-98c9aa6199](https://github.com/Minminjamin/react_portfolio/assets/122540708/1ee8d2f1-95cd-43c5-95c9-9d7728c8f995)

- localstorage를 통한 게시글 CRUD를 할 수 있는 컴포넌트
  - DB 도입보다는 간단한 CRUD 실습과 localstorage 실습을 위해 localstorage 사용
- News 컴포넌트와 마찬가지로 localstorage에 데이터가 없다면 더미 데이터 fetch

  ```
  const  getLocalData  = () => {
  	const  data  =  localStorage.getItem("post");

  	if (data) return  JSON.parse(data);
  	else  return  dummyData.current;
  };

  const [post, setPost] =  useState(getLocalData());
  ```

- 글을 작성한 시간대를 localstorage에 같이 저장

  - 로컬 저장소에 글이 저장되는 시간은 표준 시간(GMT)기에 현재 한국 시간보다 9시간 늦은 시간으로 출력됨
  - 시간값을 변경하기 위해 JSON.stringify 형태로 불러온 뒤, 구조 분해 활당하여 hour 값 추출, hour에 9를 더해 현재 한국 시간을 출력

    ```
    const  dateTime  =  JSON.stringify(item.date);

    const [year, month, date] =  dateTime
    	.split("T")[0]
    	.split(`"`)[1]
    	.split("-");

    let [hour, min] =  dateTime.split("T")[1].split(".")[0].split(":");
    hour  =  parseInt(hour) +  9;
    hour  >=  24  && (hour  =  hour  -  24);
    ```

## Gallery.jsx

![ezgif-4-d3b6809c09 (1)](https://github.com/Minminjamin/react_portfolio/assets/122540708/23320b4e-c0cb-4d61-b5a7-7fff186c3886)

- useFlickr custom hook을 통해 fetch된 flickr 이미지를 보여주는 컴포넌트
  - 최초는 프론트엔드 개발자가 올린 이미지가 출력
  - Interest 버튼을 클릭 시 버튼의 className에 on이 추가되며 Interest 이미지 출력
  - 사용자 id를 클릭 시 사용자가 올린 이미지 출력
  - 검색 시에 해당 검색어에 해당하는 이미지가 출력
    - 검색어를 입력하지 않을 경우 alert 창을 통해 "검색어를 입력하세요"가 출력
- 활성화된 버튼에 className이 on이 되며 파란색 바탕에 흰 글자로 버튼 색상에 변경

  - 클릭한 버튼을 또 클릭할 시 같은 데이트를 불필요하게 fetching 하지 않도록 버튼에 on이 붙어있을 때 함수 호출을 강제로 중지

    ```
    //myGallery 클릭 이벤트 발생시 실행할 함
    const  onHanldeClickMy  = (e) => {
    	setIsUser(true);

    	//강제로 중지하는 로직
    	if (e.target.classList.contains("on")) return;

    	const  btns  =  btnSet.current.querySelectorAll("button");
    	btns.forEach((btn) =>  btn.classList.remove("on"));
    	e.target.classList.add("on");
    	setOpt({ type:  "user", id:  myId });
    };

    //Interest Gallery 클릭 이벤트 발생시 실행할 함수
    const  onHandleClickInterset  = (e) => {
    	setIsUser(false);

    	if (e.target.classList.contains("on")) return;
    	//코드 생략
    };
    ```

- 현재 출력되는 갤러리 방식이 user type 갤러리 일 때 사용자 id를 클릭하면 보이는 로직 때문에 같은 데이터 요청을 한 번 더 보냄

  - 사용자 타입의 갤러리를 호출할 때마다 IsUser state 값을 true로 변경해서 이벤트가 발생할 때마다 IsUser 값이 ture 사용자 아이디 클릭 이벤트 핸들러 방지

    ```
    const  onHanldeClickMy  = (e) => {
    	//myGallery 버튼을 클릭할 경우 isUser state값을 true로 변경해 이벤트 방지
    	setIsUser(true);

    	//코드 생략
    };

    const  onHandleClickInterset  = (e) => {
    	//interest 버튼을 클릭 시에는 user type 데이터를 fetching 받을 수 있도록 isUser state 값을 false로 변경
    	setIsUser(false);

    	//코드 생략
    };

    const  onHanldeProfile  = (e) => {
    	if (isUser) return;

    	//fetchData가 실행이 되면 다시 User type갤러리로 변경되므로 다시 IsUser값을 true로 변경
    	setOpt({ type:  "user", id:  e.target.innerText });
    	setIsUser(true);
    };
    ```

## Youtube.jsx

![ezgif-1-db620d15cc](https://github.com/Minminjamin/react_portfolio/assets/122540708/c3583cd3-5205-435a-a2c6-2026cf0615d9)

- useYoutube custom hook을 이용해 Youtube의 플레이리스트를 보여주는 컴포넌트
- 유튜브의 썸네일과 제목, 채널명, 영상의 설명이 출력

  - 유튜브 제목과 설명이 일정 수 이상 넘으면 잘라서 출력

    ```
    const  sliceTxt  = (text, num) => {
    	if (text.length >  num) {
    		return  text.substr(0, num) +  "...";
    	} else {
    		return  text;
    	}
    };

    return (
    	<>
    		//sliceTxt 함수를 사용하는 부분을 제외한 나머지 코드는 생략
    		<h3>{sliceTxt(item.snippet.title, 17)}</h3>

    		<p>{sliceTxt(item.snippet.description, 100)}</p>
    	</>
    )
    ```

  - 날짜는 문자열 배소드를 통해 가공해서 yyyy.mm.dd 형태로 출력
    ```
    <p  className="date">{date.split("T")[0].split("-").join(".")}</p>
    ```

- 유튜브 썸네일을 클릭할 경우 Detail 컴포넌트로 이동해 해당 영상 재상과 설명, 제목 보기를 할 수 있음
  - 유튜브 id는 url 파라미터 형식으로 전달

## Detail.jsx

![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/85bd1672-a608-4bf5-9ef1-b746f869cabf)

- 유튜브의 상세보기 컴포넌트
  - url의 파라미터를 통해 유튜브 영상 id를 추출해 다시 fetching 하는 방식을 통해 유튜브 데이터 출력

```
const { id } =  useParams();

const [youtube, setYoutube] =  useState();

useEffect(() => {
	const  api_key  =  process.env.REACT_APP_GOOGLE_API_KEY;
	const  baseURL  =  "https://www.googleapis.com/youtube/v3/playlistItems";

	fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippet`)
		.then((data) =>  data.json())
		.then((json) =>  setYoutube(json.items[0].snippet));
}, [id]);
```

## Members.jsx

![ezgif-1-625c6c53ec](https://github.com/Minminjamin/react_portfolio/assets/122540708/d5fd3d4d-b9f8-46bf-aab1-df039989fb8a)

- form 인증을 하는 컴포넌트
  - react-hook-form과 같은 라이브러리가 아닌 직접 form 인증 구현을 학습
- onChange 함수를 통해 state가 변할 때마다 조건에 맞게 입력했나 체크
  - 다만 state가 변할 때마다 re-rendering 되며 함수가 호출되는 것이 비효율적이기에 useDebounce custom hook을 통해 0.5초 동안 state 변화가 없으면 그 때 check 함수가 동작
- 입력 버튼을 클릭했을 때 errs state의 객체에 아무런 값도 없다면 alert를 통해 인증 통과 메세지 출력

  - 만약 errs state에 값이 있다면 그대로 return

  ```
  const  onHanldeSubmit  = (e) => {

  	e.preventDefault();

  	if (Object.keys(check(val)).length  ===  0) {
  		alert("인증 통과");
  	} else {
  		setErrs(check(val));
  	}
  };
  ```

- cancel 버튼을 클릭 시 폼의 내용이 reset

  ```
  const  resetForm  = (e) => {

  	e.preventDefault();

  	setVal(initval);

  	[refCheckGroup, refRadioGroup].forEach((item) =>
  		item.current
  			.querySelectorAll("input")
  			.forEach((input) => (input.checked =  false))
  	);

  	refSelGroup.current.value =  "";
  };
  ```

## Contact.jsx

![ezgif-5-20aec4ef07](https://github.com/Minminjamin/react_portfolio/assets/122540708/79936ee9-fdd8-41c1-8fa6-8cd06776b4ce)
![image](https://github.com/Minminjamin/react_portfolio/assets/122540708/49a65353-ce14-49bc-b19e-4d55977c62f5)

- 프론트엔드 개발자에게 Email을 보낼 수 있는 컴포넌트
  - EmailJS를 통해 0429el@gmail.com으로 메일 전송
- Kakao map api를 통해 kakao map을 출력하는 컴포넌트
  - Kakao map api는 cdn 방식으로 제공되기에 비구조화 활당 방식으로 kakao 객체 추출
    ```
    const { kakao } =  window;
    ```
  - 객체 형태를 통해 동적으로 지도 생성
    - 정보값이 자주 바뀌지 않기에 useRef를 통해 객체 참조
  - 지도의 교통 정보 보기/끄기, 지도 위치 초기화, 로드뷰 보기 기능
  -
  - 버튼을 눌렀을 경우 지도에 해당하는 지점의 위치가 마커로 표시
  - 브라우저 리사이즈 시 마커가 가운데 가지 않는 문제로 브라우저 리사이즈 이벤트 발생마다 마커가 가운데 위치하는 함수 호출

```
const  info  =  useRef([
	// 지도 정보는 생략
]);

useEffect(() => {
	// 위의 정보값을 활용한 마커 객체 생성

	const  marker  =  new  kakao.maps.Marker({
		position:  info.current[index].latlng,
		image:  new  kakao.maps.MarkerImage(
			info.current[index].imgSrc,
			info.current[index].imgSize,
			info.current[index].imgPos
		),
	});

	//Index값이 변경될때마다 새로운 지도 레이어가 중첩되므로 일단은 기존 map안의 모든 요소를 없애서 초기화
	map.current.innerHTML =  "";

	// 객체 정보를 활용한 지도 객체 생성
	instance.current  =  new  kakao.maps.Map(map.current, {
		center:  info.current[index].latlng,
		level:  1,
	});

	marker.setMap(instance.current);

	// 지도 타입 변경 UI 추가
	const  mapTypeControl  =  new  kakao.maps.MapTypeControl();

	instance.current.addControl(
		mapTypeControl,
		kakao.maps.ControlPosition.BOTTOMLEFT
	);


	window.addEventListener("resize", setCenter);



	// 로드뷰 관련 코드

	new  kakao.maps.RoadviewClient().getNearestPanoId(
		info.current[index].latlng,
		50,

		(panoId) => {
			new  kakao.maps.Roadview(view.current).setPanoId(
			panoId,
			info.current[index].latlng
			);
		}
	);

	return () => {
		window.removeEventListener("resize", setCenter);
	};
}, [index, kakao, setCenter]);

```

# 참고 자료

- 이미지 출처 : https://unsplash.com/ko
