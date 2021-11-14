import { useState, Fragment } from 'react'
import { deleteEvent, updateEvent } from '../actions/eventActions'
import { useDispatch, connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem, Label, Input } from 'reactstrap'
import { DayI, AuthReduxPropsI } from '../types/interfaces'

const Day = ({ day, isAuthenticated }: DayI) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState<boolean>()
  const [edit, setEdit] = useState<boolean>()
  const [newTitle, setNewTitle] = useState<string>()

  const toggle = () => {
    if (isAuthenticated) {
      setModal(!modal)
      setEdit(false)
    }
  }

  const editToggle = () => {
    if (isAuthenticated) {
      setEdit(!edit)
    }
  }

  const onDelete = (id: string) => {
    dispatch(deleteEvent(id))
  }

  const onSave = (id: string) => {
    const updatedEvent = {
      id: id,
      title: newTitle,
    }

    dispatch(updateEvent(updatedEvent))
    setEdit(!edit)
  }

  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`

  const viewUI = (
    <Fragment>
      <ListGroup>
        {day.events.map(({ _id, title }) => (
          <ListGroupItem key={_id}>
            <div className="event-title">{title}</div>
            <Button color="secondary" id="edit-btn" onClick={editToggle}>
              Edit
            </Button>
            <Button color="danger" id="delete-btn" onClick={() => onDelete(_id)}>
              remove
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Fragment>
  )

  const editUI = (
    <Fragment>
      <ListGroup>
        {day.events.map(({ _id, title }) => (
          <ListGroupItem key={_id}>
            <Label id="edit-label" for="title">
              Title
            </Label>
            <Input type="text" name="title" id="title" placeholder={title} onChange={e => setNewTitle(e.target.value)} />
            <Button color="primary" id="save-btn" onClick={() => onSave(_id)}>
              Save
            </Button>
            <Button id="cancel-btn" onClick={editToggle}>
              Cancel
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Fragment>
  )
  return (
    <div>
      <div onClick={toggle} className={className}>
        {day.value === 'padding' ? '' : day.value}
        {day.events.length === 1 ? <div className="event">1 Event</div> : day.events.length ? <div className="event">{day.events.length} Events</div> : ''}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Events for {day.date}</ModalHeader>
        <ModalBody>{!edit ? viewUI : editUI}</ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: AuthReduxPropsI) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(Day)
