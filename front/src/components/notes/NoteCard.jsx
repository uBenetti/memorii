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

    const [focusItemId, setFocusItemId] =
        useState(null);

    const orderedItems = [...(note.items || [])]
        .sort((a, b) => a.order - b.order);

    const displayedItems =
        draggedItems || orderedItems;

    const handleItemDragStart = (event, itemId) => {
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

    const handleDeleteItem = async (
        itemId,
        focusPrevious = false
    ) => {
        const currentIndex =
            displayedItems.findIndex(
                (item) => item.id === itemId
            );

        let previousItem = null;

        if (
            focusPrevious &&
            currentIndex > 0
        ) {
            previousItem =
                displayedItems[currentIndex - 1];
        }

        await onDeleteItem(itemId);

        if (previousItem) {
            setFocusItemId(previousItem.id);
        }
    };

    const handleCreateItemBelow = async (
        currentItem
    ) => {
        const currentIndex =
            displayedItems.findIndex(
                (item) =>
                    item.id === currentItem.id
            );

        const newItem =
            await onAddChecklistItem(
                note.id,
                currentIndex + 1
            );

        if (!newItem) {
            return;
        }

        setFocusItemId(newItem.id);
    };

    const handleCardClick = (event) => {
        /*
         * Se o clique veio de algum botão,
         * não devemos abrir o modal.
         */
        if (
            event.target.closest("button") ||
            event.target.closest("input")
        ) {
            return;
        }

        onEdit(note);
    };

    return (
        <div
            onClick={handleCardClick}

            draggable={!disableDrag}

            onDragStart={
                disableDrag
                    ? undefined
                    : (event) =>
                        onDragStart(
                            event,
                            note.id
                        )
            }

            onDragOver={
                disableDrag
                    ? undefined
                    : (event) =>
                        onDragOver(
                            event,
                            note.id
                        )
            }

            onDrop={
                disableDrag
                    ? undefined
                    : (event) =>
                        onDrop(
                            event,
                            note.id
                        )
            }

            onDragEnd={
                disableDrag
                    ? undefined
                    : onDragEnd
            }

            style={{
                opacity:
                    isDragging ? 0.2 : 1,

                cursor:
                    disableDrag
                        ? "pointer"
                        : "grab"
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
                        background:
                            "transparent",
                        cursor: "pointer"
                    }}
                >
                    {note.pinned
                        ? "📍"
                        : "📌"}
                </button>
            </div>

            {note.note_type === "text" && (
                <p
                    style={{
                        whiteSpace:
                            "pre-wrap"
                    }}
                >
                    {note.content}
                </p>
            )}

            {note.note_type === "checklist" && (
                <div>
                    {displayedItems.map(
                        (item) => (
                            <ChecklistItem
                                key={item.id}
                                item={item}

                                onUpdate={
                                    onUpdateItem
                                }

                                onDelete={
                                    handleDeleteItem
                                }

                                onCreateBelow={
                                    handleCreateItemBelow
                                }

                                onDragStart={
                                    handleItemDragStart
                                }

                                onDragOver={
                                    handleItemDragOver
                                }

                                onDrop={
                                    handleItemDrop
                                }

                                onDragEnd={
                                    handleItemDragEnd
                                }

                                isDragging={
                                    draggedItemId ===
                                    item.id
                                }

                                autoFocus={
                                    focusItemId ===
                                    item.id
                                }
                            />
                        )
                    )}

                    <button
                        onClick={() =>
                            onAddChecklistItem(
                                note.id
                            )
                        }
                    >
                        +
                    </button>
                </div>
            )}

            <button
                onClick={() =>
                    onDelete(note.id)
                }
            >
                Excluir
            </button>

            <hr />
        </div>
    );
}