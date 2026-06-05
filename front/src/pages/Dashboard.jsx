import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { getNotes } from "../services/noteService";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);

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

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Olá, {username}</h2>

      <hr />

      <h3>Minhas Notas</h3>
      {notes.map((note) => (
        <div key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}