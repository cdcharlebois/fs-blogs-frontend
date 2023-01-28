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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog }