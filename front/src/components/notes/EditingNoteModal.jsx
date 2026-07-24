import {useEffect, userEffct, useState} from "react";

export default function EditNoteModal({
    isOpen, onClose, note, onUpdate
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() =>{
        if(note){
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

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
            console.error(error);
        }
    };

    return(
        <div>
            <h2>Editar Nota</h2>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <textarea
                placeholder="Conteúdo"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleSubmit}>
                Salvar Alterações
            </button>

            <button onClick={onClose}>
                Cancelar
            </button>

        </div>
    );
}