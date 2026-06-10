export default function Header({username, onLogout}){
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Olá, {username}</h2>

            <button onClick={onLogout}>Sair</button>
            <hr />
        </div>
    )
}