import NoteCard from "./NoteCard";

export default function NotesGrid({
  notes,
  onDelete,
  onEdit,
  onUpdateItem,
  onAddChecklistItem,
  onDeleteChecklistItem
}) {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdateItem={onUpdateItem}
            onAddChecklistItem={onAddChecklistItem}
            onDeleteItem={onDeleteChecklistItem}
        />
      ))}
    </div>
  );
}