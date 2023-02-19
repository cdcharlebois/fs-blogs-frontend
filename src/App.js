import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isAddingBlog, setIsAddingBlog] = useState(false);

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
    _showGoodMessage(`Welcome, ${userData.user}`);
  }
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    _showGoodMessage("You have logged out.")
  }
  const handleCreateBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
    _showGoodMessage(`Your new blog with title ${newBlog.title} has been created`)
  }
  const handleUpdateBlog = async (blog) => {
    const updatedBlog = await blogService.updateBlog(blog);
    const newBlogs = blogs.filter((b) => b.id !== blog.id);
    setBlogs([...newBlogs, updatedBlog].sort((a, b) => b.likes - a.likes));
  };
  const handleLoginError = (message) => {
    _showBadMessage(message)
  };
  const handleToggleShowBlogForm = () => {
    setIsAddingBlog(!isAddingBlog);
  }
  const _showGoodMessage = (message) => {
    setMessage(message);
    setIsError(false);
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
    }, 3000)
  }
  const _showBadMessage = (message) => {
    setMessage(message);
    setIsError(true);
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
    }, 3000)
  }
  return (
    <div>
      {message !== null ? (
        <div style={{ color: isError ? "red" : "forestgreen" }}>{message}</div>
      ) : null}
      {user === null ? (
        <LoginForm onLogin={handleLogin} onError={handleLoginError} />
      ) : (
        <div>
          <p>
            {user.user} is logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
          {isAddingBlog ? (
            <div>
              <BlogForm onCreateBlog={handleCreateBlog} token={user.token} />
              <button onClick={handleToggleShowBlogForm}>cancel</button>
            </div>
          ) : (
            <button onClick={handleToggleShowBlogForm}>add blog</button>
          )}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
