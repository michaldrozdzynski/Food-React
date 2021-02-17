import axios from 'axios'
import React from 'react'
import {Col, Row, Button} from 'react-bootstrap'

let disabledButton = false

function canRate(id, token) {

}

class Comment extends React.Component {
    constructor() {
        super()

        this.state = {
            canRate: true,
            points: 0,
        }

        this.rateComment = this.rateComment.bind(this)
    }
    
    componentDidMount() {
        if (this.props.token === null) {
            this.setState({
                canRate: false,
                points: this.props.points,
            }) 
        } else {
            axios.get(`http://localhost:8000/api/comment/${this.props.id}/check-rate`, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
            })
            .then((response) => {
                if (response.data === false) {
                    this.setState({
                        canRate: false,
                        points: this.props.points,
                    })
                } else {
                    this.setState({
                        canRate: true,
                        points: this.props.points,
                    })
                }
            })
        }
    }

    rateComment(rating) {
        const rate = rating === 1 ? "good" : "bad"

        axios.patch(`http://localhost:8000/api/comment/${this.props.id}/${rate}`, null, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
        .then((response) => {
            this.setState({
                points: this.state.points + rating,
                canRate: false,
            })
        })
        .catch((error) => {
            console.log(error.response)
        })
    }

    render() {
        let pointColor = null

        if (this.state.points === 0) {
            pointColor = {
                color: 'black',
            }
        } else if (this.state.points > 0) {
            pointColor = {
                color: 'MediumSeaGreen',
            }
        } else {
            pointColor = {
                color: 'red',
            }
        }

        const time = this.props.createdAt.split('T')[0] + " " + this.props.createdAt.split('T')[1].split('.')[0]

        return (
            <div className="card comment">
                <Row>
                    <Col sm={2}>
                        <a href={"/user/" + this.props.userId}>@{this.props.userName}</a>
                    </Col>
                    <Col sm={9}>{this.props.content}</Col>
                    <Col sm={1}>
                        <Row><Button disabled={!this.state.canRate} onClick={() => this.rateComment(1)} variant="success"> &#8730;</Button></Row>
                            <span className="commentPoints" style={pointColor}>{this.state.points}</span> <br/> 
                        <Row><Button  disabled={!this.state.canRate} variant="danger" onClick={() => this.rateComment(-1)}>X</Button></Row> 
                    </Col>
                </Row>
                <Row>
                    <Col>{time}</Col>
                </Row>
                
            </div>
        )
    }
}

export default Comment