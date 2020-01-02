import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  if (props.notification === '') {
    return null
  }
  return <Message success>{props.notification}</Message>
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

