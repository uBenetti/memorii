export default function TextNoteForm(){
    return(
        <div>
            <h2>Nova Nota de Texto</h2>

            <input placeholder="Título" />
            <br />
            <br />

            <textarea 
                placeholder="Conteúdo"
            />
            <br />
            <br />
            
            <button>
                Criar Nota
            </button>
        </div>
    );
}