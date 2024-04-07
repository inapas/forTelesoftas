import axios from 'axios';

const API_BASE_URL = 'https://gorest.co.in/public/v2';

const apiService = {
  getUsers: (page = 1, query = '') => axios.get(`${API_BASE_URL}/users?page=${page}&name=${query}`),
  getUserPosts: (userId) => axios.get(`${API_BASE_URL}/users/${userId}/posts`),
};


export default apiService;
