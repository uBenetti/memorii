import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import useAuth from "../hooks/useAuth";
import useNotes from "../hooks/useNotes";

export default function Dashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { username, logout } = useAuth();
  const {notes, createNewNote, deleteExistingNote, updateExistingNote} = useNotes();


  const handleCreateNote = async () => {
  try {
    if (editingId) {
      await updateExistingNote(
        editingId,
        {
          title,
          content,
          completed: false
        }
      );

      setEditingId(null);

    } else {

      await createNewNote({
        title,
        content,
        completed: false
      });

    }

    setTitle("");
    setContent("");

  } catch (error) {
    console.error(error);
  }
};

const handleDeleteNote = async (noteId) => {
  try {
    await deleteExistingNote(noteId);
  } catch (error) {
    console.error(error);
  }
};

const handleEditNote = (note) => {
  setEditingId(note.id);

  setTitle(note.title);

  setContent(note.content);
};

const handleCancelEdit = () =>{
  setEditingId(null);
  setTitle("");
  setContent("");
}

const handleLogout = () => {
  logout();
  navigate("/");
};

  return (
    <div>
      <Header
        username={username}
        onLogout={handleLogout}
      />
      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        editingId={editingId}
        onSubmit={handleCreateNote}
        onCancel={handleCancelEdit}
      />

      <h3>Minhas Notas</h3>
      {notes.map((note)=>(
        <NoteCard
          key={note.id}
          note={note}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
        />
      ))}
    </div>
  );
}