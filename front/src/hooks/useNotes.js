import { useEffect, useState } from "react";

import {
    getNotes,
    createNote,
    deleteNote,
    updateNote,
    updateNotePin,
    updateChecklistItem,
    createChecklistItem,
    deleteChecklistItem
} from "../services/noteService";

export default function useNotes() {
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

        const updatedNote = await updateNote(
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

    const updateExistingChecklistItem = async (
    itemId,
    itemData
) => {
    const token = localStorage.getItem("access");

    const updatedItem = await updateChecklistItem(
        token,
        itemId,
        itemData
    );

    setNotes((prev) =>
        prev.map((note) => {
            const hasItem = note.items?.some(
                (item) => item.id === itemId
            );

            if (!hasItem) {
                return note;
            }

            return {
                ...note,

                items: note.items.map((item) =>
                    item.id === itemId
                        ? updatedItem
                        : item
                )
            };
        })
    );

    return updatedItem;
};

const addChecklistItem = async (noteId) => {
        const token = localStorage.getItem("access");

        const note = notes.find(
            (n) => n.id === noteId
        );

        if(!note){
            console.error("Nota não encontrada: ", noteId);
            return;
        }

        const items = note.items || [];

        const newItem = await createChecklistItem(
            token, noteId, items.length
        );

        setNotes((prev) =>
            prev.map((n) => {
                if(n.id !== noteId)
                    return n;
                return {
                    ...n,
                    items: [
                        ...(n.items || []),
                        newItem
                    ]
                };
            })
        );

        return newItem;
    };

    const removeChecklistItem = async (itemId) => {

        const token = localStorage.getItem("access");

            await deleteChecklistItem(
                token,
                itemId
            );

            setNotes((prev) =>
                prev.map((note) => ({
                    ...note,
                    items: note.items?.filter(
                        (item) => item.id !== itemId
                    )
                }))
        );
    };

    const toggleNotePin = async (noteId, pinned) => {
        const token = localStorage.getItem("access");

        const updatedNote = await updateNotePin(
            token,
            noteId,
            pinned
        );

        setNotes((currentNotes) =>
            currentNotes.map((note) =>
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
        updateExistingNote,
        updateExistingChecklistItem,
        addChecklistItem,
        removeChecklistItem,
        toggleNotePin
    };
}