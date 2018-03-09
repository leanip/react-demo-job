import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
          <div key={v.user}>
            <WhiteSpace />
            <Card>
              <Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={v.title}
              />
              <Body>
                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                <WhiteSpace />
                {v.desc.split('\n').map(d => <WingBlank key={d}>{d}</WingBlank>)}
                <WhiteSpace />
                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
              </Body>
            </Card>
          </div>
        ))}
      </WingBlank>
    )
  }
}

export default UserCard