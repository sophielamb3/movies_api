import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './genre-view.scss';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {genre} = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <h1 className="genre">{genre.Name}</h1>
        <div className="description">{genre.Description}</div>
        <Link to={'/'}>
          <Button variant="primary" type="button">
          Go back
          </Button>
        </Link>
      </div>
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};
