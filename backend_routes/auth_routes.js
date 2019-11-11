const router = require('express').Router();
const { User } = require('../models');
const passport = require('../auth/passport');

router.post('/auth/login', (req, res, next) => {
  // authenticate will look at the req.body and will be expecting
  // req.body.username and req.body.password
  passport.authenticate('local', (err, user, message) => {
    if (!user) return res.status(403).send({ message });

    req.login(user, err => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: err });
      }

      res.send({ user });
    });
  })(req, res, next);
});

router.post('/auth/register', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) return res.status(500).send({ message: 'User already exists.' });

    User.create({
      email: req.body.email,
      password: req.body.password
    }).then(new_user => {
      // You don't want to authenticate the user here since
      // they are new and have just registered
      // Instead, you want to simply sign them into the session(store)
      req.login(new_user, err => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: err });
        }

        res.send({
          message: 'User created successfully!',
          user: new_user
        });
      });
    });
  });
});

router.get('/auth/isauth', (req, res) => {
  res.send({ user: req.user });
});

router.get('/auth/logout', (req, res) => {
  req.logout();

  res.send({ message: 'Logged out successfully!' });
});

module.exports = router;