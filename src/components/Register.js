import axios from 'axios'
import React from 'react'
import {Row, Col, Form, FormGroup, FormControl, FormLabel, Button, FormCheck} from 'react-bootstrap'

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            errors: null,
            gender: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit(event) {
        event.preventDefault()

        const params = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirmation: event.target.confirm_password.value,
            gender: this.state.gender,
        }

        axios.post("http://localhost:8000/api/register", params)
        .then((response) => {
            this.props.login(response.data.access_token, response.data.user.id, response.data.user.name)
        })
        .catch((error) => {
            let errors = error.response.data.errors
            errors  = Object.entries(errors)
            
            let array = []
            for (const [key, value] of errors) {
                array.push(`${value}`)
            }

            errors = array.map((item) => {
                return <p className="text-danger">{item}</p>
            })

            this.setState({
                errors: errors
            })
        })
    }

    handleChange(event) {
        this.setState({
            gender: event.target.value,
        })
    }

    render() {
        return (   
            <Form className="loginForm card" onSubmit={this.handleSubmit}>
                {this.state.errors}
                <FormGroup as={Row}>
                    <FormLabel column sm={3}>Name:</FormLabel>
                    <Col sm={9}>
                        <FormControl required name="name" type="text"/>
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <FormLabel column sm={3}>E-mail:</FormLabel>
                    <Col sm={9}>
                        <FormControl required name="email" type="email"/>
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <FormLabel column sm={3}>Password:</FormLabel>
                    <Col sm={9}>
                        <FormControl required name="password" type="password"/>
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <FormLabel column sm={3}>Confirm Password:</FormLabel>
                    <Col sm={9}>
                        <FormControl required name="confirm_password" type="password"/>
                    </Col>
                </FormGroup>
                    
                <FormGroup as={Row}>
                    <Col sm={2}><FormLabel><FormCheck  required inline type="radio" name="gender" value="men" checked={this.state.gender === "men"} onChange={this.handleChange}/>Male</FormLabel></Col>
                    <Col sm={2}><FormLabel ><FormCheck required inline type="radio" name="gender" value="women" checked={this.state.gender === "women"} onChange={this.handleChange} />Female</FormLabel></Col>
                </FormGroup>
                <Button variant="primary" type="Submit">Register</Button>
            </Form>
        )
    }
}

export default Register