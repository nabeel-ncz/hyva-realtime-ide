import { BASE_URL } from "../utils/axios";

export default function CreateAccountModal({ open }: { open: boolean }) {
    const handleGoogleAuth = () => {
        window.open(`${BASE_URL}/oauth2/google`, "_self");
    }
    return (
        <>
            <div className="create_account_container" style={{ opacity: `${open ? 1 : 0}` }}>
                <div className="modal">
                    <div onClick={handleGoogleAuth} className="google_sign_in">
                        <img src="/google.png" alt="" />
                        <h2>SignIn with Google</h2>
                    </div>
                    <h2>OR</h2>
                    <div className="join_as_guest">
                        <h2>Join As Guest</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
