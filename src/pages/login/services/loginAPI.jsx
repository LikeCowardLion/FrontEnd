import apiClient from 'pages/common/services/apiClient'

//POST 방식
export const get = async (emailId, password) => {
    const response = await apiClient.post(`/user/login`, {
        emailId,
        password,
    });

    return response.data;
};