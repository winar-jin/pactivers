const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/database');
const User = require('../models/user');

module.exports = function (passport) {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeader();
    options.secretOrKey = config.secret;
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.getUserByUsername(jwt_payload._doc.name, (err, user) => {
            if (err) {
                return done(err,false);
            };
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}