import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function EditorJoinModal({ open }: { open: boolean }) {
    const navigate = useNavigate();
    const [text, setText] = useState<string>("");
    const handleJoin = () => {
        if (text.length < 36) {
            return toast.error("Room doesn't exist", {
                position: 'top-right'
            });
        }
        navigate(`/editor/${text}`);
    }
    const handleCreate = () => {
        navigate(`/editor/${uuidv4()}`);
    }
    return (
        <>
            <div className="editor_join_container" style={{ display: `${open ? 'flex' : 'none'}` }}>
                <div className="modal">
                    <div className="join_existing">
                        <input value={text} onChange={(evt) => { setText(evt.target.value) }} type="text" />
                        <h2 onClick={handleJoin} >Join existing room</h2>
                    </div>
                    <h2>OR</h2>
                    <div onClick={handleCreate} className="create_room">
                        <h2>Create new room</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
