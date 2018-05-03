import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const ModalEdit = (props) => {
    const { open, size } = props.modal
    return (
        <Modal style={{ marginTop: 100, marginRight: "auto", marginBottom: "auto", marginLeft: "auto" }} size={size} open={open} onClose={props.close}>
            <Modal.Header>
                <p>Edit profile</p>
                <small>Form-fields left empty will not be edited</small>
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Edit name:</label>
                        <input id='textInput' type='text' onChange={props.handleNameInput} placeholder='Your name...' maxLength="31" />
                        {(props.nameLength === 31) ? <small style={{ color: 'red' }} >{`31/30    ${props.errorLength}`}</small> : <small>{`${props.nameLength}/30`}</small>}
                    </Form.Field>
                    <Form.Field>
                        <label>Edit your info:</label>
                        <input id='textInput' type='text' onChange={props.handleInfoInput} placeholder="Your info..." />
                    </Form.Field>
                    <Form.Field>
                        <label>Enter image:</label>
                        <input id='textInput' type='text' onChange={props.handleImageInput} onBlur={props.setErrorUrl} placeholder='Image URL...' />
                        <small style={{ color: 'red' }}>{props.errorUrl}</small>
                    </Form.Field>
                    <Form.Field>
                        <label>Upload image:</label>
                        <input type="file" onChange={props.imageUpload} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={props.close}>
                    Close
            </Button>
                <Button color="teal" onClick={props.sendEdit} >Edit</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalEdit