import {useState} from "react";

export default function TextNoteForm({
    onCreate
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return(
        <div>
            <h2>Nova Nota de Texto</h2>

            <input
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

            <button
                onClick={() => 
                    onCreate({
                        title,
                        content
                    })
                }>
                Criar Nota
            </button>
        </div>
    );
}