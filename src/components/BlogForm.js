import { useState } from "react"
import blogs from "../services/blogs";


const BlogForm = ({token, onCreateBlog}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handlUrlChange = (e) => {
        setUrl(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: POST /api/blogs
        const newBlog = await blogs.createBlog({title, author, url}, token);
        onCreateBlog(newBlog);
        setAuthor("");
        setTitle("");
        setUrl("");
    }
    return (
        <div>
            <div>Title: <input type="text" value={title} onChange={handleTitleChange} /></div>
            <div>Author: <input type="text" value={author} onChange={handleAuthorChange} /></div>
            <div>Url: <input type="text" value={url} onChange={handlUrlChange} /></div>
            <button onClick={handleSubmit} type="submit">Save</button>
        </div>
    )
}

export default BlogForm;