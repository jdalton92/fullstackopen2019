import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }
  return <div>{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

