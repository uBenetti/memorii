export default function NoteCard({
    note,
    onDelete,
    onEdit
}){
    return(
        <div>
            <h4>{note.title}</h4>
            
            <p>{note.content}</p>

            <button onClick={()=> onDelete(note.id)}>Excluir</button>

            <button onClick={() => onEdit(note)}>Editar</button>
        </div>
    );
}