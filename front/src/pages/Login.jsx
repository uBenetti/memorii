import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const location = useLocation();

    const handleLogin = async () => {
        try{
            const data = await login(username, password);

            localStorage.setItem("access", data.access);

            navigate("/dashboard");
        } catch (error){
            console.error(error);
            alert("Usuário ou senha inválidos");
        }
    };

    return(
        <div>
            <h1>Login</h1>
            {location.state?.message && (
                <p>{location.state.message}</p>
            )}

            <input 
                type="text"
                placeholder="Usuário..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ fontStyle: 'italic' }}
            />

            <br />
            <br />
            
            <input 
                type="password"
                placeholder="Senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}