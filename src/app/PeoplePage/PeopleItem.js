import React from 'react';
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PeopleItem = (props) => {
    console.log(props);
    return (
        <Item /* className='thingy' */ as={Link} to={`/people/${props.user.id}`}>
            <Item.Image size='tiny' src={props.user.avatarUrl} />

            <Item.Content verticalAlign='middle'>
                <Item.Header>{props.user.name}</Item.Header>
                <Item.Description>{props.user.aboutShort}</Item.Description>
                <Item.Meta>{`Last post: ${props.user.lastPostDate}`}</Item.Meta>
            </Item.Content>
        </Item>
    )    
}

export default PeopleItem;