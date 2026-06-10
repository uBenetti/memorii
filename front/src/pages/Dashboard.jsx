import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { getNotes, createNote, deleteNote, updateNote } from "../services/noteService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    getProfile(token)
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error(error);
      });

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

const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  navigate("/");
};

  return (
    <div>
      <Header
        username={username}
        onLogout={handleLogout}
      />
      <h3>
        {editingId ? "Editando Nota" : "Nova Nota"}
      </h3>
      <input type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCreateNote}>
        {editingId ? "Editar Nota" : "Criar Nota"}
      </button>
      
      {editingId && (
        <button
        onClick={() => {
          setEditingId(null);
          setTitle("");
          setContent("");
        }}
        style={{ marginLeft: "10px" }}
        >
          Cancelar
        </button>
      )}

      <hr />

      <h3>Minhas Notas</h3>
      {notes.map((note) => (
        <div key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>

          <button onClick={() => handleDeleteNote(note.id)}>
            Excluir
          </button>

          <button onClick={() => handleEditNote(note)}>
            Editar
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}