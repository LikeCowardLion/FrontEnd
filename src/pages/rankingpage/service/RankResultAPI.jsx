import apiClient from 'pages/common/services/apiClient'


export const getRankResult = async (userId, gameId) => {
    const response
        = await apiClient.get(`/user/${userId}/result/rank/${gameId}`);
    return response.data;
};