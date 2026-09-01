import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import NotesGrid from "../components/notes/NotesGrid";
import useAuth from "../hooks/useAuth";
import useNotes from "../hooks/useNotes";
import CreateNoteModal from "../components/notes/CreateNoteModal";
import EditNoteModal from "../components/notes/EditingNoteModal";
import NotesSearch from "../components/notes/NotesSearch";

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
    reorderExistingNote,
    reorderExistingChecklistItems
  } = useNotes();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  const isSearching = search.trim().length > 0;

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

const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase();

    const titleMatches =
        note.title
            ?.toLowerCase()
            .includes(searchText);

    const contentMatches =
        note.content
            ?.toLowerCase()
            .includes(searchText);

    const checklistMatches =
        note.items?.some((item) =>
            item.text
                ?.toLowerCase()
                .includes(searchText)
        );

    return (
        titleMatches ||
        contentMatches ||
        checklistMatches
    );
});

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

      <NotesSearch
        search={search}
        onSearchChange={setSearch}
      />

      <h3>Minhas Notas</h3>
      
      {loading ? (
        <p>Carregando notas...</p>
      ) : filteredNotes.length === 0 ? (
        <p>
          Nenhuma Nota encontrada
        </p>
      ) : (
        <NotesGrid
          notes={filteredNotes}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
          onUpdateItem={updateExistingChecklistItem}
          onAddChecklistItem={addChecklistItem}
          onDeleteChecklistItem={removeChecklistItem}
          onTogglePin={toggleNotePin}
          onReorder={reorderExistingNote}
          onReorderChecklistItems={reorderExistingChecklistItems}
          disableDrag={isSearching}
        />
      )}
    </div>
  );
}