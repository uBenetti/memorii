import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "../services/noteService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const {
    username,
    logout
  } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("access");

    getNotes(token)
        .then((data) => {
          setNotes(data);
        })
        .catch((error) => {
          console.error(error);
        })
  }, []);

const handleCreateNote = async () => {
  const token = localStorage.getItem("access");

  try {

    if (editingId) {

      const updatedNote = await updateNote(
        token,
        editingId,
        {
          title,
          content,
          completed: false
        }
      );

      setNotes(
        notes.map(note =>
          note.id === editingId
            ? updatedNote
            : note
        )
      );

      setEditingId(null);

    } else {

      const newNote = await createNote(
        token,
        {
          title,
          content,
          completed: false
        }
      );

      setNotes([
        ...notes,
        newNote
      ]);
    }

    setTitle("");
    setContent("");

  } catch (error) {
    console.error(error);
  }
};

const handleDeleteNote = async (noteId) => {
  const token = localStorage.getItem("access");

  try{
    await deleteNote(token, noteId);

    setNotes(notes.filter(note => note.id !== noteId));

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