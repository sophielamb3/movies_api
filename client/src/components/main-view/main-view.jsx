import React from 'react';
import axios from 'axios';

// class MainView extends React.Component {
//   constructor() {
//     // call superclass instructor so React can initialize it
//     super();
//
//     // Initialsise state to an empty object so can destructure it later
//     this.state = {};
//   }
//
//   //This overrides the render() methos of the super class
//   render() {
//     return (
//       <div className="main-view"></div>
//     );
//   }
// }

export class MainView extends React.Component {

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('<my-api-endpoint/movies>')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
     { movies.map(movie => (
       <div className="movie-card" key={movie._id}>{movie.Title}</div>
     ))}
     </div>
    );
  }
}
