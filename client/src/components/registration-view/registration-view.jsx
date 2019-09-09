import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onSignedIn(username);
  };

  return (
    <Form>
      <h2>Sign up!</h2>
      <Form.Group controlId="formBasicUsername">
        <Form.Label >Set up your Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Let's create your password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Go on... give us your email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@ema.il" />
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>When's your birthday again?</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="01.01.2000" />
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleSubmit}>
      Sign me up!
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
