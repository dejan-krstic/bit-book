import React from 'react';
import { Card, Image, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const FeedImage = (props) => {
    console.log(props.topMargin);
    return (
        <Card >
                <Modal style={{ marginTop: `${props.topMargin}`, marginRight: "auto", marginBottom: "auto", marginLeft: "auto" }} trigger={<Image style={{ width: "inherit" }} src={props.post.imageUrl} />}>
                        <Image size='large' style={{margin:"auto", width:'100%'}} src={props.post.imageUrl} onLoad={props.onLoad}/>
                </Modal>
            <Card.Content extra as={Link} to={`/image/${props.post.id}`}>
                <p className='float-left'><i aria-hidden="true" className="image icon"></i>{props.post.userDisplayName}</p>
                <p className='float-right'><i aria-hidden="true" className="comment icon"></i>{props.post.commentsNum} comments</p>
            </Card.Content>
        </Card>
    )

}


export default FeedImage;


// react-modal-image

// const FeedImage = (props) => {

//     return (
//         <Card>
//             <Image as={Link} to={`/image/${props.post.id}`} style={{ width: "inherit" }} src={props.post.imageUrl} />
//             <Card.Content extra>
//                 {/* <Modal style={{ marginTop: '100px', marginRight: "auto", marginBottom: "auto", marginLeft: "auto" }} trigger={<a className='float-left'><i aria-hidden="true" className="image icon"></i>Image post</a>}>
//                     <Image size='large' style={{ margin: "auto", width: '100%' }} src={props.post.imageUrl} onLoad={props.onLoad} />
//                 </Modal> */}

//                 <ModalImage trigger={<a className='float-left'><i aria-hidden="true" className="image icon"></i>Image post</a>}
                   
//                     large={props.post.imageUrl}
//                     alt="Hello World!"
//                 />

//                 <a className='float-right'><i aria-hidden="true" className="comment icon"></i>{props.post.commentsNum} comments</a>
//             </Card.Content>
//         </Card>
//     )

// }


// export default FeedImage;