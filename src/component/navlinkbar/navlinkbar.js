import React from 'react'
import { TabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
  state => state.chat
)
class NavLinkBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      icon: ''
    }
  }


  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            badge={v.path === '/msg' ? this.props.unread : 0}
            key={v.icon}
            title={v.text}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          />
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar