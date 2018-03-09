import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { WingBlank, WhiteSpace, List, InputItem, Button, Radio } from 'antd-mobile'

import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  { register }
)
@imoocForm
class Register extends React.Component {

  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount(){
    this.props.handleChange('type', 'genius')
  }

  handleRegister() {
    this.props.register(this.props.state)
  }

  render() {
    const redirectTo = this.props.redirectTo
    const RadioItem = Radio.RadioItem
    return (
      <WingBlank>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Logo />
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.props.handleChange('user', v)}
          >用户名</InputItem>
          <InputItem type='password'
            onChange={v => this.props.handleChange('pwd', v)}
          >密码</InputItem>
          <InputItem type='password'
            onChange={v => this.props.handleChange('pwd2', v)}
          >确认密码</InputItem>
        </List>
        <WhiteSpace />
        <List>
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onChange={v => this.props.handleChange('type', 'genius')}
          >牛人</RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onChange={v => this.props.handleChange('type', 'boss')}
          >Boss</RadioItem>
        </List>
        <WhiteSpace size='lg' />
        <Button type='primary' onClick={this.handleRegister}>注册</Button>
      </WingBlank>
    )
  }
}

export default Register