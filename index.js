const express = require ('express');
const morgan = require ('morgan');
const app = express();

//serve documentation.html from public folder
app.use(express.static('public'));

// Morgan's console.log
app.use(morgan('common'));

let topMovies = [ {
  title : 'Lord of the Rings: The Fellowship of the Ring',
},
{
  title : 'Harry Potter and the Prisoner of Azkaban',
},
{
  title : 'Gladiator'
},
{
  title : '10 Things I Hate About You'
}
]


//Get Requests
app.get('/movies', function(req, res) {
  res.json(topMovies)
});
app.get('/', function(req, res){
  res.send('Welcome to my top movie selection!')
});

app.use(function (err,req,res,next) {
  console.error(err.stack);
  res.status(500).send('Oops! Looks like something has gone wrong!');
});


// listening for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
