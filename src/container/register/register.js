import React from 'react'
import { connect } from 'react-redux'
import { WingBlank, WhiteSpace, List, InputItem, Button, Radio } from 'antd-mobile'

import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: '',
      pwd2: '',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val){
    this.setState({
      [key]: val
    })
  }

  handleRegister(){
    this.props.register(this.state)
  }

  render(){
    const RadioItem = Radio.RadioItem
    return (
      <WingBlank>
        <Logo/>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.handleChange('user', v)}
          >用户名</InputItem>
          <InputItem type='password'
            onChange={v => this.handleChange('pwd', v)}
          >密码</InputItem>
          <InputItem type='password'
            onChange={v => this.handleChange('pwd2', v)}
          >确认密码</InputItem>
        </List>
        <WhiteSpace/>
        <List>
          <RadioItem
            checked={this.state.type === 'genius'}
            onChange={v => this.handleChange('type', 'genius')}
          >牛人</RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={v => this.handleChange('type', 'boss')}
          >Boss</RadioItem>
        </List>
        <WhiteSpace size='lg'/>
        <Button type='primary' onClick={this.handleRegister}>注册</Button>
      </WingBlank>
    )
  }
}

export default Register