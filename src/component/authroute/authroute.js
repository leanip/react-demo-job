import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
  state => state,
  { loadData }
)
class AuthRoute extends React.Component {

  componentDidMount() {
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          console.log('auth ok')
          loadData(res.data.data)
        } else {
          console.log('auth failed')
          this.props.history.push('/login')
        }
      })
  }

  render() {
    return null
  }
}

export default AuthRoute