export default function ChooseNoteType({
    selectedType,
    onSelect,
    onContinue
}){
    return(
        <div>
            <h2>Nova Nota</h2>
            
            <p>Qual deve ser o tipo da nota?</p>

            <label>
                <input
                    type="radio"
                    value="text"
                    checked={selectedType === "text"}
                    onChange={() => onSelect("text")}
                />

                Texto

            </label>

            <br />

            <label>
                <input
                    type="radio"
                    value="checklist"
                    checked={selectedType === "checklist"}
                    onChange={() => onSelect("checklist")}
                />
                Checklist
            </label>

            <br />
            <br />

            <button onClick={onContinue} disabled={!selectedType}>
                Continuar</button>

        </div>
    );
}