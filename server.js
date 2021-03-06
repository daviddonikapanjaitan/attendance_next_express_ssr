const express = require('express');
const flash = require('connect-flash');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const user_role_controller = require('./router/router_user_role/controller_user_role');
const passport = require('passport');
const session = require('express-session');
const { ensureAuthenticated } = require('./config/auth');

const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require('body-parser');

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(flash());
    // Express Session
    server.use(
      session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
      })
    );
    // Passport Conifg
    require('./config/passport')(passport);

    // Passport middleware
    server.use(passport.initialize());
    server.use(passport.session());
    server.use('/api', user_role_controller);
    server.get('/login', (req, res) => {
      const message = req.flash('msg');
      const error_message = req.flash('error');
      const actualPage = '/login';
      if (error_message.length > 0) {
        const flashMessage = { error_msg: error_message };
        app.render(req, res, actualPage, flashMessage);
      } else {
        const flashMessage = { msg: message };
        app.render(req, res, actualPage, flashMessage);
      }
    });
    server.get('/sign-up', (req, res) => {
      const message = req.flash('msg');
      console.log(message);
      const actualPage = '/sign-up';
      const flashMessage = { msg: message };
      app.render(req, res, actualPage, flashMessage);
    });
    server.get('/post/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });
    server.get('/', ensureAuthenticated, (req, res) => {
      return handle(req, res);
    });
    server.get('/dashboard', ensureAuthenticated, (req, res) => {
      return handle(req, res);
    });
    server.get('/logout', ensureAuthenticated, (req, res) => {
      req.logout();
      req.flash('msg', 'You are logged out');
      res.redirect('/login');
    });
    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(3030, (err) => {
      if (err) throw err;
      console.log('server ready!');
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });
