import api from "../api/api"

export const getNotes = async (token) => {
    const response = await api.get("notes/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export const createNote = async (token, noteData) => {
    const response = await api.post(
        "notes/",
        noteData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

