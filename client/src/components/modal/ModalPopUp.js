import React from "react";
import {Button, Modal, Form} from 'react-bootstrap';
import moment from 'moment'

export default class ModalPopUp extends React.Component {
  constructor(){
    super()

  }
  render() {
    let {show, user} = this.props
    console.log(user)
    console.log(show)
    return (
      <Modal show={show} onHide={this.props.toggle}>
         <Modal.Header>
           <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>Woohoo, you're reading this text in a modal!
             <Form.Group controlId="formGridAddress2">
               <Form.Label>Username</Form.Label>
               <Form.Control name="Username" placeholder="Username" value={user.Username} readOnly />
             </Form.Group>
             <Form.Group controlId="formGridAddress2">
               <Form.Label>Password</Form.Label>
               <Form.Control name="Password" placeholder="Birthday" defaultValue={`******`} onChange={this.props.change}/>
             </Form.Group>
             <Form.Group controlId="formGridAddress2">
               <Form.Label>Email</Form.Label>
               <Form.Control onChange={this.props.change} placeholder="Email" name="Email" defaultValue={user.Email} />
             </Form.Group>
            <Form.Group controlId="formGridAddress2">
               <Form.Label>Birthday</Form.Label>
               <Form.Control onChange={this.props.change} placeholder="Birthday" defaultValue={moment(user.Birthday).format('DD-MM-YYYY')} />
             </Form.Group>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={this.props.toggle} >
             Close
           </Button>
           <Button variant="primary" onClick={this.props.submit}>
             Save Changes
           </Button>
         </Modal.Footer>
       </Modal>
    )
  }
}
