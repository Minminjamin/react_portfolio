import React, { useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "../community/Community.scss";

const Community = () => {
  const refInput = useRef(null);
  const refTextArea = useRef(null);

  const [post, setPost] = useState([]);

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
        {post.map((item, idx) => (
          <article key={idx}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default Community;
