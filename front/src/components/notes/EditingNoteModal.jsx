import {
    useEffect,
    useState
} from "react";

import ChecklistItem from "./ChecklistItem";

export default function EditNoteModal({
    isOpen,
    onClose,
    note,
    onUpdate,
    onUpdateItem,
    onDeleteItem,
    onAddChecklistItem,
    onReorderChecklistItems
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [items, setItems] = useState([]);

    const [draggedItemId, setDraggedItemId] =
        useState(null);

    const [draggedItems, setDraggedItems] =
        useState(null);

    const [focusItemId, setFocusItemId] =
        useState(null);

    /*
     * Carrega os dados da nota
     * quando uma nota é aberta.
     */
    useEffect(() => {
        if (!note) {
            return;
        }

        setTitle(note.title || "");
        setContent(note.content || "");

        const orderedItems =
            [...(note.items || [])]
                .sort(
                    (a, b) =>
                        a.order - b.order
                );

        setItems(orderedItems);

    }, [note]);

    /*
     * Fecha o modal com ESC.
     */
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [isOpen, onClose]);

    if (!isOpen || !note) {
        return null;
    }

    /*
     * Salva título/conteúdo da nota.
     */
    const handleSubmit = async () => {
        try {
            await onUpdate(note.id, {
                title,
                content,
                note_type: note.note_type,
                pinned: note.pinned
            });

            onClose();

        } catch (error) {
            console.error(
                "Erro ao atualizar nota:",
                error
            );
        }
    };

    /*
     * Clique fora do modal.
     */
    const handleOverlayClick = (event) => {
        if (
            event.target ===
            event.currentTarget
        ) {
            onClose();
        }
    };

    /*
     * Itens que serão exibidos.
     */
    const displayedItems =
        draggedItems || items;

    /*
     * Inicia o arrasto de um item.
     */
    const handleItemDragStart = (
        event,
        itemId
    ) => {
        event.stopPropagation();

        setDraggedItemId(itemId);

        setDraggedItems([...items]);

        event.dataTransfer.effectAllowed =
            "move";

        event.dataTransfer.setData(
            "checklistItemId",
            itemId.toString()
        );
    };

    /*
     * Enquanto arrastamos,
     * reorganiza visualmente os itens.
     */
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
        });
    };

    /*
     * Finaliza o arrasto e salva
     * a nova ordem no backend.
     */
    const handleItemDrop = async (
        event
    ) => {
        event.preventDefault();
        event.stopPropagation();

        if (!draggedItems) {
            setDraggedItemId(null);
            return;
        }

        setItems(draggedItems);

        await onReorderChecklistItems(
            note.id,
            draggedItems
        );

        setDraggedItemId(null);
        setDraggedItems(null);
    };

    /*
     * Cancela/encerra o arrasto.
     */
    const handleItemDragEnd = () => {
        setDraggedItemId(null);
        setDraggedItems(null);
    };

    /*
     * Exclui item.
     *
     * Se o item foi excluído pelo
     * Backspace, focamos no anterior.
     */
    const handleDeleteItem = async (
        itemId,
        focusPrevious = false
    ) => {
        const currentIndex =
            displayedItems.findIndex(
                (item) =>
                    item.id === itemId
            );

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

        await onDeleteItem(itemId);

        const updatedItems =
            displayedItems.filter(
                (item) =>
                    item.id !== itemId
            );

        setItems(
            updatedItems.map(
                (item, index) => ({
                    ...item,
                    order: index
                })
            )
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
     * Cria um novo item abaixo
     * do item atual.
     */
    const handleCreateItemBelow =
        async (currentItem) => {

        const currentIndex =
            displayedItems.findIndex(
                (item) =>
                    item.id ===
                    currentItem.id
            );

        const newItem =
            await onAddChecklistItem(
                note.id,
                currentIndex + 1
            );

        if (!newItem) {
            return;
        }

        const updatedItems =
            [...displayedItems];

        updatedItems.splice(
            currentIndex + 1,
            0,
            newItem
        );

        setItems(
            updatedItems.map(
                (item, index) => ({
                    ...item,
                    order: index
                })
            )
        );

        setFocusItemId(
            newItem.id
        );
    };

    /*
     * Adiciona item pelo botão +.
     */
    const handleAddItem = async () => {
        const newItem =
            await onAddChecklistItem(
                note.id
            );

        if (!newItem) {
            return;
        }

        const updatedItems = [
            ...displayedItems,
            newItem
        ];

        setItems(
            updatedItems.map(
                (item, index) => ({
                    ...item,
                    order: index
                })
            )
        );

        setFocusItemId(
            newItem.id
        );
    };

    return (
        <div
            onClick={handleOverlayClick}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,

                display: "flex",
                justifyContent:
                    "center",
                alignItems:
                    "center",

                backgroundColor:
                    "rgba(0, 0, 0, 0.5)"
            }}
        >

            <div
                onClick={(event) =>
                    event.stopPropagation()
                }

                style={{
                    width: "600px",
                    maxWidth: "90%",
                    maxHeight: "80vh",

                    padding: "24px",

                    backgroundColor:
                        "white",

                    borderRadius:
                        "12px",

                    boxShadow:
                        "0 8px 30px rgba(0, 0, 0, 0.25)",

                    display: "flex",
                    flexDirection:
                        "column",
                    gap: "16px",

                    overflow:
                        "hidden"
                }}
            >

                {/* CABEÇALHO */}
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center"
                    }}
                >

                    <h2
                        style={{
                            margin: 0
                        }}
                    >
                        Editar Nota
                    </h2>

                    <button
                        onClick={onClose}
                        title="Fechar"
                        aria-label="Fechar"

                        style={{
                            border: "none",
                            background:
                                "transparent",
                            cursor:
                                "pointer",
                            fontSize:
                                "20px"
                        }}
                    >
                        ✕
                    </button>

                </div>

                {/* TÍTULO */}
                <input
                    type="text"
                    placeholder="Título"
                    value={title}

                    onChange={(event) =>
                        setTitle(
                            event.target.value
                        )
                    }

                    style={{
                        fontSize:
                            "20px",
                        fontWeight:
                            "bold",
                        border:
                            "none",
                        outline:
                            "none"
                    }}
                />

                {/* NOTA DE TEXTO */}
                {note.note_type ===
                    "text" && (

                    <textarea
                        placeholder="Conteúdo"
                        value={content}

                        onChange={(event) =>
                            setContent(
                                event.target.value
                            )
                        }

                        style={{
                            minHeight:
                                "250px",
                            resize:
                                "vertical",
                            border:
                                "none",
                            outline:
                                "none",
                            font:
                                "inherit"
                        }}
                    />

                )}

                {/* CHECKLIST */}
                {note.note_type ===
                    "checklist" && (

                    <div
                        style={{
                            overflowY:
                                "auto",
                            minHeight:
                                "150px",
                            maxHeight:
                                "50vh"
                        }}
                    >

                        {displayedItems.length ===
                            0 && (

                            <p
                                style={{
                                    color:
                                        "#777"
                                }}
                            >
                                Nenhum item ainda.
                            </p>

                        )}

                        {displayedItems.map(
                            (item) => (

                            <ChecklistItem
                                key={
                                    item.id
                                }

                                item={item}

                                onUpdate={
                                    async (
                                        itemId,
                                        itemData
                                    ) => {

                                        const updatedItem =
                                            await onUpdateItem(
                                                itemId,
                                                itemData
                                            );

                                        setItems(
                                            (
                                                currentItems
                                            ) =>
                                                currentItems.map(
                                                    (
                                                        currentItem
                                                    ) =>
                                                        currentItem.id ===
                                                        itemId
                                                            ? updatedItem
                                                            : currentItem
                                                )
                                        );

                                        return updatedItem;
                                    }
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

                        ))}

                        {/* BOTÃO + */}
                        <button
                            onClick={
                                handleAddItem
                            }

                            style={{
                                marginTop:
                                    "8px",
                                border:
                                    "none",
                                background:
                                    "transparent",
                                cursor:
                                    "pointer",
                                fontSize:
                                    "24px"
                            }}
                        >
                            +
                        </button>

                    </div>

                )}

                {/* BOTÕES */}
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        gap: "8px"
                    }}
                >

                    <button
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={
                            handleSubmit
                        }
                    >
                        Salvar Alterações
                    </button>

                </div>

            </div>

        </div>
    );
}