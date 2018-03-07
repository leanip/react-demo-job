import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, List, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile'

import AvatarSelecter from '../../component/avatar-selecter/avatar-selecter'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      title: '',
      company: '',
      money: '',
      desc: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleUpdate() {
    this.props.update(this.state)
  }

  render() {
    const redirectTo = this.props.redirectTo
    return (
      <div>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <NavBar>Boss完善信息页</NavBar>
        <AvatarSelecter selectAvatar={v => this.handleChange('avatar', v)} />
        <WhiteSpace />
        <List>
          <InputItem
            onChange={v => this.handleChange('title', v)}
          >求职岗位</InputItem>
          <TextareaItem
            title='个人简介'
            rows={3}
            onChange={v => this.handleChange('desc', v)}
            autoHeight />
        </List>
        <WhiteSpace />
        <Button type='primary' onClick={this.handleUpdate}>提交</Button>
      </div>
    )
  }
}

export default GeniusInfo