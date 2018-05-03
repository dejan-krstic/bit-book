import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const ModalVideo = (props) => {
    return (
        <Modal style={{ marginTop: 400, marginRight: "auto", marginBottom: "auto", marginLeft: "auto" }} size={"small"} open={props.open} onClose={props.onClose}>
            <Modal.Header>
                {`New video post`}
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Video URL</label>
                        <input id='textInput' type='url' onBlur={props.handleInput} placeholder='Start typing here...' />
                        <small>{props.error}</small>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="teal" onClick={props.sendPost} >Post</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalVideo