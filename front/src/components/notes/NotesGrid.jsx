import { useState } from "react";
import NoteCard from "./NoteCard";

export default function NotesGrid({
    notes,
    onDelete,
    onEdit,
    onUpdateItem,
    onAddChecklistItem,
    onDeleteChecklistItem,
    onTogglePin,
    onReorder,
    onReorderChecklistItems,
    disableDrag
}) {
    const [draggedNoteId, setDraggedNoteId] = useState(null);
    const [draggedNotes, setDraggedNotes] = useState(null);

    const orderedNotes = [...notes].sort(
        (a, b) => {
            if (a.pinned !== b.pinned) {
                return b.pinned - a.pinned;
            }

            return a.order - b.order;
        }
    );

    const displayedNotes =
        draggedNotes || orderedNotes;

    const handleDragStart = (event, noteId) => {
        setDraggedNoteId(noteId);

        setDraggedNotes([...orderedNotes]);

        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData(
            "noteId",
            noteId.toString()
        );
    };
    
    const handleDragOver = (event, targetNoteId) => {
        event.preventDefault();

        if (
            draggedNoteId === null ||
            draggedNoteId === targetNoteId
        ) {
            return;
        }

        setDraggedNotes((currentNotes) => {
            if (!currentNotes) {
                return currentNotes;
            }

            const draggedIndex =
                currentNotes.findIndex(
                    (note) =>
                        note.id === draggedNoteId
                );

            const targetIndex =
                currentNotes.findIndex(
                    (note) =>
                        note.id === targetNoteId
                );

            if (
                draggedIndex === -1 ||
                targetIndex === -1
            ) {
                return currentNotes;
            }
            
            if (draggedIndex === targetIndex) {
                return currentNotes;
            }

            const newNotes = [...currentNotes];

            const [draggedNote] =
                newNotes.splice(
                    draggedIndex,
                    1
                );

            newNotes.splice(
                targetIndex,
                0,
                draggedNote
            );

            return newNotes.map(
                (note, index) => ({
                    ...note,
                    order: index
                })
            );
        });
    };
    
    const handleDrop = (event) => {
        event.preventDefault();

        if (!draggedNotes) {
            setDraggedNoteId(null);
            return;
        }
        
        onReorder(draggedNotes);

        setDraggedNoteId(null);
        setDraggedNotes(null);
    };
    
    const handleDragEnd = () => {
        setDraggedNoteId(null);
        setDraggedNotes(null);
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(4, 1fr)",
                gap: "16px",
                alignItems: "start"
            }}
        >
            {displayedNotes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onUpdateItem={
                        onUpdateItem
                    }
                    onAddChecklistItem={
                        onAddChecklistItem
                    }
                    onDeleteItem={
                        onDeleteChecklistItem
                    }
                    onTogglePin={
                        onTogglePin
                    }

                    onReorderChecklistItems={
                        onReorderChecklistItems
                    }

                    onDragStart={
                        handleDragStart
                    }

                    onDragOver={
                        handleDragOver
                    }

                    onDrop={
                        handleDrop
                    }

                    onDragEnd={
                        handleDragEnd
                    }

                    isDragging={
                        draggedNoteId ===
                        note.id
                    }
                    disableDrag={disableDrag}
                />
            ))}
        </div>
    );
}