import React from 'react'
import {connect} from 'react-redux'
import NewEventModal from './NewEventModal'

const CalendarHeader = ({onNext, onBack, dateDisplay, isAuthenticated}) => {
  return (
    <div id="calendarHeader">
      <h2 id="monthDisplay">{dateDisplay}</h2>
      {isAuthenticated ? <NewEventModal/> : ''}
      <div>
        <button onClick={onNext} id="nextButton"><i className="fas fa-arrow-circle-right"></i></button>
        <button onClick={onBack} id="backButton"><i className="fas fa-arrow-circle-left"></i></button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(CalendarHeader)
