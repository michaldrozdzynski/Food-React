import './App.css'
import React from 'react'
import FoodRecipes from './components/FoodRecipe/FoodRecipes.js'
import Navbar from './components/Navigation'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import Foodporn from './components/Foodporn/Foodporn';
import FoodpornCreate from './components/Foodporn/FoodpornCreate';
import ShowFoodRecipe from './components/FoodRecipe/ShowFoodRecipe';
import FoodRecipeCreate from './components/FoodRecipe/FoodRecipeCreate';
import User from './components/User/User';
import Conversation from './components/User/Conversation';
import 'regenerator-runtime/runtime'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            token: localStorage.getItem('token'),
            user_name: localStorage.getItem('user_name'),
            user_id: localStorage.getItem('user_id')
        }

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }  

    login(access_token, id, name) {
        this.setState({
            token: access_token,
            user_name: name,
            user_id: id,
        })

        localStorage.setItem('token', access_token)
        localStorage.setItem('user_name', name)
        localStorage.setItem('user_id', id)
    }

    logout() {
        axios.get("http://localhost:8000/api/logout", {
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then(() => {
            this.setState({
                token: null,
            })
    
            localStorage.clear();
        })   
    }

    render() {
        return (
            <Router>
                <Navbar
                    auth={this.state.token !== null}
                    user_name={this.state.user_name}
                    user_id={this.state.user_id}
                />
                <Switch>
                    <Route path="/" exact>
                        <FoodRecipes/>
                    </Route>
                    <Route path="/foodrecipe" exact>
                        <FoodRecipes/>
                    </Route>
                    <Route path="/login" exact>
                        {this.state.token !== null ? <Redirect to="/" /> : <Login login={this.login}/>}
                    </Route>
                    <Route path="/logout" exact>
                        {this.state.token !== null ? this.logout : <Redirect to="/" />}
                    </Route>
                    <Route path="/register" exact>
                        {this.state.token !== null ? <Redirect to="/" /> : <Register login={this.login}/>}
                    </Route>
                    <Route path="/foodporn" exact>
                        {this.state.token === null ? <Redirect to="/" /> : <Foodporn token={this.state.token}/>}
                    </Route>
                    <Route path="/foodporn/create" exact>
                        {this.state.token === null ? <Redirect to="/" /> : <FoodpornCreate token={this.state.token}/>}
                    </Route>
                    <Route path="/foodrecipe/create" exact>
                        {this.state.token === null ? <Redirect to="/" /> : <FoodRecipeCreate token={this.state.token}/>}
                    </Route>
                    <Route path="/foodrecipe/:id" exact component={ShowFoodRecipe}></Route>
                    <Route path="/user/:id" exact><User token={this.state.token} user_id={this.state.user_id}/></Route>
                    <Route path="/conversation" exact><Conversation token={this.state.token} user_id={this.state.user_id}/></Route>
                </Switch>
            </Router>
        )
    }
}

export default App;