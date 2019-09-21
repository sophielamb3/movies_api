import React from 'react';
import axios from 'axios';

import './main-view.scss'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Container, Row, Navbar, Nav } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

  constructor(){
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: true
    };
  }

  // One of the "hooks" available in a React Component
  // componentDidMount() {
  //   axios.get('https://myflixbysophie.herokuapp.com/movies')
  //     .then(response => {
  //       // Assign the result to the state
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedOut(user) {
    // this.setState({
    //   user
    // });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

getMovies(token) {
  axios.get('https://myflixbysophie.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    //Assign result to state
    this.setState({
      movies: response.data
    });
  })
  .catch(function(error){
    console.log(error);
  });
}

  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

register() {
  this.setState({
  register: false
  });
}


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (!user) return <LoginView onClick = {() => this.register()} onLoggedIn={user => this.onLoggedIn(user)}/>
    if (!register) return <RegistrationView onSignedIn={user => this.onSignedIn(user)}/>
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>

        <div className="main-view">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Sophie Lamb</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Navbar>
        <section className="banner p-5 text-center">
            <h1>Welcome to myFLix</h1>
            <h4>Start browsing your favourite movies below!</h4>
            <div id="triangle-down"></div>
        </section>
        <Container>
          <Switch>
          <Route exact path="/" render={() => <Row className="mt-5">{movies.map(m => <MovieCard key={m._id} movie={m}/>)}</Row>}/>

          <Route path="/movies/:moviesID" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.moviesID)}/> }/>

          <Route path="/directors/:name" render={({match}) => {
            if (!movies) return <div className="main-view"/>;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
          }}/>

          <Route path="/profile/:userID" render={({match}) => <ProfileView user={match.params.userID} /> }/>

          <Route path="/genre/:name" render={({match}) => {
            if (!movies) return <div className="main-view"/>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
          }}/>
          </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

//    <div className="main-view">
//        <Container>
//         <Row>
//            {selectedMovie ? (
//               <MovieView movie={selectedMovie}/>
//             ) : (
//               movies.map(movie => (
//                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
//              ))
//            )}
//           </Row>
//         </Container>
//      </div>
