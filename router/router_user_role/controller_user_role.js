const express = require('express');

const bcrypt = require('bcryptjs');
const model = require('../../models/index');

function bcryptFunction(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(hash);
      });
    });
  });
}

const router = express.Router();

// Get All
router.get('/user-role', async function (req, res, next) {
  try {
    const user_role_find_all = await model.users_role.findAll({
      attributes: { exclude: ['password'] },
    });
    res.send({
      status: 'OK',
      data: user_role_find_all,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.send({
        status: 'ERROR',
        messages: err.messages,
        data: {},
      });
    }
  }
});

// GET Users by username
router.get('/user-role/:username', async function (req, res, next) {
  try {
    const userName = req.params.username;
    const user_role_find_one = await model.users_role.findAll({
      attributes: { exclude: ['password'] },
      where: {
        username: userName,
      },
    });
    if (user_role_find_one.length > 0) {
      res.send({
        status: 'OK',
        desc: user_role_find_one,
      });
    } else {
      res.send({
        status: 'ERROR',
        desc: 'Username not found',
      });
    }
  } catch (err) {
    if (err) {
      console.log(err);
      res.send({
        status: 'ERROR',
        messages: err.messages,
        data: {},
      });
    }
  }
});

// Delete by username
router.delete('/user-role', async function (req, res, next) {
  try {
    const userName = req.body.username;
    const user_role_find_one = await model.users_role.destroy({
      where: {
        username: userName,
      },
    });
    if (user_role_find_one) {
      res.send({
        status: 'OK',
        desc: `${userName} has been destroyed`,
      });
    } else {
      res.send({
        status: 'ERROR',
        desc: 'Username not found',
      });
    }
  } catch (err) {
    if (err) {
      console.log(err);
      res.send({
        status: 'ERROR',
        messages: err.messages,
        data: {},
      });
    }
  }
});

// POST users
router.post('/user-role', async function (req, res, next) {
  try {
    const { name, email, username, password, phone_number } = req.body;

    if (!name || !email || !username || !password || !phone_number) {
      const actualPage = '/post';
      const queryParams = { id: 'Hello World' };
      req.flash('msg', 'Please fill correct field');
      res.redirect('/sign-up');
      // res.send({
      //   message: 'Please fill correct field',
      // });
    } else {
      let getHashPassword = await bcryptFunction(password);
      console.log('Hash: ' + getHashPassword);
      const user_role_find_one = await model.users_role.findAll({
        where: {
          username: username,
        },
      });
      if (user_role_find_one.length > 0) {
        req.flash('msg', 'Username has been registered');
        res.redirect('/sign-up');
        // res.send('Username Sudah ada');
      } else {
        const username_input = await model.users_role.create({
          name: name,
          email: email,
          username: username,
          password: getHashPassword,
          user_roles: 'Null',
          phone_number: phone_number,
          status: 'Pending',
        });
        if (username_input) {
          req.flash('msg', 'Registration Success');
          res.redirect('/login');
          // res.send({
          //   status: 'OK',
          //   messages: 'Data Successfully Input',
          //   data: {
          //     username: username,
          //   },
          // });
        }
      }
    }
  } catch (err) {
    if (err) {
      console.log(err);
      res.redirect('/sign-up');
      // res.send({
      //   status: 'ERROR',
      //   messages: err.messages,
      //   data: {},
      // });
    }
  }
});

// Get users
router.get('/user-role', async function (req, res, next) {
  res.send('Hello World');
});

module.exports = router;
