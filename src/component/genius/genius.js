import React from 'react'
import { connect } from 'react-redux'

import { getUserlist } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state => state.chatuser,
  { getUserlist }
)
class Genius extends React.Component {

  componentDidMount() {
    this.props.getUserlist('boss')
  }

  render() {
    return (
      <UserCard userlist={this.props.userlist} />
    )
  }
}

export default Genius