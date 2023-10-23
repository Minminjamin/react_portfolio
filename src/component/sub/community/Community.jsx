import React, { useEffect, useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Community.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Community = () => {
  const dummyData = [
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
  ];

  const getLocalData = () => {
    const data = localStorage.getItem("post");
    if (data) return JSON.parse(data);
    else return dummyData;
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
    if (window.confirm("해당 게시글을 삭제하겠습니까?")) {
      setPost(post.filter((_, idx) => delIndex !== idx));
    }
  };

  // 해당 글을 수정모드로 변경시키는 함수
  const enableUpdate = (editIndex) => {
    if (!allowed) return;

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

  const updatePost = (updateIndex) => {
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
      <div className="top">
        <p>CREATE POST HERE</p>
        <h2>Bulletin Board</h2>
      </div>

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
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                        ref={refEditInput}
                      />
                      <br />
                      <textarea
                        // react에서 value 속성을 적용하려면 무조건 onChange 이벤트 연결 필수
                        // 그렇지 않다면 defaultValue가 필요
                        defaultValue={item.content}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
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
