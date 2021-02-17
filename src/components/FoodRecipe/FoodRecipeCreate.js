import axios from 'axios'
import React from 'react'
import {Row, Col, Form, FormGroup, FormControl, FormLabel, Button, FormCheck} from 'react-bootstrap'

class FoodRecipeCreate extends React.Component {
    constructor() {
        super()

        this.state = {
            categories: null,
            cuisineCountries: null,
            category: 0,
            cuisineCountry: 0,
            vegetarian: false,
            ingredientsCount: 3,
            image: null,
            ingredient: [],
            message: "",
        }

        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.changeIngredients = this.changeIngredients.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/foodcategory")
            .then((response) => {
                this.setState({
                    categories: response.data
                })
            })

        axios.get("http://localhost:8000/api/cuisine-country")
            .then((response) => {
                this.setState({
                    cuisineCountries: response.data
                })
            })
    }

    changeIngredients(value) {
        this.setState((prevState) => {
            return {
                ingredientsCount: prevState.ingredientsCount + value,
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        let ingredients = []

        

        const data = new FormData() 
        data.append('image', this.state.image)
        data.append('name', event.target.name.value)
        data.append('description', event.target.description.value)
        data.append('way_of_preparing', event.target.wayOfPreparing.value)
        data.append('cuisine_country_id', event.target.cuisineCountry.value)
        data.append('category_id', event.target.category.value)
        data.append('vegetarian', event.target.vegetarian.checked ? 1 : 0)
        for(let i = 0; i < this.state.ingredientsCount; i++) {
            ingredients.push(event.target.ingredient[i].value)
            data.append(`ingredient[${i}]`, event.target.ingredient[i].value)
        }
        
        console.log(data)

        axios.post("http://localhost:8000/api/foodrecipe", data, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
        .then((response) => {
            console.log(response)
            this.setState({
                message: <p className="text-success">Recipe has been successfully created.</p>,
            })
        })
        .catch((response) => {
            console.log(response.response)
        })
    }

    handleChangeFile(event) {
        this.setState({
            image: event.target.files[0] 
        })
    }

    render() {
        const categoryOptions = this.state.categories ? this.state.categories.map((item) => 
            <option key={item.id} value={item.id}>{item.name}</option>
        ) : null

        const countryOptions = this.state.cuisineCountries ? this.state.cuisineCountries.map((item) => 
            <option key={item.id} value={item.id}>{item.name}</option>
        ) : null

        let ingredientForms = []

        for (let i = 0; i < this.state.ingredientsCount; i++) {
            ingredientForms.push(<Row key={i} className="recipePoints"><FormLabel column sm={1}>{i+1}:</FormLabel><Col sm={11}><FormControl required name={`ingredient`} /></Col></Row>)
        }

        return (   
            <Form className="loginForm card" onSubmit={this.handleSubmit}>
                {this.state.message}
                <FormGroup as={Row}>
                    <FormLabel column sm={2}>Food name:</FormLabel>
                    <Col sm={10}>
                        <FormControl required name="name" type="text"/>
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <FormLabel column sm={2}>Image:</FormLabel>
                    <Col sm={10}>
                        <FormControl required name="image" type="file" onChange={this.handleChangeFile}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Description:</FormLabel>
                    <FormControl required name="description" style={{resize: "none"}} as="textarea" rows={5} maxLength={500}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Way od preparing:</FormLabel>
                    <FormControl required name="wayOfPreparing" style={{resize: "none"}} as="textarea" rows={5} maxLength={1000}/>
                </FormGroup>
                <FormGroup>
                <FormControl
                    as="select"
                    id="category"
                    name="category"
                >
                    <option key="0" value="">Please choose a category</option>
                    {categoryOptions}
                </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        as="select" 
                        id="cuisineCountry" 
                        name="cuisineCountry" 
                    >
                        <option key="0" value="">Please choose a cuisine country</option>
                        {countryOptions}
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>
                        <FormCheck
                            inline
                            name="vegetarian"
                            type="checkbox"
                        />Vegetarian
                    </FormLabel>
                </FormGroup>
                <FormGroup controlId="exampleForm.ControlTextarea1">
                    Ingredients:
                    {ingredientForms}
                    <Button variant="secondary" onClick={() => this.changeIngredients(1)}>+</Button>
                    <Button style={{margin: '1%'}} disabled={this.state.ingredientsCount <= 3} variant="secondary" onClick={() => this.changeIngredients(-1)}>-</Button>
                </FormGroup>
                <Button variant="primary" type="Submit">Create</Button>
            </Form>
        )
    }
}

export default FoodRecipeCreate