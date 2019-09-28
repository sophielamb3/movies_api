import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './movie-view.scss';

import { Link} from 'react-router-dom'

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
    };

    this.addMovieToFavorites = this.addMovieToFavorites.bind(this);

  }

  // addMovieToFavorites() {
  //       let movieId = this.props.movie._id;
  //       console.log(movieId);
  //       axios.post('https://myflix-mern.herokuapp.com/users/johndoe/movies/5c97cc646728671b439bc21a', {
  //           headers: { Authorization: `Bearer ${localStorage.token}` }
  //       })
  //           .then(response => {
  //               this.props.updateProfile('FavoriteMovies', response.data.FavoriteMovies);
  //           })
  //           .catch(err => {
  //               console.error(err);
  //           });
  //   }


addMovieToFavorites(event) {
  event.preventDefault();
  axios.post(`https://myflixbysophie.herokuapp.com/users/${this.props.user}/movies/${movie._id}`),{
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
  }
  .then(respone => {
    this.props.updateProfile('FavoriteMovies', response.data.FavouriteMovies);
    alert('Movie added to favourites!');
  })
  .catch(event => {
    alert('Oops... something went wrong!')
  });
}



removeMovieFromFavorites() {
    axios.delete(`https://myflixbysophie.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .then(response => {
            this.props.updateProfile('FavoriteMovies', response.data.FavoriteMovies);
        })
        .catch(err => {
            console.error(err);
        });
}

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    console.log("movie-view ")
    console.log(this.props)

    const backButtonHandler = () => {
      window.open('./main-view.jsx', '_self');
    }

    return (
       <div className="movie-view">
        <div className="movie-title">
          <h5 className="label">Title</h5>
          <p className="value">{movie.Title}</p>
        </div>
        <div className="movie-description">
          <h5 className="label">Description</h5>
          <p className="value">{movie.Description}</p>
        </div>
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-genre">
          <h5 className="label">Genre</h5>
          <p className="value">{movie.Genre.Name}</p>
        </div>
        <div className="movie-director">
          <h5 className="label">Director</h5>
          <p className="value">{movie.Director.Name}</p>
        </div>
        <div className='add-to-favorite'>
          <Button variant="primary" type="button" onClick={(event) => this.addMovieToFavorites(event)}>Add to favorite</Button>
        </div>
        <div className='remove-from-favorite'>
          <Button variant="primary" type="button" onClick={(event) => this.removeMovieFromFavorites(event)}>Remove as favourite</Button>
        </div>
        {/* <Button variant="primary" onClick={ backButtonHandler } className="back-button">
          Go Back
        </Button> */}

        <Link className="back-button btn btn-secondary" to="/" >Back</Link>
       </div>
    );
  }
}
