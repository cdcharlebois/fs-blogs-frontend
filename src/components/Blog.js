import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleClickLike = () => {
    blog.likes++;
    updateBlog(blog);
  };
  const userString = () => {
    if (blog.user && blog.user.username) {
      return blog.user.username;
    }
    return "unknown";
  };
  return (
    <div>
      <h3>
        {blog.title}{" "}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "show"} details
        </button>
      </h3>
      {showDetails ? (
        <div>
          <div>Author: {blog.author}</div>
          <div>
            Likes: {blog.likes} <button onClick={handleClickLike}>like!</button>
          </div>
          <div>URL: {blog.url}</div>
          <div>User: {userString()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
