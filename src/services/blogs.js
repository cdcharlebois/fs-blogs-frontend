import axios from 'axios'
const baseUrl = '/api/blogs'

// let token = "";

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data
}

const updateBlog = async (blog, token) => {
  // we don't actually use this on the update route, but here as boilerplate
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, updateBlog }