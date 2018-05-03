import React, { Component } from 'react';
import { Card, Grid, Button, Image } from 'semantic-ui-react'
import { getData, postData } from '../services/DataService'
import ModalEdit from './ModalEdit'

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.userEdit = {}  // using state as less as possible
        this.state = {
            file: null,
            nameLength: 0,
            modal: {
                open: false,
                size: 'small'
            },
            user: {},
        };

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.handleImageInput = this.handleImageInput.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleInfoInput = this.handleInfoInput.bind(this);
        this.sendEdit = this.sendEdit.bind(this);
        this.validateUrl = this.validateUrl.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);

    }

    show = size => () => this.setState({
        modal: { size, open: true }
    })
    close = () => {
        this.setState({
            modal: { show: false },
            nameLength: 0,
            errorLength: '',
            errorUrl: ''
        })
        this.userEdit = {}
    }


    handleNameInput(e) {
        this.userEdit.name = e.target.value
        this.setState({
            nameLength: this.userEdit.name.length,
            errorLength: '',
        })
    }

    handleImageInput(e) {
        this.userEdit.avatarUrl = e.target.value
        this.setState({ errorUrl: '' })
    }

    handleInfoInput(e) {
        this.userEdit.about = e.target.value
    }

    handleImageUpload(e) {
        this.setState({ file: e.target.files[0] })

    }

    isValidImage(input) {
        return ((input.match(/\.(jpeg|jpg|gif|png)$/) != null) && (input.match(/^(http|https):\/\//) != null));
    }

    validateUrl() {
        if (this.userEdit.avatarUrl) {
            if (!this.isValidImage(this.userEdit.avatarUrl)) {
                this.setState({ errorUrl: 'Not valid image URL' })
                return true
            }
        }
        return false;
    }

    async sendEdit() {
        if (this.validateUrl()) {
            return
        }
        if (this.state.nameLength > 30) {
            this.setState({ errorLength: "Name shouldn't exceed 30 letters!" })
            return
        }
        if (this.state.file) {
            await postData.imageUpload(this.state.file).then((response) => {
                this.userEdit.avatarUrl = response.data;
            })
        }
        const data = this.state.user
        data.email = 'user@unFriendly'
        data.AboutShort = 'bla'
        if (this.userEdit.name) {
            data.name = this.userEdit.name
        }
        if (this.userEdit.about) {
            data.about = this.userEdit.about
        }
        if (this.userEdit.avatarUrl) {
            data.avatarUrl = this.userEdit.avatarUrl
        }
        postData.editUser(data)
        this.close()
    }

    componentDidMount() {
        this.getInfo(this.props)
    }

   
    componentWillReceiveProps(nextProps) {
        this.getInfo(nextProps)
    }

    getInfo(p){
        if (p.match.path === '/profile') {
            getData.getProfile()
                .then(result => {
                    this.setState({ user: result })
                })
        } else {
            getData.getUser(p.match.params.id)
                .then((result) => {
                    this.setState({ user: result })
                })
        }
    }

    render() {

        const extra = (
            <div>
                <a className="float-left">
                    <Button circular content={this.state.user.postsCount} color="teal" id="addButton" label="post(s)" />


                </a>
                <a className="float-right">
                    <Button circular content={this.state.user.commentsCount} color="violet" id="addButton" label="comment(s)" />

                </a>
            </div>
        )

        return (
            <React.Fragment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="4">
                        </Grid.Column>
                        <Grid.Column width="8">
                            <Card centered fluid >
                                <Image style={{ width: 'inherit' }} src={this.state.user.avatarUrl} />
                                <Card.Content>
                                    <Card.Header className="float-left" size="large">{this.state.user.name}</Card.Header>
                                    {(this.props.match.path === '/profile') ?
                                        <Button className="float-right" basic color="grey" size="mini" onClick={this.show('small')}>Edit profile</Button> :
                                        <React.Fragment />}
                                    <Card.Description>{this.state.user.about}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {extra}
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width="4">
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <ModalEdit modal={this.state.modal} nameLength={this.state.nameLength} close={this.close} handleInfoInput={this.handleInfoInput} handleImageInput={this.handleImageInput} handleNameInput={this.handleNameInput} sendEdit={this.sendEdit} errorUrl={this.state.errorUrl} errorLength={this.state.errorLength} validateUrl={this.validateUrl} imageUpload={this.handleImageUpload} onFormSubmit={this.onFormSubmit} />
            </React.Fragment>
        );
    }
}

export default ProfilePage;