import { useEffect, useState } from "react";

import {
    getNotes,
    createNote,
    deleteNote,
    updateNote,
    updateNotePin,
    reorderNotes,
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

    const reorderExistingNote = async (
        draggedNoteId,
        targetNoteId
    ) => {
        const token = localStorage.getItem("access");

        const pinnedNotes = [...notes]
            .filter((note) => note.pinned)
            .sort((a, b) => a.order - b.order);

        const unpinnedNotes = [...notes]
            .filter((note) => !note.pinned)
            .sort((a, b) => a.order - b.order);

        const draggedNote = notes.find(
            (note) => note.id === draggedNoteId
        );

        const targetNote = notes.find(
            (note) => note.id === targetNoteId
        );

        if (!draggedNote || !targetNote) {
            return;
        }

        // Não permite mover uma nota entre
        // a área de fixadas e não fixadas.
        if (draggedNote.pinned !== targetNote.pinned) {
            return;
        }

        const currentList = draggedNote.pinned
            ? pinnedNotes
            : unpinnedNotes;

        const draggedIndex = currentList.findIndex(
            (note) => note.id === draggedNoteId
        );

        const targetIndex = currentList.findIndex(
            (note) => note.id === targetNoteId
        );

        if (
            draggedIndex === -1 ||
            targetIndex === -1
        ) {
            return;
        }

        const reorderedList = [...currentList];

        const [removedNote] = reorderedList.splice(
            draggedIndex,
            1
        );

        reorderedList.splice(
            targetIndex,
            0,
            removedNote
        );

        const updates = reorderedList.map(
            (note, index) => ({
                id: note.id,
                order: index
            })
        );

        // Atualização visual imediata
        setNotes((prev) =>
            prev.map((note) => {
                const update = updates.find(
                    (item) => item.id === note.id
                );

                if (!update) {
                    return note;
                }

                return {
                    ...note,
                    order: update.order
                };
            })
        );

        // Persiste a nova ordem no Django
        for (const update of updates) {
            await reorderNotes(
                token,
                update.id,
                update.order
            );
        }
    };

    return {
        notes,
        createNewNote,
        deleteExistingNote,
        updateExistingNote,
        updateExistingChecklistItem,
        addChecklistItem,
        removeChecklistItem,
        toggleNotePin,
        reorderExistingNote
    };
}