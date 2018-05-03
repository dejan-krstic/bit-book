import React, { Component } from 'react';
import FeedList from './FeedList';
import { Button, Grid } from 'semantic-ui-react'
import { postData } from '../services/DataService'
import ModalText from './ModalText'
import ModalImage from './ModalImage'
import ModalVideo from './ModalVideo'



class FeedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: {
                show: false,
                icon: "add"
            },
            modal: {
                open: false
            },
            reRender: false,
            errorMessage: ''
        };
        this.addButtonOnClick = this.addButtonOnClick.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.sendTextPost = this.sendTextPost.bind(this);
        this.sendImagePost = this.sendImagePost.bind(this);
        this.sendVideoPost = this.sendVideoPost.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    addButton() {
        return (
            <div id="addButtons">
                {this.postButtons()}
                <Button circular icon={this.state.buttons.icon} color="orange" id="addButton" label="New post" onClick={this.addButtonOnClick} />

            </div>
        )
    }

    addButtonOnClick() {
        this.setState(prevState => {
            return {
                buttons: {
                    show: !prevState.buttons.show,
                    icon: prevState.buttons.show ? 'add' : 'x'
                }
            }
        })
    }

    postButtons() {
        if (this.state.buttons.show === true) {
            return (
                <React.Fragment>
                    <Button circular icon="picture" color="teal" id="imageButton" onClick={this.show('image')} />
                    <Button circular icon="file text" color="red" id="postButton" onClick={this.show('text')} />
                    <Button circular icon="video" color="yellow" id="videoButton" onClick={this.show('video')} />
                </React.Fragment>
            )
        }
    }

    show = type => () => this.setState({
        modal: {
            open: {
                text: false,
                image: false,
                video: false,
                [type]: true
            }
        }
    })
    close = () => this.setState({
        modal: {
            open: false
        },
        buttons: {
            show: false,
            icon: "add"
        }
    })

    handleInput(e) {
        this.setState({ data: e.target.value })
    }

    isValidImage(input) {
        return ((input.match(/\.(jpeg|jpg|gif|png)$/) != null) && (input.match(/^(http|https):\/\//) != null));
    }

    isValidVideo(input) {
        return ((input.match(/^https:\/\/www\.youtube\.com\/embed\//) != null)||(input.match(/^https:\/\/www\.youtube\.com\/watch\?v=/) != null))
    }

    sendTextPost = () => {
        if (this.state.data.split(' ').join('') === '') {
            this.setState({ errorMessage: 'Not valid' });
            return;
        }
        this.setState({
            modal:
                { open: false },
            buttons: {
                show: false,
                icon: "add"
            },
            errorMessage: ''
        });
        postData.postText(this.state.data)
            .then(() => {
                this.setState((prevState, props) => ({ reRender: !prevState.reRender, data: '' }))
            })
    }

    sendImagePost = () => {
        if (!this.isValidImage(this.state.data)) {
            this.setState({ errorMessage: 'Not valid image URL' })
            return
        }
        this.setState({
            modal:
                { open: false },
            buttons: {
                show: false,
                icon: "add"
            },
            errorMessage: ''
        });
        postData.postImage(this.state.data)
            .then(() => {
                this.setState((prevState, props) => ({ reRender: !prevState.reRender }))
            })
    }

    sendVideoPost = () => {
        if (!this.isValidVideo(this.state.data)) {
            this.setState({ errorMessage: 'Not valid video URL' })
            return
        }
        this.setState({
            modal:
                { open: false },
            buttons: {
                show: false,
                icon: "add"
            },
            errorMessage: ''
        });
        postData.postVideo(this.state.data)
            .then(() => {
                this.setState((prevState, props) => ({ reRender: !prevState.reRender }))
            })
    }




    render() {
        /* if (_.isEmpty(this.state.data)) {
            return (<React.Fragment>
                {this.addButton()}
                <Loader />
                {this.modal()}
            </React.Fragment>
            )
        } */
        return (
            <React.Fragment>
                {this.addButton()}
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="four">
                        </Grid.Column>
                        <Grid.Column width="eight">
                            <FeedList reRender={this.state.reRender} />
                        </Grid.Column>
                        <Grid.Column width="four">
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <ModalText open={this.state.modal.open.text} onClose={this.close} handleInput={this.handleInput} sendPost={this.sendTextPost} error={this.state.errorMessage} />
                <ModalImage open={this.state.modal.open.image} onClose={this.close} handleInput={this.handleInput} sendPost={this.sendImagePost} error={this.state.errorMessage} />
                <ModalVideo open={this.state.modal.open.video} onClose={this.close} handleInput={this.handleInput} sendPost={this.sendVideoPost} error={this.state.errorMessage} />
            </React.Fragment>


        )
    }
}

export default FeedPage;