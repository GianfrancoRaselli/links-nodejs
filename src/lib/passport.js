const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const helpers = require("../lib/helpers");
const User = require("../database/models/User");

passport.use("local.signin", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if (user != null) {
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            return done(null, user, req.flash("success", "Welcome " + user.username));
        } else {
            return done(null, false, req.flash("message", "Incorrect Password"));
        }
    } else {
        return done(null, false, req.flash("message", "The username does not exists"));
    }
}));

passport.use("local.signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    password = await helpers.encryptPassword(password);
    const newUser = await User.create({
        username: username,
        password: password,
        fullname: fullname
    });
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id_user);
});

passport.deserializeUser(async (id_user, done) => {
    const user = await User.findByPk(id_user);
    done(null, user);
});