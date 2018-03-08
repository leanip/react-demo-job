import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import NavLinkBar from '../navlinkbar/navlinkbar'
import Boss from '../boss/boss'
import Genius from '../genius/genius'

const Msg = () => <h2>消息列表</h2>
const User = () => <h2>个人中心</h2>

@connect(
  state => state
)
class Dashboard extends React.Component {
  render() {
    const { user } = this.props
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      }, {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fix-header'>{navList.find(v => (v.path === pathname)).title}</NavBar>
        <div className='page-content'>
          {navList.map(v => (
            <Route path={v.path} component={v.component} key={v.path} />
          ))}
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}

export default Dashboard