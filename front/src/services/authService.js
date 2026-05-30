import api from "../api/api";

export const getProfile = async (token) => {
  const response = await api.get("profile/", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};