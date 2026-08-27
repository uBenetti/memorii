import axios from "axios";

const api = axios.create({
    baseURL: "/api/"
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        const isUnauthorized =
            error.response?.status === 401;

        const alreadyRetried =
            originalRequest?._retry;

        const isRefreshRequest =
            originalRequest?.url?.includes(
                "token/refresh/"
            );

        if (
            isUnauthorized &&
            !alreadyRetried &&
            !isRefreshRequest
        ) {
            originalRequest._retry = true;

            const refreshToken =
                localStorage.getItem("refresh");

            if (!refreshToken) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.href = "/";

                return Promise.reject(error);
            }

            try {
                const response = await axios.post(
                    "/api/token/refresh/",
                    {
                        refresh: refreshToken
                    }
                );

                const newAccessToken =
                    response.data.access;

                localStorage.setItem(
                    "access",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;