const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const model = require('../models/index');

module.exports = async function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'username' },
      (username, password, done) => {
        console.log(username);
        console.log(password);
        model.users_role
          .findAll({
            where: {
              username: username,
            },
          })
          .then(function (user) {
            if (!user.length > 0) {
              return done(null, false, {
                message: 'That email is not registered',
              });
            } else {
              bcrypt.compare(password, user[0].password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  let newUser = {
                    id: user[0].id,
                    username: user[0].username,
                    password: password[0].password,
                  };
                  return done(null, newUser);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              });
            }
          })
          .catch(function (err) {
            console.log(err.message);
            return done(null, false, { message: 'Error' });
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    model.users_role
      .findAll({
        where: {
          id: id,
        },
      })
      .then(function (user) {
        let newUser = {
          id: user[0].id,
          username: user[0].username,
          password: user[0].password,
        };
        done(null, newUser);
      });
  });
};
