import React from 'react';
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const FeedText = (props) => {

    return (
        <Card as={Link} to={`/text/${props.post.id}`}>
            <Card.Description><p className='text-post-body'>{props.post.text}</p></Card.Description>
            <Card.Content extra>
                <p className='float-left'><i aria-hidden="true" className="file alternate outline icon"></i>{props.post.userDisplayName}</p>
                <p className='float-right'><i aria-hidden="true" className="comment icon"></i>{props.post.commentsNum} comments</p>
            </Card.Content>
        </Card>
    )

}


export default FeedText;