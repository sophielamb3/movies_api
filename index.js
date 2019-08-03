const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// const Movies = [{
//   title: 'Lord of the Rings: The Fellowship of the Ring',
//   description: 'The Lord of the Rings is a trilogy of films about 9 men on a quest to destroy a powerful ring.',
//   genre: 'Fantasy-fiction',
//   director: 'Peter Jackson',
//   slug: 'lord-of-the-rings',
//   imageURL: '#',
// },
// {
//   title: 'Harry Potter and the Prisoner of Azkaban',
//   description: 'In the third film of the series, Harry Potter meets a very important family member.',
//   genre: 'Fantasy/Drama',
//   director: 'Alfonso Cuaron',
//   slug: 'harry-potter-and-the-prisoner-of-azkaban',
//   imageURL: '#',
// },
// {
//   title: 'Gladiator',
//   description: 'An ex army general looses everything, but can he rise to the top of the Gladiator circle?',
//   genre: 'Action',
//   director: 'Ridley Scott',
//   slug: 'gladiator',
//   imageURL: '#',
// },
// {
//   title: '10 Things I Hate About You',
//   description: 'A 1999 American romantic comedy about a bittersweet romance.',
//   genre: 'Romance/Teen',
//   director: 'Gil Junger',
//   slug: '10-things-i-hate-about-you',
//   imageURL: '#',
// },
// {
//   title: 'Legally Blonde',
//   description: 'A comedy following Elle Woods who has it all, but can she prove everyone wrong by becoming a top lawyer?',
//   genre: 'Comedy/Romance',
//   director: 'Robert Luketic',
//   slug: 'legally-blonde',
//   imageURL: '#',
// },
// {
//   title: 'Paranormal Activity',
//   description: 'A family haunted by a paranormal being in their home - will they be able to survive?',
//   genre: 'Horror/Thriller',
//   director: 'Oren Peli',
//   slug: 'paranormal-activity',
//   imageURL: '#',
// },
// ];
//
//
// const Users = [{
//   name: 'Sophie',
//   username: 'SophieLamb',
//   email: 'sophie@test.com',
//   password: 'sophie123',
//   dateOfBirth: '23/08/1995',
//   favourites: [],
// },
// {
//   name: 'Elaine',
//   username: 'ElaineLamb',
//   email: 'elaine@test.com',
//   password: 'elaine123',
//   dateOfBirth: '05/10/1962',
//   favourites: [],
// },
// ];
// Get Requests
// returns list of all movies to the user
// app.get('/movies', (req, res) => {
//   res.json(Movies);
// });

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

//* OLD CODE*//
// app.get('/movies/:title', (req, res) => {
//   // console.log(req.params.title);
//   const { title } = req.params;
//   // console.log(req.query.title);
//   const movies = Movies.filter(movie => movie.slug === title.toLowerCase());
//   console.log(movies);
//   res.json(movies);
// });

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

// * OLD CODE * //
// // data about genre by title
// app.get('/movies/:title/genre', (req, res) => {
//   const selectedMovie = Movies.find(movie => movie.title.toLowerCase() === req.params.title.toLowerCase());
//   if (selectedMovie) {
//     res.status(200).send(`The genre of ${selectedMovie.title} is ${selectedMovie.genre}`);
//   } else {
//     res.status(404).send(`Movie of the title ${req.params.title}was not found! Please try again.`);
//   }
// });

// return data about a genre (description) by name (eg Thriller) using mongoose
app.get('/movies/:Genre', function(req,res) {
  Movies.findOne({'Genre.Name': req.params.Genre})
  .then(function(genre){
    res.json(genre)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// * OLD CODE * //
// // info about director by name
// app.get('/movies/:director', (req, res) => {
//   res.send({data: 'return the directors DOB, bio and description.'});
// });

//Return data about directors
app.get('/movies/:Director', function(req,res) {
  Movies.findOne({Director: req.params.Director})
  .then(function(director){
    res.json(director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Allow new user to register
// app.post('/users', (req, res) => {
//   const {newUser} = req.body;
//
//   if (!newUser.name) {
//     const message = 'Username is missing';
//     res.status(400).send(message);
//   } else {
//     Users.push(newUser);
//     res.status(201).send(newUser);
//   }
// });

app.post('/users/', (req, res) => {
  res.send({
    name: 'Elaine',
    username: 'ElaineLamb',
    email: 'elaine@test.com',
    password: 'elaine123',
    dateOfBirth: '05/10/1962',
    favourites: [],
  });
});


// updating username/password
app.put('/users/:username', (req, res) => {
  res.send({data: 'Your username was updated successfully!'});
});

// updating user information
app.put('/users/:dateofbirth/:emailpreferences', (req, res) => {
  res.send('Your information was successfully updated');
});

// user adding movie to favourites
app.post('/users/:username/favourites', (req, res) => {
  // const {newFavourite} = req.body;
  // console.log(req.body);
  // if (!newFavourite) {
  //   const message = 'Movie title is missing';
  //   res.status(400).send(message);
  // } else {
    res.send({message: 'The following movie was added to your Favourites!',
              title: 'Paranormal Activity',
              description: 'A family haunted by a paranormal being in their home - will they be able to survive?',
              genre: 'Horror/Thriller',
              director: 'Oren Peli'});
    // const user = Users.find(res => Users.username === req.params.username);
    // Users.favourites.push(newFavourite);
    // res.status(201).send(Users.favourites);
});
// removing movie from favourites
app.delete('/users/:username/favourites', (req, res) => {
  res.send({data: 'Movie was removed from your favourites.'});
});

// deregiserting a user
app.delete('/users/:username', (req, res) => {
  res.send({data: 'Your account has been successfullly deleted.'});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Looks like something has gone wrong!');
});
// listening for requests
app.listen(8080, () => console.log('Your app is listening on port 8080.'));
