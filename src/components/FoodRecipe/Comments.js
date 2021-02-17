import axios from 'axios'
import React from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'

class Comments extends React.Component {
    constructor() {
        super()

        this.state = {
            comments: null,
            components: [],
            token: localStorage.getItem('token'),
        }

        this.addComment = this.addComment.bind(this)
    }

    

    componentDidMount() {
        axios.get(`http://localhost:8000/api/comment/${this.props.id}`)
        .then((response) => {
            this.setState({
                comments: response.data.comments,
            })

            const components = this.state.comments.map((item) => 
                <Comment 
                    key={item.id}
                    id={item.id}
                    createdAt={item.created_at}
                    userId={item.user_id}
                    userName={item.user_name}
                    points={item.points}
                    content={item.content}
                    token={this.state.token}
                />
            )

            this.setState({
                components: components
            })
        })//.bind(this) 
    }

    addComment(event) {
        event.preventDefault()

        const data = {
            content: event.target.comment.value,

        }
       
        axios.post(`http://localhost:8000/api/comment/${this.props.id}`, data, {
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then((response) => {
            this.componentDidMount()
        })
        .catch((error => {
            console.log(error.response)
        }))
    }



    render() {

        const form = this.state.token !== null ? (
            <CommentForm
                handleSubmit={this.addComment}
                token={this.state.token}
            />
        ) : null
        return (
            <div>
                {this.state.components}
                {form}
            </div>
        )
    }
}

export default Comments