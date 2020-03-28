//
//    MERN Stack Boilerplate with Redux
//    User Authentication Built with JSON Web Token  'routes/api/users' & 'routes/api/auth'
//
//    ** Configure MongoDB instance in '/config/default.json'
//        (Intended to connect to remote mongo instance via mLab or Atlas)
//

const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const path = require('path');

const apiRoutes = require('./routes/api');

const app = express();

//Bodyparser Middleware
app.use(express.json());

//Set Up API Routes
app.use('/api', apiRoutes);

//DB Config
const db = config.get("mongoURI");

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

//Serve static assets if in production
if(process.env.NODE_ENV ==='production') {
  //Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Your server is runnning on port ${port}!`))

module.exports = app;
