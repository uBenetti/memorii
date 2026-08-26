import { useState } from "react";

export default function ChecklistItem({
    item,
    onUpdate,
    onDelete
}) {
    const [text, setText] = useState(item.text);
    const [isSaving, setIsSaving] = useState(false);

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

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px"
            }}
        >
            <input
                type="checkbox"
                checked={item.completed}
                onChange={handleToggle}
                disabled={isSaving}
            />

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
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                    font: "inherit",
                    textDecoration: item.completed
                        ? "line-through"
                        : "none"
                }}
            />

            {onDelete && (
                <button
                    onClick={() => onDelete(item.id)}
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent"
                    }}
                >
                    🗑️
                </button>
            )}
        </div>
    );
}