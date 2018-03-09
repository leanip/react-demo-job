import React from 'react'
import { connect } from 'react-redux'
import cookies from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'

import { logoutSubmit } from '../../redux/user.redux'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  

  logout(){
    console.log('logout')
    Modal.alert('注销', '确定要退出吗？', [
      { text: '取消', onPress: () => console.log('cancel')},
      { text: '确定', onPress: () => {
        cookies.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }

  render() {
    const { props } = this
    const Item = List.Item
    const Brief = Item.Brief

    return (
      <div>
        {props.user ?
          <div>
            <Result
              img={<img src={require(`../img/${props.avatar}.png`)} style={{ width: 50 }} alt='' />}
              title={props.user}
              message={props.type === 'boss' ? props.company : null}
            />
            <List renderHeader='简介'>
              <Item>
                {props.title}
                {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                {props.money ? <Brief>薪资：{props.money}</Brief> : null}
              </Item>
            </List>
            <WhiteSpace size='lg'/>
            <List>
              <Item onClick={this.logout}>退出登录</Item>
            </List>
          </div>
          : <Redirect to={props.redirectTo} />}
      </div>
    )
  }
}

export default User