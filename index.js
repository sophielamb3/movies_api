const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');

const Movies = Models.Movie;
const Users = Models.User;

app.use(express.static('public'));
app.use(express.json());


// connect to local DB
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// connect to online DB
mongoose.connect('mongodb+srv://myFlix_admin:Chloe2001!@cluster0-ylwma.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});


require('./passport')
require('./server/auth.js')(app);


const cors = require('cors');
var allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback (null,true);
    if(allowedOrigins.indexOf(origin)=== -1){
      var message = 'The CORS policy for this application doesnt allow access from origin' + origin;
      return callback (new Error(message ), false);
    }
    return callback(null,true);
  }
}));

const {check, validationResult} = require('express-validator');

//return list of all movies using mongoose
app.get('/movies', function(req,res){
  Movies.find()
  .then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});



// get movies by title using mongoose
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), function (req,res) {
  Movies.findOne({ Title: req.params.Title})
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});



// return data about a genre (description) by name (eg Thriller) using mongoose
app.get('/movies/genre/:Genre', passport.authenticate('jwt', {session: false}), function(req,res) {
  Movies.findOne({'Genre.Name': req.params.Genre})
  .then(function(genre){
    res.json(genre)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});



//Return data about directors
app.get('/movies/director/:Director', passport.authenticate('jwt', {session: false}), function(req,res) {
  Movies.findOne({'Director.Name': req.params.Director})
  .then(function(director){
    res.json(director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});




//Add a user - allow user to register
app.post('/users', function(req, res) {
  // Validation logic here
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check validation object for errors
  const errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({errors: errors});
  }

  const hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(userAdded) {res.status(201).json(userAdded) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


// updating username/password

//mongoose
app.put('/users/:Username',passport.authenticate('jwt', {session: false}), function (req, res) {
  // Validation logic here
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check validation object for errors
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({errors: errors});
  }

  Users.findOneAndUpdate({Username: req.params.Username},{$set : {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }},
  { new : true},
  function (err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: "+err);
    }else {
      res.json(updatedUser)
    }
  })
});


// user adding movie to favourites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), function (req,res){
  // Validation logic here
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check validation object for errors
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({errors: errors});
  }

  Users.findOneAndUpdate({ Username: req.params.Username},{
    $push: { Favourites: req.params.MovieID}
  },
  { new : true}, function (err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});


// removing movie from favourites
//mongoose
app.delete('/users/:Username/Movies/:MovieID',passport.authenticate('jwt', {session: false}), function(req,res) {
  // Validation logic here
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check validation object for errors
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({errors: errors});
  }

  Users.findOneAndRemove ({ Username: req.params.Username})
  .then(item => {
    res.json(item)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err);
  })
});



// deregiserting a user by username
//mongoose
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), function(req,res) {
  Users.findOneAndRemove ({ Username: req.params.Username})
  .then(function(user) {
    if(!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Looks like something has gone wrong!');
});

// listening for requests
// app.listen(8080, () => console.log('Your app is listening on port 8080.'));
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function(){
  console.log("Listening on Port 3000");
});
