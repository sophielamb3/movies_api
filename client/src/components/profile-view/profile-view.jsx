import React, {Fragment} from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import {Button } from 'react-bootstrap';
import ModalPopUp from '../modal/ModalPopUp'
import { Link } from 'react-router-dom';
import moment from 'moment'

import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      show: false
    };

    this.deleteFavouriteMovie = this.deleteFavouriteMovie.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


componentDidMount(){
  console.log(this.state.user)
  if(!this.state.user){

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
}


  handleClose(e){
    // e.preventDefault()
    let curState = Object.assign({}, this.state)
    curState.show = !curState.show
    console.log(curState)
    this.setState(curState)
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
    let {user} = this.state
    console.log(user)
    axios.put(`https://myflixbysophie.herokuapp.com/users/${user.Username}`, {
      Username: user.Username,
      Password: user.Password,
      Email: user.Email,
      Birthday: user.Birthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
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

  //change state
  handleChange (e){
    e.preventDefault()
    let curState = Object.assign({}, this.state)

    curState.user[e.target.name] = e.target.value

    console.log(this.state)
    console.log(curState)
  }

  render() {
    //where does the props come from
    // const {user} = this.props;
    const {show, user} = this.state;
    console.log(show)
    if (!user) return null;


    return (
      <div className="profile-view">
      <h1>Your Profile Data</h1>
      {this.state.user &&
      <Fragment>
        <div className="username">
          <div className="label">Username</div>
          <div className="value">{user.Username}</div>
        </div>
        <div className="password">
          <div className="label">Password</div>
          <div className="value">***********</div>
        </div>
        <div className="birthday">
          <div className="label">Birthday</div>
          <div className="value">{moment(user.Birthday).format('DD-MM-YYYY')}</div>
        </div>
        <div className="email">
          <div className="label">Email</div>
          <div className="value">{user.Email}</div>
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

        <Button variant="primary" type="button" onClick={this.handleClose}>
          Update my info
        </Button>
        {/* Made a modal popup from react-bootstrap */}
        <ModalPopUp
            show={show}
            toggle={this.handleClose}
            user={user}
            change={this.handleChange}
            submit={this.handleSubmit} />
      </div>

    );
  }
}
