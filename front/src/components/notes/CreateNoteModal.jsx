import { useState } from "react";
import ChooseNoteType from "./ChooseNoteType";
import TextNoteForm from "./TextNoteForm";
import ChecklistNoteForm from "./ChecklistNoteForm";

export default function CreateNoteModal({
    isOpen,
    onClose,
    createNewNote
}) {

    const [selectedType, setSelectedType] = useState("");
    const [step, setStep] = useState("choose");

    const handleCreateTextNote = async (noteData)=>{
        try{
            await createNewNote({
                title: noteData.title,
                content: noteData.content,
                note_type: "text",
                pinned: false
            });

            handleClose();

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateChecklist = async (noteData) =>{
        try{
            await createNewNote({
                title: noteData.title,
                content: "",
                note_type: "checklist",
                pinned: false,
                items: noteData.tasks
            }); handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setSelectedType("");
        setStep("choose");
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            {step === "choose" &&(
            <ChooseNoteType
                selectedType={selectedType}
                onSelect={setSelectedType}
                onContinue={() => {
                    if(selectedType === "text"){
                        setStep("text");
                    }

                    if(selectedType === "checklist"){
                        setStep("checklist");
                    }
                }}
            />
            )}
            {step === "text" && (
                <TextNoteForm 
                    onCreate={handleCreateTextNote}
                />
            )}
            {step === "checklist" && (
                <ChecklistNoteForm 
                    onCreate={handleCreateChecklist}
                />
            )}

            <button onClick={handleClose}>
                Fechar
            </button>

        </div>
    );
}