import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    //withCredentials: true,
});

// apiClient.interceptors.request.use((config) => {
//     // 토큰 추가 로직 등
//     return config;
// });
//
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => Promise.reject(error)
// );

export default apiClient;