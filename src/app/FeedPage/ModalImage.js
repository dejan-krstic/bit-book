import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const ModalImage = (props) => {
    return (
        <Modal style={{ marginTop: 400, marginRight: "auto", marginBottom: "auto", marginLeft: "auto" }} size={"small"} open={props.open} onClose={props.onClose}>
            <Modal.Header>
                {`New image post`}
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Image URL</label>
                        <input id='textInput' type='url' onBlur={props.handleInput} placeholder='Start typing here...' />
                        <small>{props.error}</small>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="teal" type="submit" onClick={props.sendPost} >Post</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalImage