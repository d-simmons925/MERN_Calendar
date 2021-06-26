import {useState} from 'react'
import {deleteEvent} from '../actions/eventActions'
import {useDispatch, connect} from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

const Day = ({day, isAuthenticated}) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState()

  const toggle = ()=>{
    if(isAuthenticated){
      setModal(!modal)
    }
  }

  const onDelete = (id) =>{
    dispatch(deleteEvent(id))
  }

  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`
  return (
    <div>
      <div onClick={toggle} className={className}>
        {day.value === 'padding' ? '' : day.value}
        {day.events.length === 1 ? <div className="event">1 Event</div> : day.events.length ? <div className="event">{day.events.length} Events</div> : ''}
      </div>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Events for {day.date}</ModalHeader>
        <ModalBody>
          <ListGroup>
            {day.events.map(({_id, title})=>(
              <ListGroupItem key={_id}>
                {title}<Button color="danger" id="delete-btn" onClick={() => onDelete(_id)}>remove</Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Day)
