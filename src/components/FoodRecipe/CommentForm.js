import axios from 'axios'
import React from 'react'
import {Row, Col, Form, FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap'

function CommentForm(props) {
    return (   
        <Form className="loginForm" onSubmit={props.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Add Comment</Form.Label>
                <Form.Control required name="comment" style={{resize: "none"}} as="textarea" rows={5} maxLength={500}/>
            </Form.Group>
            <Button variant="primary" type="Submit">Send</Button>
        </Form>
    )

}

export default CommentForm