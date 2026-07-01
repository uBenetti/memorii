import { useState } from "react";
import ChooseNoteType from "./ChooseNoteType";

export default function CreateNoteModal({
    isOpen,
    onClose,
}) {

    const [selectedType, setSelectedType] = useState("");

    if (!isOpen) {
        return null;
    }

    return (
        <div>

            <ChooseNoteType
                selectedType={selectedType}
                onSelect={setSelectedType}
                onContinue={() => {
                    console.log(selectedType);
                }}
            />

            <button onClick={onClose}>
                Fechar
            </button>

        </div>
    );
}