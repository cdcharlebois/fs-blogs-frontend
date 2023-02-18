import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <h3>{blog.title} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "hide" : "show"} details</button></h3>
      {showDetails ? <div>
        <div>Author: {blog.author}</div>
        <div>Likes: {blog.likes}</div>
        <div>URL: {blog.url}</div>
      </div> : null}
    </div>
  );
};

export default Blog;
