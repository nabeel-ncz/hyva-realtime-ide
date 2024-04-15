import { useState } from "react"
import CreateAccountModal from "../components/CreateAccountModal";

export default function Landing() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="landing-container">
        <div className="room-gradient-1"></div>
        <div className="room-gradient-2"></div>
        <div className="section-l">
          <h2>Hyva</h2>
          <p>Discover the future of collaborative coding with Hyva</p>
          <p>Effortlessly edit code together in real-time, anytime, anywhere.</p>
          <button onClick={() => {
            setOpenModal((state) => !state);
          }}>Start Coding!</button>
        </div>
        <div className="section-r">

        </div>
      </div>
        <CreateAccountModal open={openModal} />
    </>
  )
}
