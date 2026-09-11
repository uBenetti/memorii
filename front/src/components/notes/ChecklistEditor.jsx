import { useState } from "react";
import ChecklistItem from "./ChecklistItem";

export default function ChecklistEditor({
    noteId,
    initialItems,
    onChange
}) {
    const [items, setItems] = useState(
        [...(initialItems || [])]
            .sort(
                (a, b) =>
                    a.order - b.order
            )
    );

    const [deletedItemIds, setDeletedItemIds] =
        useState([]);

    const [draggedItemId, setDraggedItemId] =
        useState(null);

    const [draggedItems, setDraggedItems] =
        useState(null);

    const [focusItemId, setFocusItemId] =
        useState(null);

    const displayedItems =
        draggedItems || items;

    /*
     * Atualiza o estado local e informa
     * o EditingNoteModal sobre a alteração.
     */
    const updateItems = (
        newItems,
        newDeletedItemIds =
            deletedItemIds
    ) => {
        const orderedItems =
            newItems.map(
                (item, index) => ({
                    ...item,
                    order: index
                })
            );

        setItems(orderedItems);

        setDeletedItemIds(
            newDeletedItemIds
        );

        onChange({
            items: orderedItems,
            deletedItemIds:
                newDeletedItemIds
        });
    };

    /*
     * EDITAR ITEM
     */
    const handleUpdateItem = (
        itemId,
        itemData
    ) => {
        const updatedItems =
            items.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        ...itemData
                    }
                    : item
            );

        updateItems(updatedItems);
    };

    /*
     * EXCLUIR ITEM
     */
    const handleDeleteItem = (
        itemId,
        focusPrevious = false
    ) => {
        const currentIndex =
            displayedItems.findIndex(
                (item) =>
                    item.id === itemId
            );

        if (currentIndex === -1) {
            return;
        }

        let previousItem = null;

        if (
            focusPrevious &&
            currentIndex > 0
        ) {
            previousItem =
                displayedItems[
                    currentIndex - 1
                ];
        }

        const itemToDelete =
            displayedItems[
                currentIndex
            ];

        const updatedItems =
            displayedItems.filter(
                (item) =>
                    item.id !== itemId
            );

        /*
         * Somente itens que já existem
         * no backend entram na lista
         * de exclusões.
         *
         * Itens "new-..." são temporários
         * e simplesmente desaparecem.
         */
        const newDeletedItemIds =
            typeof itemToDelete.id ===
                "number"
                ? [
                    ...deletedItemIds,
                    itemToDelete.id
                ]
                : deletedItemIds;

        updateItems(
            updatedItems,
            newDeletedItemIds
        );

        setDraggedItems(null);
        setDraggedItemId(null);

        if (previousItem) {
            setFocusItemId(
                previousItem.id
            );
        }
    };

    /*
     * CRIAR ITEM ABAIXO
     */
    const handleCreateItemBelow = (
        currentItem
    ) => {
        const currentIndex =
            displayedItems.findIndex(
                (item) =>
                    item.id ===
                    currentItem.id
            );

        if (currentIndex === -1) {
            return;
        }

        const newItem = {
            id:
                `new-${Date.now()}-${Math.random()}`,
            note: noteId,
            text: "",
            completed: false,
            order:
                currentIndex + 1,
            isNew: true
        };

        const updatedItems =
            [...displayedItems];

        updatedItems.splice(
            currentIndex + 1,
            0,
            newItem
        );

        updateItems(
            updatedItems
        );

        setFocusItemId(
            newItem.id
        );
    };

    /*
     * ADICIONAR ITEM PELO +
     */
    const handleAddItem = () => {
        const newItem = {
            id:
                `new-${Date.now()}-${Math.random()}`,
            note: noteId,
            text: "",
            completed: false,
            order:
                displayedItems.length,
            isNew: true
        };

        const updatedItems = [
            ...displayedItems,
            newItem
        ];

        updateItems(
            updatedItems
        );

        setFocusItemId(
            newItem.id
        );
    };

    /*
     * INICIAR DRAG
     */
    const handleItemDragStart = (
        event,
        itemId
    ) => {
        event.stopPropagation();

        setDraggedItemId(itemId);
        setDraggedItems([
            ...items
        ]);

        event.dataTransfer.effectAllowed =
            "move";

        event.dataTransfer.setData(
            "checklistItemId",
            itemId.toString()
        );
    };

    /*
     * ARRASTAR SOBRE OUTRO ITEM
     */
    const handleItemDragOver = (
        event,
        targetItemId
    ) => {
        event.preventDefault();
        event.stopPropagation();

        if (
            draggedItemId === null ||
            draggedItemId ===
                targetItemId
        ) {
            return;
        }

        setDraggedItems(
            (currentItems) => {

                if (!currentItems) {
                    return currentItems;
                }

                const draggedIndex =
                    currentItems.findIndex(
                        (item) =>
                            item.id ===
                            draggedItemId
                    );

                const targetIndex =
                    currentItems.findIndex(
                        (item) =>
                            item.id ===
                            targetItemId
                    );

                if (
                    draggedIndex === -1 ||
                    targetIndex === -1
                ) {
                    return currentItems;
                }

                const newItems =
                    [...currentItems];

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
            }
        );
    };

    /*
     * SOLTAR ITEM
     */
    const handleItemDrop = (
        event
    ) => {
        event.preventDefault();
        event.stopPropagation();

        if (!draggedItems) {
            setDraggedItemId(null);
            return;
        }

        updateItems(
            draggedItems
        );

        setDraggedItemId(null);
        setDraggedItems(null);
    };

    /*
     * FINALIZAR DRAG
     */
    const handleItemDragEnd = () => {
        setDraggedItemId(null);
        setDraggedItems(null);
    };

    return (
        <div
            style={{
                overflowY: "auto",
                minHeight: "150px",
                maxHeight: "50vh"
            }}
        >

            {displayedItems.length === 0 && (
                <p
                    style={{
                        color: "#777"
                    }}
                >
                    Nenhum item ainda.
                </p>
            )}

            {displayedItems.map(
                (item) => (
                    <ChecklistItem
                        key={item.id}
                        item={item}

                        onUpdate={
                            handleUpdateItem
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
                onClick={
                    handleAddItem
                }
                style={{
                    marginTop: "8px",
                    border: "none",
                    background:
                        "transparent",
                    cursor: "pointer",
                    fontSize: "24px"
                }}
            >
                +
            </button>

        </div>
    );
}