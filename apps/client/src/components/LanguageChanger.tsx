export default function LanguageChanger({
    languagesAvailable,
    current,
    handleLanguageChange
}: {
    languagesAvailable: string[];
    current: string;
    handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
    return (
        <div className="languageFieldWrapper">
            <select className="languageField" name="language" id="language" value={current} onChange={handleLanguageChange}>
                {languagesAvailable.map(eachLanguage => (
                    <option key={eachLanguage} value={eachLanguage}>{eachLanguage}</option>
                ))}
            </select>
        </div>
    )
}
