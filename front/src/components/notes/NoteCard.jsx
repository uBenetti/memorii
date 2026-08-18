import ChecklistItem from "./ChecklistItem";

export default function NoteCard({
    note,
    onEdit,
    onDelete,
    onUpdateItem,
    onDeleteItem,
    onAddChecklistItem,
    onTogglePin,
    onReorder
}) {

    const handleDragStart = (event) => {
        event.dataTransfer.setData(
            "noteId",
            note.id.toString()
        );
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();

        const draggedNoteId = Number(
            event.dataTransfer.getData("noteId")
        );

        if (draggedNoteId === note.id) {
            return;
        }

        onReorder(draggedNoteId, note.id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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