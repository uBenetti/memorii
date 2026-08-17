import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import NotesGrid from "../components/notes/NotesGrid";
import useAuth from "../hooks/useAuth";
import useNotes from "../hooks/useNotes";
import CreateNoteModal from "../components/notes/CreateNoteModal";
import EditNoteModal from "../components/notes/EditingNoteModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();
  const {
    notes,
    loading,
    createNewNote,
    deleteExistingNote,
    updateExistingNote,
    updateExistingChecklistItem,
    addChecklistItem,
    removeChecklistItem,
    toggleNotePin,
    reorderExistingNote
  } = useNotes();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

const handleDeleteNote = async (noteId) => {
  try {
    await deleteExistingNote(noteId);
  } catch (error) {
    console.error(error);
  }
};

const handleEditNote = (note) => {
  setSelectedNote(note);
  setShowEditModal(true);
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
          Nova Anotação
        </button>

        <CreateNoteModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          createNewNote={createNewNote}
        />

        <EditNoteModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedNote(null);
          }}
          note={selectedNote}
          onUpdate={updateExistingNote}
        />

      </div>

      <h3>Minhas Notas</h3>
      
      {loading ? (
        <p>Carregando notas...</p>
      ) : (
        <NotesGrid
          notes={notes}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
          onUpdateItem={updateExistingChecklistItem}
          onAddChecklistItem={addChecklistItem}
          onDeleteChecklistItem={removeChecklistItem}
          onTogglePin={toggleNotePin}
          onReorder={reorderExistingNote}
        />
      )}
    </div>
  );
}