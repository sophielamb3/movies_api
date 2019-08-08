const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const passport = require('passport');
require('./passport')
var auth = require('./auth')(app);

//return list of all movies using mongoose
app.get('/movies', passport.authenticate('jwt', {session: false}), function(req,res){
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
app.get('/movies/:Title', function (req,res) {
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
app.get('/movies/genre/:Genre', function(req,res) {
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
app.get('/movies/director/:Director', function(req,res) {
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
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
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

// * OLD CODE * //
// app.put('/users/:username', (req, res) => {
//   res.send({data: 'Your username was updated successfully!'});
// });

//mongoose
app.put('/users/:Username', function (req, res) {
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
app.post('/users/:Username/Movies/:MovieID', function (req,res){
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
app.delete('/users/:Username/Movies/:MovieID', function(req,res) {
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
app.delete('/users/:Username', function(req,res) {
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
app.listen(8080, () => console.log('Your app is listening on port 8080.'));
