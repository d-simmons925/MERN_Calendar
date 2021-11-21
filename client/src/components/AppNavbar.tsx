import { Fragment } from 'react'
import { Navbar, Nav, NavItem, NavbarBrand, Container } from 'reactstrap'
import { connect } from 'react-redux'
import RegisterModal from './RegisterModal'
import LoginModal from './LogInModal'
import Logout from './Logout'
import { AppNavbarI, AuthReduxPropsI } from '../types/interfaces'

const AppNavbar = ({ auth }: AppNavbarI) => {
  const authLinks = (
    <Fragment>
      <NavbarBrand>{auth && auth.user ? `Logged in as ${auth.user.name}` : ''}</NavbarBrand>
      <Nav className="ml-auto">
        <NavItem>
          <Logout />
        </NavItem>
      </Nav>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <NavbarBrand></NavbarBrand>
      <Nav>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Nav>
    </Fragment>
  )

  return (
    <div>
      <Navbar color="dark">
        <Container>{auth && auth.isAuthenticated ? authLinks : guestLinks}</Container>
      </Navbar>
    </div>
  )
}

const mapStateToProps = (state: AuthReduxPropsI) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(AppNavbar)
