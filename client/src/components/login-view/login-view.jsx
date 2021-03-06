import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isRegister, setRegister ] = useState(false)


  const handleSubmit = (e) => {
  e.preventDefault();
  /* Send a request to the server for authentication */
  axios.post('https://myflixbysophie.herokuapp.com/login', {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user')
  });
};

  const isReg = (e) => {
    e.preventDefault();
    console.log(isRegister);
    setRegister(!isRegister)
  };

  // return (
  //   // <form>
  //   //   <label>
  //   //     Username:
  //   //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
  //   //   </label>
  //   //   <label>
  //   //     Password:
  //   //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
  //   //   </label>
  //   //   <button type="button" onClick={handleSubmit}>Submit</button>
  //   // </form>
  //   <Form>
  //     <Form.Group controlID="formBasicUsername">
  //       <Form.Label>Username:</Form.Label>
  //
  // );

  if(isRegister){
    return (<RegistrationView goBack={isReg} onSignedIn={ props.onLoggedIn }/>)
  }else{


  return (
    <Form>
      <h2>Login!</h2>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleSubmit}>
      Login
      </Button>
      <br></br>
      <p>Not signed up yet?</p>
      <p><Button variant="secondary" type="button" onClick={isReg}>Get signed up here!</Button></p>
    </Form>
  );
  }
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
