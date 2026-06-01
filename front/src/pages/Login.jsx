import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try{
            const data = await login(username, password);

            localStorage.setItem("access", data.access);

            alert("Login realizado com sucesso!");
        } catch (error){
            console.error(error);
            alert("Usuário ou senha inválidos");
        }
    };

    return(
        <div>
            <h1>Login</h1>

            <input 
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br />
            <br />
            
            <input 
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}