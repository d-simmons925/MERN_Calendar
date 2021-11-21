import { Fragment } from 'react'
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { LogoutPropsI } from '../types/interfaces'

export const Logout = ({ logout }: LogoutPropsI) => {
  return (
    <Fragment>
      <div>
        <NavLink onClick={logout} href="#">
          Logout
        </NavLink>
      </div>
    </Fragment>
  )
}

export default connect(null, { logout })(Logout)
