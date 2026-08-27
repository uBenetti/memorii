import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export default function useAuth() {
    const token = localStorage.getItem("access");

    const [username, setUsername] = useState("");
    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [loading, setLoading] = useState(
        Boolean(token)
    );

    useEffect(() => {
        if (!token) {
            return;
        }

        getProfile(token)
            .then((data) => {
                setUsername(data.username);
                setIsAuthenticated(true);
            })
            .catch((error) => {
                console.error(error);

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                setIsAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [token]);

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUsername("");
        setIsAuthenticated(false);
        setLoading(false);
    };

    return {
        username,
        isAuthenticated,
        loading,
        logout
    };
}