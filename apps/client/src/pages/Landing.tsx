import { useState } from "react";
import CreateAccountModal from "../components/CreateAccountModal";
import EditorJoinModal from "../components/EditorJoinModal";
import useAxios from "../hooks/useAxios";

export default function Landing() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editorJoinModal, setEditorJoinModal] = useState<boolean>(false);
  const { data: user } = useAxios({ url: '/auth', method: 'get' });

  const handleContinue = () => {
    if (user) {
      return setEditorJoinModal((state) => !state);
    }
    setOpenModal((state) => !state);
  }

  return (
    <>
      <div className="landing-container">
        <div className="room-gradient-1"></div>
        <div className="room-gradient-2"></div>
        <div className="section-l">
          <h2>Hyva</h2>
          <p>Discover the future of collaborative coding with Hyva</p>
          <p>Effortlessly edit code together in real-time, anytime, anywhere.</p>
          <button onClick={handleContinue}>Start Coding!</button>
        </div>
        <div className="section-r">

        </div>
      </div>
      <CreateAccountModal open={openModal} />
      <EditorJoinModal open={editorJoinModal} />
    </>
  )
}
