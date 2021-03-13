const express = require('express');

const bcrypt = require('bcryptjs');
const model = require('../../models/index');
const router = express.Router();

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

// POST users
router.post('/user-role', async function (req, res, next) {
  try {
    const {
      name,
      email,
      username,
      password,
      user_roles,
      phone_number,
    } = req.body;

    if (
      !name ||
      !email ||
      !username ||
      !password ||
      !user_roles ||
      !phone_number
    ) {
      res.send({
        message: 'Please fill correct field',
      });
    }

    let getHashPassword = await bcryptFunction(password);
    console.log('Hash: ' + getHashPassword);
    const user_role_find_one = await model.users_role.findAll({
      where: {
        username: username,
      },
    });
    if (user_role_find_one.length > 0) {
      res.send('Username Sudah ada');
    } else {
      const username_input = await model.users_role.create({
        name: name,
        email: email,
        username: username,
        password: getHashPassword,
        user_roles: user_roles,
        phone_number: phone_number,
      });
      if (username_input) {
        res.send({
          status: 'OK',
          messages: 'Data Successfully Input',
          data: {
            username: username,
          },
        });
      }
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

// Get users
router.get('/user-role', async function (req, res, next) {
  res.send('Hello World');
});

module.exports = router;
