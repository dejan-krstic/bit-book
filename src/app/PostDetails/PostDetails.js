import React, { Component } from 'react';
import { getData, deleteData, postData } from '../services/DataService'
import TimeAgo from 'react-timeago'

// import _ from 'lodash';


class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            postID: 0,
            post: {},
            commentValue: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ commentValue: event.currentTarget.value });
    }

    sendComment = (e) => {
        e.preventDefault();

        postData.postComment(this.state.commentValue, this.state.postID)
            .then(response => {
                this.fetchComments();
            })
        this.setState({commentValue:''})
        
    }

    deletePost = (e) => {
        e.preventDefault();

        deleteData.deletePost(this.state.postID)
            .then(response => {
                this.props.history.push('/')
            })
    }

    componentDidMount() {
        this.fetchComments();
    }

    fetchComments = () => {
        getData.fetchComments(this.props.match.params.id)
            .then((result) => {
                this.setState({ commentList: result })
                this.setState({ postID: this.props.match.params.id })
   

                if (this.props.match.params.type === "text") {
                    getData.fetchTextPost(this.state.postID).then((result) => {
                        this.setState({ post: result })
                    })
                } else if (this.props.match.params.type === "video") {
                    getData.fetchVideoPost(this.state.postID).then((result) => {
                        this.setState({ post: result })
                    })
                } else if (this.props.match.params.type === "image") {

                    getData.fetchImagePost(this.state.postID).then((result) => {
                        this.setState({ post: result })

                    })
                }
            })
    }

    printPost() {

        if (this.props.match.params.type === "image") {
            return <img style={{width: 'inherit'}} src={this.state.post.imageUrl} className="ui image" alt="post-pic" />
        } else
            if (this.props.match.params.type === "video") {
                return <iframe src={this.state.post.videoUrl} class="ui image" title="post-title"></iframe>

            } else {
                return <p className="text-align-center">{this.state.post.text}</p>
            }
    }



    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="ui card feed">

                        {this.printPost()}

                        <div className="extra content">
                        </div>
                    </div>
                    <div className="ui comments">


                        <form className="ui reply form">
                            <div className="field">
                                <textarea id="commentInput" rows="3" onChange={this.handleChange} value={this.state.commentValue}> </textarea>
                            </div>
                            <button className="ui icon primary left labeled button" onClick={this.sendComment}>
                                <i aria-hidden="true" className="edit icon"></i>Add Comment</button>
                        </form>


                        {this.state.commentList.map((comment) => {

                            return <div className="comment" key={comment.id}>
                                <a className="avatar">
                                    <img src={comment.authorImage} alt="user-img" />
                                </a>
                                <div className="content">
                                    <div className="author">{comment.authorName}</div>
                                    <div className="metadata">
                                        <div><TimeAgo date={new Date(comment.dateCreated + 'z')} /></div>
                                    </div>
                                    <div className="text">
                                        <p>{comment.body}</p>
                                    </div>

                                </div>

                            </div>
                        })}
                        {/* whole form was old code */}
                        {/* <form className="ui reply form">
                            <div className="field">
                                <textarea id="commentInput" rows="3" onChange={this.handleChange}> </textarea>
                            </div> */}
                        {/* <button className="ui icon primary left labeled button" onClick={this.sendComment}>
                                <i aria-hidden="true" className="edit icon"></i>Add Comment</button> */}
                        {/* next two lines were incoming change and out of the form  */}
                        {(this.state.post.userId == sessionStorage.getItem('userId')) ?
                        <button className="ui icon primary left labeled button" onClick={this.deletePost}>
                            <i aria-hidden="true" className="edit icon"></i>Delete Post</button> :
                            <React.Fragment /> }
                        {/* </form> */}


                    </div>
                </div>
            </div>
        );
    }
}

export default PostDetails;
