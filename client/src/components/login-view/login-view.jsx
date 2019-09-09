import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
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
      <p>Not signed up yet?</p>
      <p>Get signed up <span onClick={() => props.onClick()}>here!</span></p>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
