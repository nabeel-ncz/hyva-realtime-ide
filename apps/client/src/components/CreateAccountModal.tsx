export default function CreateAccountModal({ open }: { open: boolean }) {
    return (
        <>
            <div className="create_account_container" style={{opacity: `${open ? 1 : 0}`}}>
                <div className="modal">
                    <div className="google_sign_in">
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
