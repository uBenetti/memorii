import {useState} from "react";

export default function ChecklistNoteForm({
    onCreate
}){
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([
        {
            text: "",
            completed: false
        }
    ]);

    const handleTaskChange = (index, newText) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = newText;
        setTasks(updatedTasks);
    };

    const handleAddTask = () => {
        setTasks([
            ...tasks, 
            {
                text: "",
                completed: false
            }
        ]);
    };

    const handleSubmit = async () =>{
    await onCreate({
        title,
        tasks
    });

    setTitle("");
    setTasks([
        {
            text: "",
            completed: false
        }
    ]);
    };

    return(
        <div>
            <h2>Novo Checklist</h2>

            <input
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <h3>Tarefas</h3>
            {tasks.map((task, index) => (
                <div key={index}>
                    <input
                        placeholder={`Tarefa ${index + 1}`}
                        value={task.text}
                        onChange={(e) => handleTaskChange(index, e.target.value)}
                    />
                </div>
            ))}

            <br />
            <br />

            <button onClick={handleAddTask}>
                + Adicionar Tarefa
            </button>

            <br />
            <br />
            <button onClick={handleSubmit}>
                Criar Checklist
            </button>
        </div>
    );
}