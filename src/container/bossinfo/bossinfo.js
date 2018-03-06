import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, List, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile'

import SelectAvatar from '../../component/select-avatar/select-avatar'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends React.Component {
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
        <SelectAvatar selectAvatar={v => this.handleChange('avatar', v)} />
        <WhiteSpace />
        <List>
          <InputItem
            onChange={v => this.handleChange('title', v)}
          >职位名称</InputItem>
          <InputItem
            onChange={v => this.handleChange('company', v)}
          >公司名称</InputItem>
          <InputItem
            onChange={v => this.handleChange('money', v)}
          >薪资范围</InputItem>
          <TextareaItem
            title='岗位要求'
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

export default BossInfo