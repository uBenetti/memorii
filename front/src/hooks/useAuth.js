import { useEffect, useState } from "react";
import {getProfile} from "../services/authService";

export default function useAuth(){
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) return;
        getProfile(token)
            .then((data) => {
                setUsername(data.username);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const logout =() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    };

    return{
        username,
        logout
    };
}
