import './App.css'
import React from 'react'
import FoodRecipes from './components/FoodRecipeList/FoodRecipes.js'
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

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            token: localStorage.getItem('token'),
        }

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }  

    login(access_token) {
        this.setState({
            token: access_token,
            logged: true,
        })

        localStorage.setItem('token', access_token)
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
                </Switch>
            </Router>
        )
    }
}

export default App;