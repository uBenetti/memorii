import ChecklistItem from "./ChecklistItem";
import { useState } from "react";

export default function NoteCard({
    note,
    onEdit,
    onDelete,
    onUpdateItem,
    onDeleteItem,
    onAddChecklistItem,
    onTogglePin,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    isDragging,
    disableDrag,
    onReorderChecklistItems
}) {

    const [draggedItemId, setDraggedItemId] =
        useState(null);

    const [draggedItems, setDraggedItems] =
        useState(null);

    const orderedItems = [...(note.items || [])]
        .sort((a, b) => a.order - b.order);

    const displayedItems =
        draggedItems || orderedItems;

    const handleItemDragStart =(event, itemId) => {
        event.stopPropagation();

        setDraggedItemId(itemId);

        setDraggedItems([...orderedItems]);

        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData(
            "checklistItemId",
            itemId.toString()
        );
    };

    const handleItemDragOver = (
        event,
        targetItemId
    ) => {
        event.preventDefault();
        event.stopPropagation();

        if (
            draggedItemId === null ||
            draggedItemId === targetItemId
        ) {
            return;
        }

        setDraggedItems((currentItems) => {
            if (!currentItems) {
                return currentItems;
            }

            const draggedIndex =
                currentItems.findIndex(
                    (item) =>
                        item.id === draggedItemId
                );

            const targetIndex =
                currentItems.findIndex(
                    (item) =>
                        item.id === targetItemId
                );

            if (
                draggedIndex === -1 ||
                targetIndex === -1
            ) {
                return currentItems;
            }

            const newItems = [...currentItems];

            const [draggedItem] =
                newItems.splice(
                    draggedIndex,
                    1
                );

            newItems.splice(
                targetIndex,
                0,
                draggedItem
            );

            return newItems.map(
                (item, index) => ({
                    ...item,
                    order: index
                })
            );
        });
    };

    const handleItemDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!draggedItems) {
            setDraggedItemId(null);
            return;
        }

        onReorderChecklistItems(
            note.id,
            draggedItems
        );

        setDraggedItemId(null);
        setDraggedItems(null);
    };

    const handleItemDragEnd = () => {
        setDraggedItemId(null);
        setDraggedItems(null);
    };

    return (
        <div
            draggable={!disableDrag}
            onDragStart={
                disableDrag
                    ? undefined
                    : (event) => onDragStart(event, note.id)
            }
            onDragOver={
                disableDrag
                    ? undefined
                    : (event) => onDragOver(event, note.id)   
            }
            onDrop={
                disableDrag
                    ? undefined
                    : (event) => onDrop(event, note.id)
            }
            onDragEnd={
                disableDrag
                    ? undefined
                    : onDragEnd
            }
            style={{
                opacity: isDragging ? 0.2 : 1,
                cursor: disableDrag ? "default" : "grab"
            }}
        >
            <div>
                <h4>{note.title}</h4>

                <button
                    onClick={() =>
                        onTogglePin(
                            note.id,
                            !note.pinned
                        )
                    }
                    title={
                        note.pinned
                            ? "Desfixar nota"
                            : "Fixar nota"
                    }
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent"
                    }}
                >
                    {note.pinned ? "📍" : "📌"}
                </button>
            </div>

            {note.note_type === "text" && (
                <p style={{ whiteSpace: "pre-wrap" }}>
                    {note.content}
                </p>
            )}

            {note.note_type === "checklist" && (
                <div>
                    {displayedItems.map((item) => (
                        <ChecklistItem
                            key={item.id}
                            item={item}
                            onUpdate={onUpdateItem}
                            onDelete={onDeleteItem}

                            onDragStart={handleItemDragStart}
                            onDragOver={handleItemDragOver}
                            onDrop={handleItemDrop}
                            onDragEnd={handleItemDragEnd}

                            isDragging={draggedItemId === item.id}
                        />
                    ))}

                    <button
                        onClick={() =>
                            onAddChecklistItem(note.id)
                        }
                    >
                        +
                    </button>
                </div>
            )}

            <button
                onClick={() => onDelete(note.id)}
            >
                Excluir
            </button>

            {note.note_type === "text" && (
                <button
                    onClick={() => onEdit(note)}
                >
                    Editar
                </button>
            )}

            <hr />
        </div>
    );
}