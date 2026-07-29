import { useState } from "react";

export default function ChecklistItem({
    item,
    onUpdate
}) {
    const [isEditing, setIsEditing] = useState(item.text === "");
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
            setIsEditing(false);
            return;
        }

        try {
            setIsSaving(true);

            await onUpdate(item.id, {
                text: text.trim()
            });

            setIsEditing(false);

        } catch (error) {
            console.error(error);

            setText(item.text);

        } finally {
            setIsSaving(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSave();
        }

        if (event.key === "Escape") {
            setText(item.text);
            setIsEditing(false);
        }
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={item.completed}
                onChange={handleToggle}
                disabled={isSaving}
            />

            {isEditing ? (
                <input
                    value={text}
                    onChange={(event) => {
                        setText(event.target.value);
                    }}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    disabled={isSaving}
                />
            ) : (
                <span
                    onClick={() => {
                        setIsEditing(true);
                    }}
                    style={{
                        textDecoration: item.completed
                            ? "line-through"
                            : "none",

                        cursor: "pointer",
                        color: item.text ? "inherit" : "#888",
                        fontStyle: item.text ? "normal" : "italic"
                    }}
                >
                    {item.text || "Novo item..."}
                </span>
            )}
        </div>
    );
}