import {
    useState,
    useLayoutEffect,
    useRef
} from "react";

export default function ChecklistItem({
    item,
    onUpdate,
    onDelete,
    onCreateBelow,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    isDragging,
    autoFocus
}) {
    const [text, setText] =
        useState(item.text || "");

    const [isHovered, setIsHovered] =
        useState(false);

    const inputRef = useRef(null);

    useLayoutEffect(() => {
        if (
            autoFocus &&
            inputRef.current
        ) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleToggle = () => {
        onUpdate(item.id, {
            completed: !item.completed
        });
    };

    const handleSave = () => {
        if (text === item.text) {
            return;
        }

        onUpdate(item.id, {
            text
        });
    };

    const handleKeyDown = (event) => {

        /*
         * BACKSPACE
         */
        if (
            event.key === "Backspace" &&
            text === ""
        ) {
            event.preventDefault();

            onDelete(
                item.id,
                true
            );

            return;
        }

        /*
         * ENTER
         */
        if (event.key === "Enter") {
            event.preventDefault();

            if (text !== item.text) {
                onUpdate(item.id, {
                    text
                });
            }

            onCreateBelow(item);

            return;
        }

        /*
         * ESCAPE
         */
        if (event.key === "Escape") {
            setText(item.text || "");

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

                onDragOver(
                    event,
                    item.id
                );
            }}
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDrop(
                    event,
                    item.id
                );
            }}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                opacity:
                    isDragging
                        ? 0.2
                        : 1,
                minHeight: "32px"
            }}
        >

            {/* ARRASTAR */}

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
                    background:
                        "transparent",
                    cursor: "grab",
                    fontSize: "18px",
                    padding: "0 4px",

                    opacity:
                        showActions
                            ? 1
                            : 0,

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
                onChange={
                    handleToggle
                }
            />

            {/* TEXTO */}

            <input
                ref={inputRef}
                value={text}
                placeholder=""
                onChange={(event) => {
                    setText(
                        event.target.value
                    );
                }}
                onBlur={handleSave}
                onKeyDown={
                    handleKeyDown
                }
                style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background:
                        "transparent",
                    padding: 0,
                    margin: 0,
                    font: "inherit",

                    textDecoration:
                        item.completed
                            ? "line-through"
                            : "none"
                }}
            />

            {/* EXCLUIR */}

            {onDelete && (
                <button
                    onClick={() =>
                        onDelete(
                            item.id
                        )
                    }
                    title="Excluir item"
                    style={{
                        border: "none",
                        outline: "none",
                        background:
                            "transparent",
                        cursor:
                            "pointer",

                        opacity:
                            showActions
                                ? 1
                                : 0,

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