import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount(){
    // axios.get()
  }

  deleteUser(event) {
    event.preventDefault();
    axios.delete(`https://myflixbysophie.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      alert('Your Account has been deleted!');
      //clears storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      //opens login view
      window.open('/', '_self');
    })
    .catch(event => {
      alert('failed to delete user');
    });
  }

  render() {
    const {user} = this.props;
    console.log(user)
    if (!user) return null;

    return (
      <div className="profile-view">
      <h1>Your Profile Data</h1>
        <div className="username">
          <div className="label">Name</div>
          <div className="value">{user.Username}</div>
        </div>
        <div className="password">
          <div className="label">Password</div>
          <div className="value">***********</div>
        </div>
        <div className="birthday">
          <div className="label">Birthday</div>
          <div className="value">{user.Birthday}</div>
        </div>
        <div className="email">
          <div className="label">Email</div>
          <div className="value">{user.Email}</div>
        </div>
        <div className="favoriteMovies">
          <div className="label">Favorite Movies</div>
          <div className="value">{user.FavoriteMovies}</div>
        </div>
        <Link to={'/'}>
          <Button  variant="primary" type="button">
          Go back
          </Button>
        </Link>
        <Button  variant="primary" type="button" onClick={(event) => this.deleteUser(event)}>
        Delete
        </Button>
      </div>
    );
  }
}
