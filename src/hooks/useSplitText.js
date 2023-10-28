export default function useSplitText(ref, gap = 0.1, delay = 0) {
  return (ref, gap = 0.1, delay = 0) => {
    let count = 0;
    let tags = "";

    for (let letter of ref.current.innerText) {
      tags += `<span style='transition-delay:${
        gap * count + delay
      }s'>${letter}</span>`;
      count++;
    }
    ref.current.innerText = " ";
    ref.current.innerHTML = tags;
  };
}

/*
	커스텀 훅을 사용하는 이유
	- 각각의 컴포넌트에서 자주쓰는 기능을 커스텀 hook형태로 제작해서
	- 같은 기능을 매번 컴포넌트 안에서 다시 제작하지 않고 커스텀훅 형태로 되어 있는 기능을 호출해서 재실행
	- 위의 훅 같은 경우는 첫번째 인수로 참조객체, interval, delay값을 인수로 받는 함수 자체를 리턴
	- 함수를 리턴하는 이유는 커스텀훅이 useEffect같은 또다른 훅이나 핸들러 함수 안쪽에서 호출할 수 없으므로
	- 특정 함수르 반환하게 하면 해당 함수는 원하는 hook, 핸들러함수 안쪽에서 자유롭게 호출할 수 있기 때문
*/
