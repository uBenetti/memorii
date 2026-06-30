import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import NotesGrid from "../components/notes/NotesGrid";
import useAuth from "../hooks/useAuth";
import useNotes from "../hooks/useNotes";
import CreateNoteModal from "../components/notes/CreateNoteModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { username, logout } = useAuth();
  const {notes, createNewNote, deleteExistingNote, updateExistingNote} = useNotes();
  const [showCreateModal, setShowCreateModal] = useState(false);

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

      <div>
        <button onClick={() => setShowCreateModal(true)}>
          Criar Nova Nota
        </button>
      </div>

      <h3>Minhas Notas</h3>
        <NotesGrid
          notes={notes}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
        />
        <CreateNoteModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
    </div>
  );
}