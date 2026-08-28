export default function NoteSearch({
    search,
    onSearcheChange
}){
    return(
        <div>
            <input
                type="text"
                placeholder="Pesquisar..."
                value={search}
                onChange={(event) =>
                    onSearcheChange(event.target.value)
                }
            />
        </div>
    );
}