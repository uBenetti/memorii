import ChecklistItem from "./ChecklistItem";

export default function NoteCard({
    note,
    onEdit,
    onDelete,
    onUpdateItem,
    onDeleteItem,
    onAddChecklistItem,
    onTogglePin,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    isDragging,
    disableDrag
}) {

    return (
        <div
            draggable={disableDrag}
            onDragStart={
                disableDrag
                    ? undefined
                    : (event) => onDragStart(event, note.id)
            }
            onDragOver={
                disableDrag
                    ? undefined
                    : (event) => onDragOver(event, note.id)   
            }
            onDrop={
                disableDrag
                    ? undefined
                    : (event) => onDrop(event, note.id)
            }
            onDragEnd={
                disableDrag
                    ? undefined
                    : onDragEnd
            }
            style={{
                opacity: isDragging ? 0.2 : 1,
                cursor: disableDrag ? "default" : "grab"
            }}
        >
            <div>
                <h4>{note.title}</h4>

                <button
                    onClick={() =>
                        onTogglePin(
                            note.id,
                            !note.pinned
                        )
                    }
                    title={
                        note.pinned
                            ? "Desfixar nota"
                            : "Fixar nota"
                    }
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent"
                    }}
                >
                    {note.pinned ? "📍" : "📌"}
                </button>
            </div>

            {note.note_type === "text" && (
                <p style={{ whiteSpace: "pre-wrap" }}>
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
                        onClick={() =>
                            onAddChecklistItem(note.id)
                        }
                    >
                        +
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