export default function NoteCard({
    note,
    onEdit,
    onDelete
}){
    return(
        <div>
            <h4>{note.title}</h4>
            
            {note.note_type === "text" && (
                <p>
                    {note.content}
                </p>
            )}

            {note.note_type === "checklist" && (
                <div>
                    {note.items?.map((item) =>(
                        <div key={item.id}>
                            <input
                                type="checkbox"
                                checked={item.completed}
                                readOnly
                            />

                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={() => onDelete(note.id)}>
                Excluir
            </button>

            {note.note_type === "text" && (
                <button onClick={() => onEdit(note)}>
                    Editar
                </button>
            )}

            <hr />
        </div>
    );
}