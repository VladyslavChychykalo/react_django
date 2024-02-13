import { date_formatter } from "./helpers/date-formatter";
import useFetch from "./hooks/useFetch";

type PostType = {
  id: number;
  title: string;
  author: string;
  text: string;
  created_date: string;
  published_date: string;
};

function App() {
  const { apiData } = useFetch("posts/", "get");

  console.log(apiData);
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {apiData?.objects?.map((post: PostType) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <p>Author: {post.author}</p>
            <p>
              {"Created: " +
                (post.created_date ? date_formatter(post.created_date) : "n/a")}
            </p>
            <p>
              {"Published: " +
                (post.published_date
                  ? date_formatter(post.published_date)
                  : "n/a")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
