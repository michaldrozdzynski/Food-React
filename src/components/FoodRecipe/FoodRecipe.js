import React from 'react'
import {Col, Row} from 'react-bootstrap'


function FoodRecipe(props) {
    let pointColor = null

    if (props.points === 0) {
        pointColor = {
            color: 'black',
        }
    } else if (props.points > 0) {
        pointColor = {
            color: 'MediumSeaGreen',
        }
    } else {
        pointColor = {
            color: 'red',
        }
    }

    return (
        <div className="card foodRecipe">
            <Row sm={10}>
                <Col sm={2}>
                    <img src={props.image} alt="food" width="200px"/>
                </Col>
                <Col xs={8}>
                    <Row className="foodName">
                        <div><a href={'/foodrecipe/' + props.id}>{props.name}</a></div>    
                    </Row>
                    <Row className="foodDescription">
                        <div >{props.description}</div>
                    </Row>
                    <Row className="footerRecipe"><div ><a href={'/user/' + props.user_id}>@{props.user_name}</a></div></Row>
                </Col>
                <Col sm={2}><div className="foodPoints" style={pointColor}>{props.points}</div></Col>
            </Row>  
        </div>
    )
}

export default FoodRecipe