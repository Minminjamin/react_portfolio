import React, { useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "../community/Community.scss";

const Community = () => {
  const refInput = useRef(null);
  const refTextArea = useRef(null);

  const [post, setPost] = useState([]);

  console.log(post);
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
      { title: refInput.current.value, content: refTextArea.current.value },
      ...post,
    ]);
    resetForm();
  };

  const deletePost = (delIndex) => {
    setPost(post.filter((_, idx) => delIndex !== idx));
  };

  // 해당 글을 수정모드로 변경시키는 함수
  const enableUpdate = (editIndex) => {
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
    setPost(
      post.map((item, idx) => {
        if (editIndex === idx) item.enableUpdate = false;

        return item;
      })
    );
  };
  return (
    <Layout title={"Community"}>
      <div className="inputBox">
        <input type="text" placeholder="제목을 입력하세요." ref={refInput} />
        <br />
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

      <div className="showBox">
        {post.map((item, idx) => {
          if (item.enableUpdate) {
            return (
              <article key={idx}>
                <div className="txt">
                  <input
                    type="text"
                    defaultValue={item.title}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                  <br />
                  <textarea
                    // react에서 value 속성을 적용하려면 무조건 onChange 이벤트 연결 필수
                    // 그렇지 않다면 defaultValue가 필요
                    defaultValue={item.content}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  ></textarea>
                </div>
                <nav className="btnSet">
                  <button onClick={() => disableUpdate(idx)}>Cancel</button>
                  <button>Update</button>
                </nav>
              </article>
            );
          } else {
            return (
              <article key={idx}>
                <div className="txt">
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                </div>

                <nav className="btnSet">
                  <button onClick={() => enableUpdate(idx)}>Edit</button>
                  <button onClick={() => deletePost(idx)}>Delete</button>
                </nav>
              </article>
            );
          }
        })}
      </div>
    </Layout>
  );
};

export default Community;
