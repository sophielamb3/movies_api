import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from "react-router-dom";


export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;

    return (
            <Card style={{width: '16rem' }} className="mr-3 mb-3">
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}<b className='is-favorite'>♥</b></Card.Title>
                <Card.Text numberoflines={1} >{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Read more</Button>
                </Link>
              </Card.Body>
            </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired
  }).isRequired,
  // onClick: PropTypes.func.isRequired
};
