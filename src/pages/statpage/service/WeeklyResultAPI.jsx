import apiClient from 'pages/common/services/apiClient'

//dayGraph
export const getWeeklyResult = async (userId, gameId) => {
    const response
        = await apiClient.get(`/user/${userId}/result/week/${gameId}`);
    return response.data;
};