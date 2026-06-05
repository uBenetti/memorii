import api from "../api/api"

export const getNotes = async (token) => {
    const response = await api.get("notes/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}