import React, { useEffect, useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Community.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import SubTitle from "../../common/subTitle/SubTitle";

const Community = () => {
  const dummyData = useRef([
    {
      title: "title4",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?4",
      date: new Date(),
    },
    {
      title: "title3",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?3",
      date: new Date(),
    },
    {
      title: "title2",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?2",
      date: new Date(),
    },
    {
      title: "title1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?1",
      date: new Date(),
    },
  ]);

  const getLocalData = () => {
    const data = localStorage.getItem("post");
    if (data) return JSON.parse(data);
    else return dummyData.current;
  };

  const refInput = useRef(null);
  const refTextArea = useRef(null);
  const refEditInput = useRef(null);
  const refEditTextArea = useRef(null);

  // 해당 컴포넌트가 처음 마운트시에는 로컬 저장소에 값이 없기에 빈배열 리턴
  const [post, setPost] = useState(getLocalData());
  const [allowed, setAllowed] = useState(true);

  const resetForm = () => {
    refInput.current.value = "";
    refTextArea.current.value = "";
  };

  const createPost = () => {
    if (!refInput.current.value.trim() || !refTextArea.current.value.trim()) {
      resetForm();
      return alert("제목과 본문을 모두 입력하세요.");
    }

    //기존 Posts 배열값을 Deep copy해서 가져온뒤, 그 뒤에 추가로 방금 입력한 객체를 배열에 추가
    setPost([
      {
        title: refInput.current.value,
        content: refTextArea.current.value,
        date: new Date(),
      },
      ...post,
    ]);
    resetForm();
  };

  const deletePost = (delIndex) => {
    //기존 Posts배열을 반복 돌면서 인수로 전달된 삭제 순번값과 현재 반복되는 배열의 순번값이 같지 않은 것만 리턴
    if (window.confirm("해당 게시글을 삭제하겠습니까?")) {
      setPost(post.filter((_, idx) => delIndex !== idx));
    }
  };

  // 해당 글을 수정모드로 변경시키는 함수
  const enableUpdate = (editIndex) => {
    //수정모드 함수 호출시 Allowed가 true가 아니면 return으로 함수 강제 종료
    if (!allowed) return;

    //일단 수정모드에 진입하면 강제로 Allowed값을 false로 변경해서 다른 글 수정모드 진입금지 처리
    setAllowed(false);
    setPost(
      // post 배열값을 반복돌면서 인수로 전달된 수정할 포스트의 순번값과 현재 반복도는 배열의 post 순번값이 일치하면 해당 글을 수정처리해야되므로 해당 객체의 enableUpdate=true 값을 추가
      post.map((item, idx) => {
        if (editIndex === idx) item.enableUpdate = true;

        return item;
      })
    );
  };

  // 해당 글을 출력모드로 변경시키는 함수
  const disableUpdate = (editIndex) => {
    setAllowed(true);
    setPost(
      post.map((item, idx) => {
        if (editIndex === idx) item.enableUpdate = false;

        return item;
      })
    );
  };

  // 실제 글 수정하는 함수
  const updatePost = (updateIndex) => {
    //setPosts로 기존 Post배열같은 덮어쓰기해서 변경
    //리액트에서는 참조형 자료는 무조건 배열값을 Deep copy한뒤 변경
    setPost(
      post.map((item, idx) => {
        if (updateIndex === idx) {
          item.title = refEditInput.current.value;
          item.content = refEditTextArea.current.value;
        }

        return item;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(post));
  }, [post]);

  return (
    <Layout title={"Community"}>
      <SubTitle description={"CREATE POST HERE"} title={"Bulletin Board"} />

      <content>
        <div className="leftBox">
          <div className="inputBox">
            <h3>Create Post</h3>
            <p>
              Your writing is stored in the local storage of the browser, not
              the DB. Thank you for visiting my portfolio site. Please feel free
              to leave a comment.
            </p>

            <label htmlFor="TITLE">TITLE</label>
            <input type="text" placeholder="Enter Title" ref={refInput} />

            <label htmlFor="CONTENT">CONTENT</label>
            <textarea
              ref={refTextArea}
              cols="30"
              rows="3"
              placeholder="Enter Content"
            ></textarea>

            <nav className="btnSet">
              <button onClick={resetForm} type="reset">
                Cancel
              </button>
              <button onClick={createPost} type="submit">
                Write
              </button>
            </nav>
          </div>
        </div>

        <div className="rightBox">
          <div className="showBox">
            {post.map((item, idx) => {
              const dateTime = JSON.stringify(item.date);
              const [year, month, date] = dateTime
                .split("T")[0]
                .split(`"`)[1]
                .split("-");
              let [hour, min] = dateTime.split("T")[1].split(".")[0].split(":");
              hour = parseInt(hour) + 9;
              hour >= 24 && (hour = hour - 24);

              if (item.enableUpdate) {
                return (
                  <article key={idx} className="editMode">
                    <div className="txt">
                      <h3>Update Post</h3>
                      <input
                        type="text"
                        defaultValue={item.title}
                        ref={refEditInput}
                      />
                      <br />
                      <textarea
                        // react에서 value 속성을 적용하려면 무조건 onChange 이벤트 연결 필수
                        // 그렇지 않다면 defaultValue가 필요
                        defaultValue={item.content}
                        ref={refEditTextArea}
                      ></textarea>
                    </div>

                    <div className="lower">
                      <nav className="iconBox">
                        <AiOutlineDelete onClick={() => disableUpdate(idx)} />
                        <AiOutlineEdit
                          className="edit"
                          onClick={() => {
                            updatePost(idx);
                            disableUpdate(idx);
                          }}
                        />
                      </nav>
                    </div>
                  </article>
                );
              } else {
                return (
                  <article key={idx} className="showContent">
                    <div>
                      <p>{`${year}-${month}-${date} · ${hour}:${min}`}</p>
                      <h3>{item.title}</h3>

                      <p className="content">{item.content}</p>
                    </div>
                    {/* <div className="txt"> */}
                    <div className="lower">
                      <nav className="iconBox">
                        <AiOutlineDelete onClick={() => deletePost(idx)} />
                        <AiOutlineEdit
                          className="edit"
                          onClick={() => enableUpdate(idx)}
                        />
                      </nav>
                    </div>
                  </article>
                );
              }
            })}
          </div>
        </div>
      </content>
    </Layout>
  );
};

export default Community;

/*## LocalStorage를 쓴 이유

- DB 도입보다는 간단한 CRUD를 구현하고 싶어서 LocalStorage를 만들어봄

## 시간대 불러오기

- 로컬 저장소에 글이 저장되는 시간은 표준 시간이기에 현재 시간보다 9시간 늦은 시간으로 출력됨
- 시간값을 변경하기 위해 JSON.parse 객체 형태로 시간을 불러와 split 메소드를 쓸 수 없어 고생함
- 객체 형태로 변환된 값을 stringify로 문자화 시킨 후 split으로 문자값을 가공 후 화면 출력

## 로컬 스토리지에 빈 데이터

- 로컬 스토리지에 값이 없을 때를 대비해 더미 데이터를 사용 */
