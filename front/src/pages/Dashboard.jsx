import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { getNotes, createNote, deleteNote } from "../services/noteService";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    const newNote = await createNote(token, {
      title,
      content,
      completed: false
    });

    setNotes([...notes, newNote]);

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

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Olá, {username}</h2>

      <hr />
      <h3>Nova Nota</h3>
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
        Criar Nota
      </button>
      
      <hr />

      <h3>Minhas Notas</h3>
      {notes.map((note) => (
        <div key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>

          <button onClick={() => handleDeleteNote(note.id)}>
            Excluir
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}