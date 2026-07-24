import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }){
    const {
        isAuthenticated,
        loading
    } = useAuth();

    if (loading){
        return <p>Autenticando...</p>
    }

    if(!isAuthenticated){
        return(
            <Navigate
                to="/"
                state={{
                    message: "Você precisa estar logado."
                }}
                replace
            />
        );
    }

    return children;
}