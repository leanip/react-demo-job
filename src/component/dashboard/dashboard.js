import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import NavBarLink from '../navbarlink/navbarlink'

const Genius = () => <h2>牛人列表</h2>
const Boss = () => <h2>Boss列表</h2>
const Msg = () => <h2>消息列表</h2>
const User = () => <h2>个人中心</h2>

@connect(
  state => state,
  null
)
class Dashboard extends React.Component{

  render(){
    console.log(this.props)
    const { user } = this.props
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Genius,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss列表',
        component: Boss,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '消息',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fix-header'>{navList.find(v => (pathname === v.path)).title}</NavBar>
        <div className='page-content'>
          {navList.map(v => (
            <Route path={v.path} component={v.component} key={v.path} />
          ))}
        </div>
        <NavBarLink data={navList}/>
      </div>
    )
  }
}

export default Dashboard