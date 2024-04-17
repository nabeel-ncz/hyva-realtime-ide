import { useState } from "react";

export default function SaveFileModal({ open, handleSubmit, closeModal }: {
    open: boolean,
    handleSubmit: (title: string) => void
    closeModal: () => void
}) {
    const [text, setText] = useState<string>("");
    return (
        <>
            <div className="save_file_container" style={{ display: `${open ? 'flex' : 'none'}` }}>
                <div className="modal">
                    <div className="save_file">
                        <input value={text} onChange={(evt) => { setText(evt.target.value) }} type="text" />
                        <div className="btn_container">

                            <button onClick={closeModal}>close</button>
                            <button onClick={() => {
                                handleSubmit(text);
                                setText("");
                            }}>Save File</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
