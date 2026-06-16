import { useEffect, useState } from "react";

import{
    getNotes, createNote, deleteNote, updateNote,
} from "../services/noteService";

export default function useNotes(){
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("access");

        getNotes(token)
            .then((data) => {
                setNotes(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const createNewNote = async (noteData) => {
        const token = localStorage.getItem("access");

        const newNote = await createNote(
            token,
            noteData
        );

        setNotes((prev) => [
            ...prev,
            newNote
        ]);

        return newNote;
    };

    const deleteExistingNote = async (noteId) => {
        const token = localStorage.getItem("access");

        await deleteNote(
            token,
            noteId
        );

        setNotes((prev) =>
            prev.filter(
                (note) => note.id !== noteId
            )
        );
    };

const updateExistingNote = async (
  noteId,
  noteData
) => {

  const token = localStorage.getItem("access");

  const updatedNote =
    await updateNote(
      token,
      noteId,
      noteData
    );

  setNotes((prev) =>
    prev.map((note) =>
      note.id === noteId
        ? updatedNote
        : note
    )
  );

  return updatedNote;
};

return {
  notes,
  createNewNote,
  deleteExistingNote,
  updateExistingNote
};
}