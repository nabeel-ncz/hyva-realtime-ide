import passport from "passport";
export const signInWithGoogleRedirect = passport.authenticate('google', { successRedirect: "/oauth2/google/success", failureRedirect: "/oauth2/google/failed" });
