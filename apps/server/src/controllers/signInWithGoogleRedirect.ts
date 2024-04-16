import passport from "passport";
export const signInWithGoogleRedirect = () => {
    return passport.authenticate('google', { successRedirect: "/api/oauth2/google/success", failureRedirect: "/api/oauth2/google/failed" });
}
