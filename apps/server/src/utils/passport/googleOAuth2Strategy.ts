import passport from "passport"
import { Strategy } from "passport-google-oauth20";
import { User } from "../../database/models/user";

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user , done) => {
    done(null, user as Express.User);
})

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: process.env.GOOGLE_REDIRECT_URL ?? "",
    passReqToCallback: true,
    scope: ['profile', 'email']
}, async (requset, accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ email: profile._json.email });
        if (existingUser) {
            done(null, existingUser);
        } else {
            const newUser = await new User({
                username: profile.displayName,
                email: profile._json.email
            }).save();
            done(null, newUser);
        }
    } catch (error) {
        const err = error as Error;
        done(err, undefined);
    }
}));