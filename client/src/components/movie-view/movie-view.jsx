import React from 'react';
import { Button } from 'react-bootstrap';
import './movie-view.scss';

import { Link} from 'react-router-dom'

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
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
          <div className="label">Title</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        {/* <Button variant="primary" onClick={ backButtonHandler } className="back-button">
          Go Back
        </Button> */}

        <Link className="back-button btn btn-primary" to="/" >Back</Link>
       </div>
    );
  }
}
