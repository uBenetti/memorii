import {useEffect, useState} from "react";

export default function EditNoteModal({
    isOpen, onClose, note, onUpdate
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() =>{
        if(note){
            setTitle(note.title || "");
            setContent(note.content || "");
        }
    }, [note]);

    useEffect(()=>{
        if (!isOpen){
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isOpen, onClose]);

    if (!isOpen || !note){
        return null;
    }

    const handleSubmit = async () => {
        try {
            await onUpdate(note.id, {
                title, content, note_type: note.note_type,
                pinned: note.pinned
            });

            onClose();
        } catch (error) {
            console.error("Erro ao atualizar nota: ", error);
        }
    };

    const handleoverLayClick = (event) => {
        if(event.target === event.currentTarget){
            onClose();
        }
    };

    return(
        <div
            onClick={handleoverLayClick}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                backgroundColor: "rgba(0,0,0,0.5"
            }}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                style={{
                    width: "600px",
                    maxWidth: "90%",
                    maxHeight: "80vh",

                    padding: "24px",

                    backgroundColor: "white",
                    
                    borderRadius: "12px",

                    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",

                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <h2
                        style={{margin: 0}}
                    >
                        Editar Nota
                    </h2>

                    <button
                        onClick={onClose}
                        title="Fechar"
                        aria-label="Fechar"
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "20px"
                        }}
                    >
                        ✕
                    </button>

                </div>
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
                            fontSize: "20px",
                            fontWeight: "bold",
                            border: "none",
                            outline: "none"
                        }}
                    />

                    <textarea
                        placeholder="Conteúdo"
                        value={content}
                        onChange={(event) =>
                            setContent(
                                event.target.value
                            )
                        }
                        style={{
                            minHeight: "250px",
                            resize: "vertical",
                            border: "none",
                            outline: "none",
                            font: "inherit"
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "8px"
                        }}
                    >
                        <button
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSubmit}
                        >
                            Salvar Alterações
                        </button>                        
                    </div>
            </div>
        </div>
    );
}