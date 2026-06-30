import NoteCard from "./NoteCard";

export default function NotesGrid({
  notes,
  onDelete,
  onEdit
}) {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
        />
      ))}
    </div>
  );
}