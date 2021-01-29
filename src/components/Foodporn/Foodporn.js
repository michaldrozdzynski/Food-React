import axios from 'axios'
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

class Foodporn extends React.Component {
    constructor() {
        super()

        this.state = {
            id: null,
            userId: null,
            name: null,
            image: null,
            points: null,
            userName: null,
            empty: false,
        }

        this.getFoodporn = this.getFoodporn.bind(this)
    }

    componentDidMount() {
        this.getFoodporn()
    }

    getFoodporn() {
        console.log(this.props.token)
        axios.get("http://localhost:8000/api/foodporn", {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
        .then((response) => {
            if (response.data.id === undefined) {
                this.setState({
                    empty: true,
                })
            } else {
                this.setState({
                    id: response.data.id,
                    userId: response.data.user_id,
                    name: response.data.name,
                    image: response.data.image,
                    points: response.data.points,
                    userName: response.data.user_name,
                })
            }

            let elem = document.getElementById("foodporn")
            elem.style.opacity =  1
        })
    }

    rateFoodporn(rating) {
        const rate = rating === 1 ? "good" : "bad"

        console.log(this.props.token)
        axios.patch(`http://localhost:8000/api/foodporn/${this.state.id}/${rate}`, null, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
        .then((response) => {
            this.getFoodporn()
        })
        .catch((error) => {
            console.log(error.response)
        })
    }

    move(speed) {
        let elem = document.getElementById("foodporn"),
            currentPos = 0, opacity = 1

        const motionInterval = setInterval(() => {
            currentPos += speed
            opacity += -0.01
            
            if (opacity <= 0) {
                currentPos = 0
                this.rateFoodporn(speed/10)
                clearInterval(motionInterval);
            }

            elem.style.left = currentPos+"px"
            elem.style.opacity =  opacity
        },2);
    }

    render() {
        const foodporn = this.state.empty ? <h1 className="foodporn">There's not any footporn to rate. Come back later!</h1> : (
            <div>
                <img src={this.state.image} alt="food"/>
                <div className="foodpornFooter">
                    <Row>
                        <Col>
                        <h2>{this.state.name}<a href={"/user/" + this.state.userId}> @{this.state.userName}</a></h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}><Button className="foodpornButton" variant="danger" onClick={() => this.move(-10)}>X</Button></Col>
                        <Col sm={4}><span className="foodpornPoints">{this.state.points}</span></Col>
                        <Col sm={4}><Button className="foodpornButton" variant="success" onClick={() => this.move(10)}>&#8730;</Button></Col>
                    </Row>

                </div>
            </div>
        )

        return (   
            <div className="foodporn" id="foodporn">{foodporn}</div>
        )
    }
}

export default Foodporn