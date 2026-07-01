export default function Header({
    username,
    onLogout,
}){
    return(
        <header>
            <h1>Memorii</h1>
            
            <h2>Olá, {username}</h2>

            <button onClick={onLogout}>
                Sair
            </button>

            <hr />
        </header>
    );
}