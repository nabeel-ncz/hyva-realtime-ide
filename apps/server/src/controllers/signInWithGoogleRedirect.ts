import passport from "passport";
export const signInWithGoogleRedirect = () => {
    return passport.authenticate('google', { successRedirect: "/oauth2/google/success", failureRedirect: "/oauth2/google/failed" });
}
