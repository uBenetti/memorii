import { useEffect } from "react";
import { getProfile } from "../services/authService";

export default function Dashboard(){
    useEffect(() => {
        const token = prompt("Cole seu Access Token");

        getProfile(token)
            .then(data => {
                console.log(data);
            })
            .catch(error=>{
                console.error(error);
            });
    }, []);

    return <h1>Dashboard</h1>;
}