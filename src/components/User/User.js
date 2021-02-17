import axios from 'axios'
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class User extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };

    constructor() {
        super()

        this.state = {
            id: 0,
            user: null,
        }
    }

    componentDidMount() {
        let id = this.props.location.pathname.slice(6)
        this.setState({
            id: id
        })
        
        axios.get(`http://localhost:8000/api/user/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
        .then((response) => {
            console.log(response.data)

            this.setState({
                user: response.data
            })
        })
    }

    render() {
        let button

        if (this.props.user_id === this.state.id) {
            button = <Button onClick={this.showMessages}><a className="redirectButton" href="/conversation">Show Messages</a></Button>
        } else if (this.props.token !== null){
            button = <Button>Send Message</Button>
        } else {
            button = null
        }

        const content = this.state.user !== null ? (
            <div>       
                <Row>
                    <Col sm={6}><img src={this.state.user.avatar !== null ? this.state.user.avatar : "/avatar.webp"} alt="avatar"/></Col>
                    <Col sm={6}>
                        <h1>{this.state.user.name}</h1>
                        <h4>Gender: {this.state.user.gender}</h4>
                        {button}
                    </Col>
                </Row>
            </div>
        ) : null

        return (
            <div className="card user">{content}</div>
        ) 
    }
}

export default withRouter(User);
