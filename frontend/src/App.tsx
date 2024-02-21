import { useEffect, useState } from "react";
import { axios_api_instance } from "./axios_helpers/axios_api";
import { ModalAntdAddBlog } from "./components/modal/modal_add";
import { ModalAntdDeleteBlog } from "./components/modal/modal_delete";
import { ModalEditAntdBlog } from "./components/modal/modal_edit";
import { date_formatter } from "./helpers/date-formatter";
import { PostType } from "./models/model";

function App() {
  const [data, setData] = useState<PostType[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios_api_instance.get("posts/");
        console.log("response:", response.data);
        setData(response.data.objects);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="header-container">
        <h1>Blog</h1>
        <ModalAntdAddBlog setData={setData} />
      </div>

      <ul>
        {data?.map((post: PostType) => (
          <li key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>
                <strong>Text: </strong>
                {post.text}
              </p>
              <p style={{ textTransform: "capitalize" }}>
                <strong>Author: </strong>
                {post.author}
              </p>
              <p>
                <strong>Created: </strong>
                {post.created_date ? date_formatter(post.created_date) : "n/a"}
              </p>
              <p>
                <strong>Published: </strong>
                {post.published_date
                  ? date_formatter(post.published_date)
                  : "n/a"}
              </p>
            </div>
            <div className="btn-container">
              <ModalEditAntdBlog editData={post} setData={setData} />
              <ModalAntdDeleteBlog post_id={post.id} setData={setData} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
