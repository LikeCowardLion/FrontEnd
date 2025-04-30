import apiClient from 'pages/common/services/apiClient'

export const getMonthResult = async (userId, year, month) => {
    const response
        = await apiClient.get(`/user/${userId}/result/month/${year}/${month}`);
    return response.data;
};