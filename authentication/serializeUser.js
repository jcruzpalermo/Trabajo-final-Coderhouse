import passport from "passport";

const serializeUser = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
}

export default serializeUser;