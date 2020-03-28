const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User =require('../../models/User')

const router = express.Router();

// @route  POST api/users
// @desc   Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  //Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ text: "Please fill out all the fields"})
  }

  //Check for existing user
  User.findOne({email})
    .then(user => {
      if(user) return res.status(400).json({ text: "User already exists"})

      const newUser = new User({
        name,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn : 6400 },
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
    })
})

// @route  GET api/users
// @desc   Get all Users
// @access  Public
router.get('/', (req, res) => {
  res.send('hey')
})

module.exports = router;
