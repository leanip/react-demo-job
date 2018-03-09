import React from 'react'
import { connect } from 'react-redux'
import { Result, List } from 'antd-mobile'

@connect(
  state => state.user
)
class User extends React.Component {

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
          </div>
          : null}
      </div>
    )
  }
}

export default User