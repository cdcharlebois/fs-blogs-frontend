import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const foundUser = window.localStorage.getItem("user");
    if (foundUser) {
      setUser(JSON.parse(foundUser));
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData);
    window.localStorage.setItem("user", JSON.stringify(userData));
  }
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  }
  const handleCreateBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  }
  return (
    <div>
      {user === null ? (
        <LoginForm onLogin={handleLogin}/>
      ) : (
        <div>
          <p>{user.user} is logged in <button onClick={handleLogout}>Logout</button></p>
          <BlogForm onCreateBlog={handleCreateBlog} token={user.token}/>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
