import apiClient from "../../../common/services/apiClient";

export const getProfileEdit = async (formData) =>{
    const response
    = await apiClient.put(`/user`, formData);
    return response.data;
};