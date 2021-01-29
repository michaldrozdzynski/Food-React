import axios from 'axios'
import React from 'react'
import {Row, Col, Form, FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap'

class FoodpornCreate extends React.Component {
    constructor() {
        super()

        this.state = {
            name: "",
            image: null,
            message: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }
    
    handleSubmit(event) {
        event.preventDefault()

        const data = new FormData() 
        data.append('image', this.state.image)
        data.append('name', this.state.name)
       
        axios.post("http://localhost:8000/api/foodporn", data, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
        .then((response) => {
            console.log(response)
            this.setState({
                message: <p className="text-success">Foodporn has been successfully created.</p>,
                name: "",
                image: ""
            })
        })
        .catch((error => {
            console.log(error.response)
        }))

    }

    handleChangeFile(event) {
        this.setState({
            image: event.target.files[0] 
        })
    }

    handleChangeInput(event) {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return (   
            <Form className="loginForm card" onSubmit={this.handleSubmit}>
                {this.state.message}
                <FormGroup as={Row}>
                    <FormLabel column sm={2}>Food name:</FormLabel>
                    <Col sm={10}>
                        <FormControl required name="name" type="text" value={this.state.name} onChange={this.handleChangeInput}/>
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <FormLabel column sm={2}>Image:</FormLabel>
                    <Col sm={10}>
                        <FormControl required name="image" type="file" onChange={this.handleChangeFile}/>
                    </Col>
                </FormGroup>
                <Button variant="primary" type="Submit">Create</Button>
            </Form>
        )
    }
}

export default FoodpornCreate