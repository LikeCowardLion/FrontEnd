import apiClient from 'pages/common/services/apiClient'

export const getResultCount = async (userId) => {
  const response
      = await apiClient.get(`/user/${userId}/result/count`);
  return response.data;
};