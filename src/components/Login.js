import axios from 'axios'
import React from 'react'
import {Row, Col, Form, FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap'

class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(event) {
        event.preventDefault()
    
        const params = {
            email: event.target.email.value,
            password: event.target.password.value,
            remember_me: event.target.remember_me.checked,
        }

        axios.post('http://localhost:8000/api/login', params)
        .then((response) => {
            this.props.login(response.data.access_token, response.data.user.id, response.data.user.name)
        })
        .catch(() => {
            this.setState({
                error : <p className="text-danger">Wrong password or e-mail.</p>
            })
        })
    }

    render() {
        return (   
            <Form className="loginForm card" onSubmit={this.handleSubmit}>
                {this.state.error}
                <FormGroup as={Row}>
                    <FormLabel column sm={2}>E-mail:</FormLabel>
                    <Col sm={10}>
                        <FormControl name="email" type="email"/>
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <FormLabel column sm={2}>Password:</FormLabel>
                    <Col sm={10}>
                        <FormControl name="password" type="password"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <FormLabel>
                        <Form.Check
                            inline
                            type="checkbox"
                            name="remember_me"
                        />Remember me
                    </FormLabel>
                </FormGroup>
                <Button variant="primary" type="Submit">Log in</Button>
            </Form>
        )
    }
}

export default Login