import api from "../api/api";

export const login = async (
    username,
    password
) => {
    const response = await api.post(
        "token/",
        {
            username,
            password
        }
    );

    return response.data;
};

export const getProfile = async (token) => {
    const response = await api.get(
        "profile/",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};