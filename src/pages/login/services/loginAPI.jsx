import apiClient from 'pages/common/services/apiClient'

export const getAuth = async (emailId, password) => {
    const response = await apiClient.post(`/user/login`, {
        emailId,
        password,
    });

    return response.data;
};