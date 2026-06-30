export default function CreateNoteModal({
    isOpen,
    onClose,
}){
    if(!isOpen){
        return null;
    }

    return(
        <div>
            <h2>Nova Nota</h2>

            <p>
                Formulário da nota vai aqui.
            </p>

            <button onClick={onClose}>
                Fechar
            </button>
        </div>
    );
}