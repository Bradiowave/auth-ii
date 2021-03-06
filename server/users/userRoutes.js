const router = require('express').Router();

const User = require('./User');
const jwt = require('jsonwebtoken');
const secret = 'braden govi xang chris';
//base prefix is '/api/users'

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload = decodedToken;
      if (err) {
        return res
          .status(401)
          .json({ message: 'please sign in'})
      }
      next();
    })
  } else {
    res.status(401).json({ message: "please sign in"})
  }
}

router.get('/', restricted, (req, res) => {
  console.log(req.jwtPayload);
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;