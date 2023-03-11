import JwtStrategy from "passport-jwt";
JwtStrategy.Strategy;
import  ExtractJwt  from "passport-jwt";
ExtractJwt.ExtractJwt;
import passport from "passport";
import UserModel from "../dataBase/models/user";
import dotenv from "dotenv";
dotenv.config();

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

const jwetStrategy = () => {
    return passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        UserModel.findOne({ _id: jwt_payload.id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}

export default jwetStrategy;