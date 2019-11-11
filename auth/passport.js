const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user));
});

// Local expects a body.username and a body.password by default
passport.use(new LocalStrategy(
  {
    usernameField: 'email' // change the default to email instead
  },
  (email, password, done) => {
    User.findOne({
      where: { email }
    }).then(user => {
      if (!user) {
        return done(null, false, 'No user exists with that email.');
      }

      if (user.password !== password) {
        return done(null, false, 'Wrong Password');
      }

      return done(null, user);
    }).catch(err => res.status(503).send({ message: err }));
  }
));

module.exports = passport;