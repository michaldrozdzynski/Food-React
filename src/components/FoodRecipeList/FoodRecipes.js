import axios from 'axios'
import React from 'react'
import Pagination from './Pagination'
import FilterRecipe from './FilterRecipe'
import FoodRecipe from "./FoodRecipe"

class FoodRecipes extends React.Component {
    
    currentPage = 1
    params = null

    constructor() {
        super()

        this.state = {
            foodrecipes: null,
            recipeComponents: null,
            lastPage: 1,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    

    componentDidMount() {
        axios.get("http://localhost:8000/api/foodrecipe?page=" + this.currentPage, this.params)
            .then((response) => {
                this.setState({
                    foodrecipes: response.data.data,
                    lastPage: response.data.last_page,
                })

                const components = this.state.foodrecipes.map((item) =>
                    <FoodRecipe
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        points={item.points}
                        description={item.description}
                        user_id={item.user_id}
                        user_name={item.user_name}
                    />
                )

                this.setState({
                    recipeComponents: components
                })
            })
    }

    handleClick(page) {
        this.currentPage = page

        this.componentDidMount()
    }

    handleSubmit(event, values) {
        event.preventDefault();

        this.params = {
            params: {
                category_id: values.chooseCategory ? values.category : null,
                cuisine_country_id: values.chooseCountry ? values.cuisineCountry : null,
                vegetarian: values.vegetarian ? 1 : null,
            }
        }
        
        axios.get("http://localhost:8000/api/foodrecipe", this.params)
            .then((response) => {
                this.setState({
                    foodrecipes: response.data.data,
                    lastPage: response.data.last_page,
                })

                this.currentPage = 1

                const components = this.state.foodrecipes.map((item) =>
                    <FoodRecipe
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        points={item.points}
                        description={item.description}
                        user_id={item.user_id}
                        user_name={item.user_name}
                    />
                )

                this.setState({
                    recipeComponents: components
                })
            })
    }

    render() {
        return (
            <div>
                <FilterRecipe
                    handleSubmit={this.handleSubmit}
                />
                {this.state.recipeComponents}
                <Pagination
                    currentPage={this.currentPage}
                    lastPage={this.state.lastPage}
                    handleClick={this.handleClick}
                />
            </div>
        )
    }
}

export default FoodRecipes