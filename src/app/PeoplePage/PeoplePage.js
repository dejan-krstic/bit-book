import React, { Component } from 'react';
import { Input, Grid } from 'semantic-ui-react'
import { getData } from '../services/DataService';
import PeopleList from './PeopleList';
import { Pagination } from 'semantic-ui-react'



class PeoplePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            data: [],
            search: {
                value: '',
                result: []
            }
        };
        this.paginationPeople=this.paginationPeople.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handlePaginationChange=this.handlePaginationChange.bind(this)
    }

    filter = (e) => {
        const etv = e.target.value.toLowerCase();
        this.setState(prevState => ({
            search: {
                result: prevState.data.filter(user => user.name.toLowerCase().match(etv) !== null)
        }}));
    }

    searchUsers() {
        return <Input fluid
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Search people...'
            onChange={this.filter}
        />
    }


    componentDidMount() {
        getData.getUsers().then(response => {
            this.setState({
                data: response,
                search: {
                    result: response
                }
            })
        })
    }
    handleInputChange = (e, { value }) => this.setState({ activePage: value })

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    paginationPeople () {
        return  <Pagination activePage={this.state.activePage} totalPages={Math.ceil(this.state.search.result.length/6)} onPageChange={this.handlePaginationChange} />
    }
      

    render() {
        return (
            <React.Fragment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="four">
                    </Grid.Column>
                    <Grid.Column width="eight">
                        {this.searchUsers()}
                        < PeopleList  data={this.state.search.result.slice((this.state.activePage-1)*6, 6*this.state.activePage)}  />
                    </Grid.Column>
                    <Grid.Column width="four">
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {this.paginationPeople()}
            </React.Fragment>
        );
    }
}

export default PeoplePage;