import React from 'react'
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile'

import Logo from '../../component/logo/logo'

class Login extends React.Component{
  render(){
    return (
      <WingBlank>
        <Logo/>
        <List>
          <InputItem>用户名</InputItem>
          <InputItem type='password'>密码</InputItem>
        </List>
        <WhiteSpace size='lg'/>
        <Button type='primary'>登录</Button>
        <WhiteSpace/>
        <Button type='primary'>注册</Button>
      </WingBlank>
    )
  }
}

export default Login