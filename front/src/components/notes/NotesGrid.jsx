import NoteCard from "./NoteCard";

export default function NotesGrid({
  notes,
  onDelete,
  onEdit,
  onUpdateItem,
  onAddChecklistItem
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
        />
      ))}
    </div>
  );
}