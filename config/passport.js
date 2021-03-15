const LocalStrategy = require('passport-local').Strategy;
const bcrypt = requrie('bcryptjs');

// Load User model
const model = require('../models/index');

module.exports = async function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'username' },
      (username, password, done) => {
        console.log('ada');
        model.user_role
          .findAll({
            where: {
              username: username,
            },
          })
          .then(function (user) {
            if (!user) {
              return done(null, false, {
                message: 'That email is not registered',
              });
            } else {
              bcrypt.compare(password, findUser.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, findUser);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              });
            }
          });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
