import React, { useState, useEffect, useCallback } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import { connect, useDispatch } from 'react-redux'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import { ModalI, AuthReduxPropsI } from '../types/interfaces'

const LoginModal = ({ error, isAuthenticated, clearErrors }: ModalI) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState<boolean>()
  const [name, setName] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [msg, setMsg] = useState<string | null>()

  const toggle = useCallback(() => {
    clearErrors()
    setModal(!modal)
  }, [clearErrors, modal])

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg)
    } else {
      setMsg(null)
    }

    if (modal) {
      if (isAuthenticated) {
        toggle()
      }
    }
  }, [error, isAuthenticated, modal, toggle])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const user = {
      name,
      password,
    }

    dispatch(login(user))
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="mb-3"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="mb-3"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Log In
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: AuthReduxPropsI) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
