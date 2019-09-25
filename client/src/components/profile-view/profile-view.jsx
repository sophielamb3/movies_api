import React, {Fragment} from 'react';
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



  deleteFavouriteMovie(movie){
    alert("Movie deleted from favourites!")
  }

  //update user data
  handleSubmit(event) {
    event.preventDefault();
    axios.put(`https://myflixbysophie.herokuapp.com/users/${this.props.user}`), {
      Username: this.props.username,
      Password: this.props.password,
      Email: this.props.email,
      Birthday: this.props.birthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
    .then(response => {
      console.log(response);
      alert('Your data has been updated!');
      //update localStorage
      localStorage.setItem('user', this.state.username);
      window.open('/profile', '_self');
    })
    .catch(event => {
      console.log('error updating the userdata');
      alert('Ooooops... Something went wrong!');
    });
  };

  render() {
    const {user} = this.props;
    console.log(this.state.user)
    if (!user) return null;


    return (
      <div className="profile-view">
      <h1>Your Profile Data</h1>
      {this.state.user &&
      <Fragment>
        <div className="username">
          <div className="label">Name</div>
          <div className="value">{this.state.user.Username}</div>
        </div>
        <div className="password">
          <div className="label">Password</div>
          <div className="value">***********</div>
        </div>
        <div className="birthday">
          <div className="label">Birthday</div>
          <div className="value">{this.state.user.Birthday}</div>
        </div>
        <div className="email">
          <div className="label">Email</div>
          <div className="value">{this.state.user.Email}</div>
        </div>
        <div className="favoriteMovies">
          <div className="label">Favorite Movies</div>
          {(user.FavoriteMovies && user.FavoriteMovies.length > 0) ? user.FavoriteMovies.map(fav => <li>{fav.title}<button onClick={this.deleteFavouriteMovie(fav._id)}>x</button></li>) : "No movies Yet"}
          <div className="value">{this.state.user.FavoriteMovies}</div>
        </div>
        </Fragment>}
        <Link to={'/'}>
          <Button  variant="primary" type="button">
          Go back
          </Button>
        </Link>
        <Button  variant="primary" type="button" onClick={(event) => this.deleteUser(event)}>
        Delete
        </Button>

        <Button variant="primary" type="button" onClick={(event) => this.handleSubmit(event)}>
          Update my info
        </Button>

      </div>

    );
  }
}
