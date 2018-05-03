import React, { Component } from 'react';
import { Grid, Form, Button, Tab } from 'semantic-ui-react';
import { postData } from '../services/DataService'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            error: {
                login: '',
                register: ''
            }
        }
    }

    onRegister = () => {
        postData.userRegister(this.state.userName, this.state.password)
            .then(result => {
                if (result.status === 200) {
                    this.setState({error: {
                        register: ''
                    }})
                } else {
                    this.setState({ error: {
                        register: result
                    }});
                }
            })
    }

    onLogin = () => {
        postData.userLogin(this.state.userName, this.state.password)
            .then(result => {
                if (result.status === 200) {
                    this.setState({error: {
                        login: ''
                    }})
                    this.props.onLogin();
                } else {
                    this.setState({ error: {
                        login: result
                    } });
                }
            })
    }

    getUser = (e) => {
        this.setState({

            userName: e.target.value,

        })
    }

    getPass = (e) => {
        this.setState({

            password: e.target.value,

        })
    }

    loginRender() {
        return (
            <Form>
                <Form.Field>
                    <label>UserName</label>
                    <input placeholder='UserName' onChange={this.getUser} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type='password' onChange={this.getPass} />
                    <small style={{ color: 'red' }}>{this.state.error.login}</small>
                </Form.Field>
                <Button type='submit' onClick={this.onLogin}>Login</Button>
            </Form>
        )
    }

    registerRender() {
        return (
            <Form>
                <Form.Field>
                    <label>UserName</label>
                    <input placeholder='UserName' onChange={this.getUser} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type='password' onChange={this.getPass} />
                    <small style={{ color: 'red' }}>{this.state.error.register}</small>
                </Form.Field>
                <Button type='submit' onClick={this.onRegister}>Register</Button>
            </Form>
        )
    }

    clearState = () => {
        this.setState({
            userName: '',
            password: '',
            error: {
                login: '',
                register: ''
            }
        })
    }

    render() {
        const panes = [
            { menuItem: 'Login', render: () => <Tab.Pane>{this.loginRender()}</Tab.Pane> },
            { menuItem: 'Register', render: () => <Tab.Pane>{this.registerRender()}</Tab.Pane> }
        ]
        return (
            <Grid id='login-page'>
                <Grid.Row style={{marginTop: '50px'}}>
                    <Grid.Column width='one'>
                    </Grid.Column>
                    <Grid.Column width='six'>
                        <h2>Bitbook Social Network</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At totam quod eligendi atque quos iusto dolorum accusamus cumque aperiam. Dignissimos recusandae id assumenda sequi quo totam excepturi eveniet dolor, est beatae tempore molestias ex, ipsa quibusdam autem sed ullam animi praesentium aperiam corporis enim. Voluptatibus nostrum, praesentium perspiciatis fugiat cupiditate earum magni ducimus, nobis, quisquam dolorum nesciunt aliquam quae non vitae? Libero necessitatibus alias quisquam ab ea, doloremque fugit nesciunt repellendus at modi voluptas totam deserunt amet porro maiores perspiciatis, quasi facere impedit! Impedit, eaque inventore? Illo, voluptatem ullam consequuntur aliquid reiciendis perspiciatis blanditiis temporibus soluta quo!</p>
                    </Grid.Column>
                    <Grid.Column width='two'>
                    </Grid.Column>
                    <Grid.Column width='six'>
                        <Tab panes={panes} defaultActiveIndex={0} onClick={this.clearState}/>

                    </Grid.Column>
                    <Grid.Column width='one'>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default LoginPage;