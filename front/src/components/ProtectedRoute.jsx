import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }){
    const token = localStorage.getItem("access");

    if (!token){
        return (
            <Navigate
                to="/"
                state={{
                    message: "Você precisa estar logado para acessar esta página!"
                }}
                replace
            />
        );
    }

    return children;
}