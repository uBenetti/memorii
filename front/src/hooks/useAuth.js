import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export default function useAuth() {
    const [username, setUsername] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            setLoading(false);
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
    }, []);

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUsername("");
        setIsAuthenticated(false);
    };

    return {
        username,
        isAuthenticated,
        loading,
        logout
    };
}