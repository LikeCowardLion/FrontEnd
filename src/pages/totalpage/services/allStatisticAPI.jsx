import apiClient from 'pages/common/services/apiClient'

export const getAllStatistic = async (userId) => {
    const response
        = await apiClient.get(`/user/${userId}/result/statistic`)

    return response.data;
};