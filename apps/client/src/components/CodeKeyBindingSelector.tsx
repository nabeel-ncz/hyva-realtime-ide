
export default function CodeKeyBindingSelector({
    codeKeybindingsAvailable,
    codeKeybinding,
    handleCodeKeybindingChange
} : {
    codeKeybindingsAvailable: string[];
    codeKeybinding: string;
    handleCodeKeybindingChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
    return (
        <div className="languageFieldWrapper">
            <select className="languageField" name="codeKeybinding" id="codeKeybinding" value={codeKeybinding} onChange={handleCodeKeybindingChange}>
                {codeKeybindingsAvailable.map(eachKeybinding => (
                    <option key={eachKeybinding} value={eachKeybinding}>{eachKeybinding}</option>
                ))}
            </select>
        </div>

    )
}
