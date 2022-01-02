import React, { useState, useCallback } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect, useDispatch } from 'react-redux'
import { addEvent } from '../actions/eventActions'
import { clearErrors } from '../actions/errorActions'
import { NewEventI, NewEventReduxPropsI } from '../types/interfaces'

const NewEventModal = ({ clearErrors, auth }: NewEventI) => {
  const [title, setTitle] = useState<string>()
  const [date, setDate] = useState<any>()
  const [modal, setModal] = useState<boolean>()

  const dispatch = useDispatch()

  const toggle = useCallback(() => {
    clearErrors()
    setModal(!modal)
  }, [clearErrors, modal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsedDate = Date.parse(date)

    const author = auth.user.id

    const dateString = new Date(parsedDate + 86400000).toLocaleDateString()

    const newEvent = {
      title,
      date: dateString,
      author,
    }

    dispatch(addEvent(newEvent))
    toggle()
  }

  return (
    <div>
      <Button color="primary" className="add-event-btn" onClick={toggle}>
        Add Event
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Event</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="event-title" className="mb-3" onChange={e => setTitle(e.target.value)} />

              <Label for="date">Date</Label>
              <Input type="date" name="date" id="event-title" className="mb-3" onChange={e => setDate(e.target.value)} />

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: NewEventReduxPropsI) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { clearErrors })(NewEventModal)
