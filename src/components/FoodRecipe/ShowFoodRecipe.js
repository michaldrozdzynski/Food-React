import axios from 'axios'
import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import Comments from './Comments'

class ShowFoodRecipe extends React.Component {
    constructor() {
        super()
    
        this.state = {
            foodRecipe: null,
            ingredients: [],
            show: false,
            token: localStorage.getItem('token'),
            canRate: true,
        }

        this.rateRecipe = this.rateRecipe.bind(this)
    }

    

    componentDidMount() {
        const id = this.props.match.params.id

        axios.get(`http://localhost:8000/api/foodrecipe/${id}`)
        .then((response) => {
            this.setState({
                foodRecipe: response.data.foodRecipe,
                ingredients: response.data.ingredients,
                show: true,
            })
        })

        if (this.state.token === null) {
            this.setState({
                canRate: false
            })
        } else {
            axios.get(`http://localhost:8000/api/foodrecipe/${id}/check-rate`, {
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                }
            })
            .then((response) => {
                this.setState({
                    canRate: response.data
                })
            })
        }
    }

    rateRecipe(rating) {
        const rate = rating === 1 ? "good" : "bad"

        axios.patch(`http://localhost:8000/api/foodrecipe/${this.props.match.params.id}/${rate}`, null, {
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then((response) => {
            this.componentDidMount()
        })
        .catch((error) => {
            console.log(error.response)
        })
    }

    render() {
        let ingredients = []

        if (this.state.show) {
            for (let i = 0; i < this.state.ingredients.length; i++) {
                ingredients.push(<li key={this.state.ingredients[i].number}>{this.state.ingredients[i].name}</li>)
            }
        }

        const content = this.state.show ? (
            <div>
                <Row>
                <Col sm={6}><h4>Author: <a href={`/user${this.state.foodRecipe.user_id}`}>@{this.state.foodRecipe.user_name}</a></h4></Col>
                <Col sm={6}><h4 className="recipePoints"><Button disabled={!this.state.canRate} variant="danger" onClick={() => this.rateRecipe(-1)}>X</Button> <span style={{margin: '1%'}}>Points: {this.state.foodRecipe.points}</span> <Button disabled={!this.state.canRate} onClick={() => this.rateRecipe(1)} variant="success"> &#8730;</Button></h4></Col>
                <Col sm={6}><img src={this.state.show ? this.state.foodRecipe.image : null} alt="food"/></Col>
                <Col sm={6}>
                    <h1>{this.state.foodRecipe.name}</h1>
                    <h4>Description:</h4>
                    <p>{this.state.foodRecipe.description}</p>
                    <h4>Way of preparing: </h4>
                    <p>{this.state.foodRecipe.way_of_preparing}</p>
                    <h4>Ingredients:</h4>
                    <ol>{ingredients}</ol>
                </Col>
                </Row>
                <Row>
                    
                </Row>
            </div>
        ) : null
        return (
            <main className="recipe">
                {content}
                 <Comments id={this.props.match.params.id}/>
            </main>
        )
    }
}

export default ShowFoodRecipe