import {Fragment} from 'react'
import {NavLink} from 'reactstrap'
import {connect} from 'react-redux'
import {logout} from '../actions/authActions'
import PropTypes from 'prop-types'

const Logout = ({logout}) => {
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

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, {logout})(Logout)
