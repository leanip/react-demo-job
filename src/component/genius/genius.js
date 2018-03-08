import React from 'react'
import { connect } from 'react-redux'

import { getUserlist } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserlist }
)
class Genius extends React.Component{

  componentDidMount(){
    this.props.getUserlist('boss')
  }

  render(){
    return (
      <div>Genius page</div>
    )
  }
}

export default Genius