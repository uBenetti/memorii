import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }){
    const token = localStorage.getItem("access");

    if (!token){
        return <Navigate to="/"/>;
    }

    return children;
}