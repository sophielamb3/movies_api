import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null
    };

    this.deleteFavouriteMovie = this.deleteFavouriteMovie.bind(this);
  }

  componentDidMount(){
    axios.get(`https://myflixbysophie.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      //set user state from url
        this.setState({
          user: response.data
        })
    })
    .catch(err=> {
        console.log("error setting state")
        console.log(err)
    })
  }

  updateUser(){

  }
  //this method should delete movie favourites
  deleteFavouriteMovie(movie){
      alert("movie deleted")
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
    const {user} = this.state;
    console.log(user)
    if (!user) return null;

    return (
      <div className="profile-view">
      <h1>Your Profile Data</h1>
        <div className="username">
          <div className="label">Name</div>
          <input value={user.Username} />
        </div>
        <div className="password">
          <div className="label">Password</div>
          <div className="value">***********</div>
        </div>
        <div className="birthday">
          <div className="label">Birthday</div>
          <input value={user.Birthday} />
        </div>
        <div className="email">
          <div className="label">Email</div>
          <input value={user.Email} />
        </div>
        <div className="favoriteMovies">
          <div className="label">Favorite Movies</div>
          {/* create a loop here to loop through */}
          {(user.FavoriteMovies && user.FavoriteMovies.length > 0) ? user.FavoriteMovies.map(fav => <li>{fav.title}<button onClick={this.deleteFavouriteMovie(fav._id)}>x</button></li>) : "No movies Yet"}
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
