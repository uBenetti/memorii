import { useState } from "react";

export default function ChecklistItem({
    item,
    onUpdate,
    onDelete,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    isDragging
}) {
    const [text, setText] = useState(item.text);
    const [isSaving, setIsSaving] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleToggle = async () => {
        try {
            setIsSaving(true);

            await onUpdate(item.id, {
                completed: !item.completed
            });

        } catch (error) {
            console.error(
                "Erro ao atualizar checklist:",
                error
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleSave = async () => {
        if (text === item.text) {
            return;
        }

        try {
            setIsSaving(true);

            await onUpdate(item.id, {
                text: text
            });

        } catch (error) {
            console.error(
                "Erro ao salvar texto:",
                error
            );

            setText(item.text);

        } finally {
            setIsSaving(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }

        if (event.key === "Escape") {
            setText(item.text);
            event.currentTarget.blur();
        }
    };

    const showActions =
        isHovered || isDragging;

    return (
        <div
            onMouseEnter={() =>
                setIsHovered(true)
            }
            onMouseLeave={() =>
                setIsHovered(false)
            }
            onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDragOver(event, item.id);
            }}
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDrop(event, item.id);
            }}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                opacity: isDragging ? 0.2 : 1,
                minHeight: "32px"
            }}
        >

            {/* BOTÃO PARA ARRASTAR */}
            <button
                draggable
                onDragStart={(event) => {
                    event.stopPropagation();

                    onDragStart(
                        event,
                        item.id
                    );
                }}
                onDragEnd={(event) => {
                    event.stopPropagation();

                    onDragEnd();
                }}
                title="Mover item"
                aria-label="Mover item"
                style={{
                    border: "none",
                    background: "transparent",
                    cursor: "grab",
                    fontSize: "18px",
                    padding: "0 4px",

                    opacity:
                        showActions ? 1 : 0,

                    pointerEvents:
                        showActions
                            ? "auto"
                            : "none",

                    transition:
                        "opacity 0.15s ease"
                }}
            >
                ⠿
            </button>

            {/* CHECKBOX */}
            <input
                type="checkbox"
                checked={item.completed}
                onChange={handleToggle}
                disabled={isSaving}
            />

            {/* TEXTO */}
            <input
                value={text}
                placeholder=""
                onChange={(event) => {
                    setText(event.target.value);
                }}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                disabled={isSaving}
                style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                    font: "inherit",

                    textDecoration:
                        item.completed
                            ? "line-through"
                            : "none"
                }}
            />

            {/* BOTÃO DE EXCLUIR */}
            {onDelete && (
                <button
                    onClick={() =>
                        onDelete(item.id)
                    }
                    title="Excluir item"
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        cursor: "pointer",

                        opacity:
                            showActions ? 1 : 0,

                        pointerEvents:
                            showActions
                                ? "auto"
                                : "none",

                        transition:
                            "opacity 0.15s ease"
                    }}
                >
                    🗑️
                </button>
            )}

        </div>
    );
}