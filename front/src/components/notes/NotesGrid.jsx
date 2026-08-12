import NoteCard from "./NoteCard";

export default function NotesGrid({
    notes,
    onDelete,
    onEdit,
    onUpdateItem,
    onAddChecklistItem,
    onDeleteChecklistItem,
    onTogglePin
}) {
    const orderedNotes = [...notes].sort(
        (a, b) => a.order - b.order
    );

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                alignItems: "start"
            }}
        >
            {orderedNotes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onUpdateItem={onUpdateItem}
                    onAddChecklistItem={onAddChecklistItem}
                    onDeleteItem={onDeleteChecklistItem}
                    onTogglePin={onTogglePin}
                />
            ))}
        </div>
    );
}