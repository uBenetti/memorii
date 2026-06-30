export default function NotesGrid({
  notes,
  onDelete,
  onEdit
}) {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          {/* Aqui ficará o NoteCard */}
        </div>
      ))}
    </div>
  );
}