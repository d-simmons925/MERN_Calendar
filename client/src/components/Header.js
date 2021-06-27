import {Navbar, Nav, NavItem, NavbarBrand} from 'reactstrap'

const Header = (openModal) => {
  return (
    <div>
      <Navbar color="dark">
        <NavbarBrand>Calendar</NavbarBrand>
        <Nav float-right="true">
          <NavItem>
            <button
              onClick={openModal}
            >Log In</button>
          </NavItem>
          <NavItem>
            <button
              onClick={openModal}
            >Sign Up</button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Header
