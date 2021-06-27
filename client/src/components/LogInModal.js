import {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import {connect, useDispatch} from 'react-redux'
import {login} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'

const LoginModal = ({error, isAuthenticated, clearErrors}) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [msg, setMsg] = useState()

  const toggle = useCallback(()=>{
    clearErrors()
    setModal(!modal)
  },[clearErrors, modal])

  useEffect(()=>{
    if(error.id === 'LOGIN_FAIL'){
      setMsg(error.msg.msg)
    } else {
      setMsg(null)
    }

    if(modal){
      if(isAuthenticated){
        toggle()
      }
    }
  }, [error, isAuthenticated, modal, toggle])

  const handleSubmit = e =>{
    e.preventDefault()

    const user = {
      name,
      password
    }
    
    dispatch(login(user))
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
           {msg ? (
          <Alert color="danger">{msg}</Alert>
        ): null}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="name"
                className="mb-3"
                onChange={(e)=> setName(e.target.value)}
              />

              <Label for="password">Password</Label>
              <Input 
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="mb-3"
                onChange={(e)=> setPassword(e.target.value)}
              />

              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >
                Log In
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, {login, clearErrors})(LoginModal)