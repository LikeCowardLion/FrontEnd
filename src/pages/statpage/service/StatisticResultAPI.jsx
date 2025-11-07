import apiClient from 'pages/common/services/apiClient'

//dayGraph
export const getStatisticResult = async (userId, gameId) => {
    const response
        = await apiClient.get(`/user/${userId}/result/statistic/${gameId}`);
    return response.data;
};