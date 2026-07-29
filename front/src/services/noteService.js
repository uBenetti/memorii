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

export const deleteNote = async (token, noteId) => {
    await api.delete(`notes/${noteId}/`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateNote = async(
    token,
    noteId,
    noteData
) => {
    const response = await api.put(
        `notes/${noteId}/`,
        noteData,
        {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateChecklistItem = async (
    token,
    itemId,
    itemData
) => {
    const response = await api.patch(
        `checklist-items/${itemId}/`,
        itemData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const createChecklistItem = async(token, noteId, order) => {
    const response = await api.post(
        "checklist-items/",{
            note: noteId,
            text: "",
            completed: false,
            order
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteChecklistItem = async(token, itemId) =>{
    await api.delete(
        `checklist-items/${itemId}/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
