import passport from "passport";
export const signInWithGoogle = () => {
    return passport.authenticate('google', { scope: ['profile', 'email'] });
}