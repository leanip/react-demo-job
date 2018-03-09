import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile'

import Logo from '../../component/logo/logo'
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  { login }
)
@imoocForm
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleLogin() {
    this.props.login(this.props.state)
  }

  handleRegister() {
    this.props.history.push('/register')
  }

  render() {
    const redirectTo = this.props.redirectTo
    return (
      <WingBlank>
        {redirectTo && redirectTo !== '/login' ? <Redirect to={redirectTo} /> : null}
        <Logo />
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.props.handleChange('user', v)}
          >用户名</InputItem>
          <InputItem type='password'
            onChange={v => this.props.handleChange('pwd', v)}
          >密码</InputItem>
        </List>
        <WhiteSpace size='lg' />
        <Button type='primary' onClick={this.handleLogin}>登录</Button>
        <WhiteSpace />
        <Button type='primary' onClick={this.handleRegister}>注册</Button>
      </WingBlank>
    )
  }
}

export default Login