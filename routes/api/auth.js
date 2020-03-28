const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
const User =require('../../models/User')

const router = express.Router();

// @route  POST api/auth
// @desc   Authenticate the user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if ( !email || !password) {
    return res.status(400).json({ text: `You must provide a${ (!email && !password) ? 'n email and password' : (!email ? 'n email' : ' password')}!`})
  }

  //Check for existing user
  User.findOne({email})
    .then(user => {
      if(!user) return res.status(400).json({ text: "User does not exist"})

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({text: "Invalid password!"})

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json(
                {token,
                  user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )
        })
    })
})

// @route  GET api/auth/user
// @desc   Get all Users
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;
