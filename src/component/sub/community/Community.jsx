import React, { useEffect, useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "../community/Community.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const path = process.env.PUBLIC_URL;

const Community = () => {
  const getLocalData = () => {
    const data = localStorage.getItem("post");
    if (data) return JSON.parse(data);
    else return [];
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
        <h2>This is the community page where we all communicate</h2>
        <div className="sub">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            perferendis, fuga veritatis non velit atque eum dicta sunt vero
            magnam earum voluptates aut, quod provident quam ea! Magnam, ea
            dolorum.
          </p>

          <p>
            <b>Create Post</b>
          </p>
        </div>
      </div>

      <content>
        <div className="leftBox">
          <div className="inputBox">
            <h3>Create Post</h3>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              ref={refInput}
            />

            <textarea
              ref={refTextArea}
              cols="30"
              rows="3"
              placeholder="본문을 입력하세요."
            ></textarea>

            <nav className="btnSet">
              <button onClick={resetForm}>Cancel</button>
              <button onClick={createPost}>Write</button>
            </nav>
          </div>
          <div className="conBox">
            <div className="con">
              <div className="pic">
                <img src={`${path}/img/park.jpg`} alt="park" />
              </div>
              <div className="text">
                <h3>Hello User!</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque sint vero, laborum cumque officia ipsa enim iste sit
                  delectus aspernatur rerum odit quisquam assumenda. Nihil
                  impedit, quam ipsa perspiciatis temporibus dolores eos
                  laudantium animi quo ad. Ab vero beatae eum laudantium
                  accusamus corporis ipsam. Impedit a corrupti itaque delectus,
                  distinctio cumque commodi! Ut, quia placeat. Ipsum sit
                  corrupti nobis rem iste amet nam blanditiis reiciendis quod
                  consectetur, dolorem voluptatem minus officiis ullam nulla
                  optio neque assumenda fugiat. Tempore laborum asperiores
                  provident dignissimos mollitia eveniet iste hic excepturi enim
                  accusantium illo, ipsa repellendus facilis assumenda magni
                  omnis optio. Excepturi aspernatur vitae quia maxime qui, porro
                  animi maiores quasi eum cum ipsa provident exercitationem illo
                  accusamus ea labore, adipisci reiciendis a fugiat facilis!
                  Aliquam minima eligendi aliquid fuga provident, eum nihil
                  nulla nostrum sint magni totam impedit blanditiis neque
                  voluptate incidunt commodi ea hic enim quam, temporibus,
                  assumenda facilis. Temporibus, harum fugiat!
                </p>
              </div>
            </div>

            <div className="con"></div>
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
                      {/* <nav className="btnSet">
                        <button onClick={() => enableUpdate(idx)}>Edit</button>
                        <button onClick={() => deletePost(idx)}>Delete</button>
                      </nav> */}
                    </div>
                    {/* </div> */}
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
