export default function NoteForm({
    title,
    setTitle,
    content,
    setContent,
    editingId,
    onSubmit,
    onCancel
}){
    return(
        <div>
            <h3>
                {editingId ? "Editando Nota" : "Nova Nota"}
            </h3>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <textarea 
                placeholder="Conteúdo"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br />
            <br />

            <button onClick={onSubmit}>
                {editingId ? "Editar Nota" : "Criar Nota"}
            </button>

            {editingId && (
                <>
                    {" "}
                    <button onClick={onCancel}>
                        Cancelar
                    </button>
                </>
            )}

            <hr />
        </div>
    );
}