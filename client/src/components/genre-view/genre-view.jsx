import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import './genre-view.scss';


export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {director} = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <h1 className="director">{director.Name}</h1>
        <h2>Biography</h2>
        <div className="bio">{director.Bio}</div>
        <h2>Born</h2>
        <div className="birth">{director.Birth}</div>
        <h2>Died</h2>
        <div className="death">{director.Death}</div>
        <h2>Movies</h2>
        <div className="movies">{director.Movies}</div>
        <Link to={'/'}>
          <Button variant="primary" type="button">
          Go back
          </Button>
        </Link>
      </div>
    );
  }
}


DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string,
    Movies: PropTypes.array
  }).isRequired
};
