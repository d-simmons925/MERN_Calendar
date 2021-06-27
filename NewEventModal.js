import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { connect, useDispatch } from 'react-redux'
import {addEvent} from '../actions/eventActions'
import {clearErrors} from '../actions/errorActions'

const NewEventModal = ({clearErrors, auth}) => {
  const [title, setTitle] = useState()
  const [date, setDate] = useState()
  const [modal, setModal] = useState()

  const dispatch = useDispatch()

  const toggle = useCallback(()=>{
    clearErrors()
    setModal(!modal)
  },[clearErrors, modal])

  const handleSubmit = e =>{
    e.preventDefault()
    
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const author = auth.user.id

    const dateString = `${month + 1}/${day + 1}/${year}`

    const newEvent = {
      title,
      date: dateString,
      author
    }

    dispatch(addEvent(newEvent))
    toggle()
  }

  return (
    <div>
      <Button color="primary" className="add-event-btn" onClick={toggle}>
        Add Event
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>New Event</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="event-title"
                className="mb-3"
                onChange={e => setTitle(e.target.value)}
              />

              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="event-title"
                className="mb-3"
                onChange={e => setDate(e.target.value)}
              />

              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >
                Add
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

NewEventModal.propTypes = {
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps, {clearErrors})(NewEventModal)