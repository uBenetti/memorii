import { useState } from "react";
import ChooseNoteType from "./ChooseNoteType";
import TextNoteForm from "./TextNoteForm";
import ChecklistNoteForm from "./ChecklistNoteForm";

export default function CreateNoteModal({
    isOpen,
    onClose,
}) {

    const [selectedType, setSelectedType] = useState("");
    const [step, setStep] = useState("choose");

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
            {step == "choose" &&(
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
                    onCreate={(noteData) => {
                        console.log(noteData);
                    }}
                />
            )}
            {step === "checklist" && (
                <ChecklistNoteForm />
            )}

            <button onClick={handleClose}>
                Fechar
            </button>

        </div>
    );
}