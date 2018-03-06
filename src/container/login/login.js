import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile'

import Logo from '../../component/logo/logo'
import { login } from '../../redux/user.redux'

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleLogin() {
    this.props.login(this.state)
  }

  handleRegister() {
    this.props.history.push('/register')
  }

  render() {
    const redirectTo = this.props.redirectTo
    return (
      <WingBlank>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Logo />
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.handleChange('user', v)}
          >用户名</InputItem>
          <InputItem type='password'
            onChange={v => this.handleChange('pwd', v)}
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