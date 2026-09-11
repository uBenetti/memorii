import { useEffect, useState } from "react";

import {
    getNotes,
    createNote,
    deleteNote,
    updateNote,
    updateNotePin,
    reorderNote,
    updateChecklistItem,
    createChecklistItem,
    deleteChecklistItem,
    reorderChecklistItem
} from "../services/noteService";

export default function useNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const saveChecklistChanges = async (
        noteId,
        title,
        items,
        deletedItemIds
    ) => {
        const token =
            localStorage.getItem("access");

        await updateNote(
            token,
            noteId,
            {
                title,
                content: "",
                note_type: "checklist"
            }
        );

        for (
            const itemId of deletedItemIds
        ) {
            await deleteChecklistItem(
                token,
                itemId
            );
        }

        const savedItems = [];

        for (
            const item of items
        ) {
            if (item.isNew) {

                const createdItem =
                    await createChecklistItem(
                        token,
                        noteId,
                        item.order,
                        item.text,
                        item.completed
                    );

                savedItems.push(
                    createdItem
                );

            } else {
                savedItems.push(item);
            }
        }

        const originalNote =
            notes.find(
                (note) =>
                    note.id === noteId
            );

        for (
            const item of savedItems
        ) {
            if (
                typeof item.id !==
                "number"
            ) {
                continue;
            }

            const originalItem =
                originalNote?.items?.find(
                    (original) =>
                        original.id ===
                        item.id
                );
            if (!originalItem) {
                continue;
            }

            const changed =
                originalItem.text !==
                    item.text ||
                originalItem.completed !==
                    item.completed;

            if (changed) {

                await updateChecklistItem(
                    token,
                    item.id,
                    {
                        text: item.text,
                        completed:
                            item.completed
                    }
                );
            }
        }
        for (
            const item of savedItems
        ) {
            await reorderChecklistItem(
                token,
                item.id,
                item.order
            );
        }

        setNotes((currentNotes) => currentNotes.map((note)=>
        note.id === noteId
            ? {
                ...note,
                title,
                items: savedItems
            }
            : note
    ));

    return {
        ...originalNote,
        title,
        items: savedItems
    };
    };

    useEffect(() => {
        const token = localStorage.getItem("access");

        getNotes(token)
            .then((data) => {
                setNotes(data);
            })
            .catch((error) => {
                console.error(
                    "Erro ao carregar notas:",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
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

const addChecklistItem = async (
        noteId,
        insertIndex = null
    ) => {
        const token = localStorage.getItem("access");

        const note = notes.find(
            (n) => n.id === noteId
        );

        if (!note) {
            console.error(
                "Nota não encontrada:",
                noteId
            );

            return;
        }

        const currentItems =
            [...(note.items || [])]
                .sort((a, b) => a.order - b.order);

        const order =
            insertIndex === null
                ? currentItems.length
                : insertIndex;

        const newItem =
            await createChecklistItem(
                token,
                noteId,
                order
            );

        const updatedItems =
            [...currentItems];

        updatedItems.splice(
            order,
            0,
            newItem
        );

        const reorderedItems =
            updatedItems.map(
                (item, index) => ({
                    ...item,
                    order: index
                })
            );

        setNotes((prev) =>
            prev.map((note) =>
                note.id === noteId
                    ? {
                        ...note,
                        items: reorderedItems
                    }
                    : note
            )
        );

        try {
            for (const item of reorderedItems) {
                await reorderChecklistItem(
                    token,
                    item.id,
                    item.order
                );
            }

        } catch (error) {
            console.error(
                "Erro ao reorganizar checklist:",
                error
            );
        }

        return newItem;
    };

const removeChecklistItem = async (itemId) => {
        const token = localStorage.getItem("access");

        await deleteChecklistItem(
            token,
            itemId
        );

        const targetNote = notes.find((note) =>
            note.items?.some(
                (item) => item.id === itemId
            )
        );

        if (!targetNote) {
            return;
        }

        const remainingItems =
            (targetNote.items || [])
                .filter(
                    (item) => item.id !== itemId
                )
                .sort(
                    (a, b) => a.order - b.order
                );

        const reorderedItems =
            remainingItems.map(
                (item, index) => ({
                    ...item,
                    order: index
                })
            );

        setNotes((prev) =>
            prev.map((note) =>
                note.id === targetNote.id
                    ? {
                        ...note,
                        items: reorderedItems
                    }
                    : note
            )
        );

        try {
            for (const item of reorderedItems) {
                await reorderChecklistItem(
                    token,
                    item.id,
                    item.order
                );
            }

        } catch (error) {
            console.error(
                "Erro ao reorganizar checklist após exclusão:",
                error
            );
        }
    };

    const reorderExistingChecklistItems = async (
        noteId,
        reorderedItems
    ) => {
        const token = localStorage.getItem("access");

        const previousNotes = notes;

        setNotes((currentNotes) =>
            currentNotes.map((note) =>
                note.id === noteId
                    ? {
                        ...note,
                        items: reorderedItems
                    }
                    : note
            )
        );

        try {
            for (const item of reorderedItems) {
                await reorderChecklistItem(
                    token,
                    item.id,
                    item.order
                );
            }

        } catch (error) {
            console.error(
                "Erro ao salvar ordem dos itens:",
                error
            );

            setNotes(previousNotes);
        }
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
        reorderedNotes
    ) => {
        const token = localStorage.getItem("access");

        setNotes(reorderedNotes);

        try {
            for (const note of reorderedNotes) {
                await reorderNote(
                    token,
                    note.id,
                    note.order
                );
            }
        } catch (error) {
            console.error(
                "Erro ao salvar nova ordem:",
                error
            );
            
            const updatedNotes =
                await getNotes(token);

            setNotes(updatedNotes);
        }
    };

    return {
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
        reorderExistingChecklistItems,
        saveChecklistChanges
    };
}