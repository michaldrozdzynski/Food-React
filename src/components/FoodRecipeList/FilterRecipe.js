import React from 'react'
import {Col, Row, Form, FormLabel, FormGroup, FormControl, FormCheck, Button} from 'react-bootstrap'
import axios from 'axios'

class FilterRecipe extends React.Component {
    category = null
    cuisineCountry = null
    
    constructor() {
        super()

        this.state = {
            showFilter: false,
            chooseCategory: false,
            category: 0,
            chooseCountry: false,
            cuisineCountry: 0,
            vegetarian: false,
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    }

    handleClick() {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
            }
        })
    }

    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeCheckbox(event) {
		this.setState((prevState) =>{
			return {
				[event.target.name]: event.target.checked
			}
				
		})
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/foodcategory")
            .then((response) => {
                this.category = response.data
            })

        axios.get("http://localhost:8000/api/cuisine-country")
            .then((response) => {
                this.cuisineCountry = response.data
            })
    }

    render() {
        const arrow = this.state.showFilter ? <span>&#8593;</span> : <span>&#8595;</span>

        const categoryOptions = this.category ? this.category.map((item) => 
            <option key={item.id} value={item.id}>{item.name}</option>
        ) : null

        const countryOptions = this.cuisineCountry ? this.cuisineCountry.map((item) => 
            <option key={item.id} value={item.id}>{item.name}</option>
        ) : null

        const form = !this.state.showFilter ? null : (
            <Form onSubmit={(event) => this.props.handleSubmit(event, {
                chooseCategory: this.state.chooseCategory,
                category: this.state.category,
                chooseCountry: this.state.chooseCountry,
                cuisineCountry: this.state.cuisineCountry,
                vegetarian: this.state.vegetarian,
            })}>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <FormLabel>
                                <FormCheck 
                                    inline
                                    name="chooseCategory" 
                                    type="checkbox"  
                                    onChange={this.handleChangeCheckbox} 
                                    checked={this.state.chooseCategory}
                                />Category
                            </FormLabel>         
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <FormLabel>
                                <FormCheck 
                                    inline
                                    name="chooseCountry" 
                                    type="checkbox" 
                                    onChange={this.handleChangeCheckbox}
                                    checked={this.state.chooseCountry}
                                />Cuisine Country
                            </FormLabel>
                            
                
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <FormLabel>
                                <FormCheck
                                    inline
                                    name="vegetarian"
                                    type="checkbox"
                                    onChange={this.handleChangeCheckbox}
                                    checked={this.state.vegetarian}
                                />Vegetarian
                            </FormLabel>
                        </FormGroup>

                        
                        
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <FormControl
                                as="select"
                                disabled={!this.state.chooseCategory}
                                id="category"
                                value={this.state.category}
                                name="category"
                                onChange={this.handleChange}
                            >
                                <option key="0" value="">Please choose a category</option>
                                {categoryOptions}
                            </FormControl>
                        </FormGroup>
                    </Col>
                   <Col sm={4}>
                        <FormGroup>
                            <FormControl 
                                as="select" 
                                disabled={!this.state.chooseCountry} 
                                id="cuisineCountry" 
                                value={this.state.cuisineCountry} 
                                name="cuisineCountry" 
                                onChange={this.handleChange}
                            >
                                <option key="0" value="">Please choose a cuisine country</option>
                                {countryOptions}
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col sm={4}><Button variant="primary" type="submit">Search</Button></Col>
                </Row>
            </Form>
        )
        return (
            <div>
                <Row>
                    <div className="filter" onClick={this.handleClick}>Filter Recipe {arrow}</div>
                </Row>
                <Row>
                    <div className="filter">{form}</div>
                </Row>
            </div>
        )
    }
}

export default FilterRecipe