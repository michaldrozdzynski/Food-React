import axios from 'axios'
import React from 'react'

class Conversation extends React.Component {
    constructor() {
        super()

        this.state = {
            conversations: null,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/conversation", {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
        .then((response) => {
            let conversations = []

            for (const element of response.data) {
                conversations.push(
                    <p>{element.user1_id === this.props.user_id ? "@" + element.user2_name : "@" + element.user1_name}</p>
                )
            }
            this.setState({
                conversations: conversations,
            })
            console.log(response.data[0])
        })
        .catch((response) => {
            console.log(response.response)
        })
    }

    render() {
        console.log(this.state.conversations)
        return (   
            <div className="card user"><h1>Your Conversations:</h1>{this.state.conversations}</div>
        )
    }
}

export default Conversation