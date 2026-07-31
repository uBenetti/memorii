import ChecklistItem from "./ChecklistItem";

export default function NoteCard({
    note,
    onEdit,
    onDelete,
    onUpdateItem,
    onAddChecklistItem,
    onDeleteItem
}) {
    return (
        <div>
            <h4>{note.title}</h4>

            {note.note_type === "text" && (
                <p style={{whiteSpace: "pre-wrap" }}>
                    {note.content}
                </p>
            )}

            {note.note_type === "checklist" && (
                <div>
                    {note.items?.map((item) => (
                        <ChecklistItem
                            key={item.id}
                            item={item}
                            onUpdate={onUpdateItem}
                            onDelete={onDeleteItem}
                        />
                    ))}

                    <button
                        onClick={() => {
                            console.log("Botão clicado", note.id);
                            onAddChecklistItem(note.id);
                        }}
                    >
                        + Novo Item
                    </button>
                </div>
            )}

            <button
                onClick={() => onDelete(note.id)}
            >
                Excluir
            </button>

            {note.note_type === "text" && (
                <button
                    onClick={() => onEdit(note)}
                >
                    Editar
                </button>
            )}

            <hr />
        </div>
    );
}