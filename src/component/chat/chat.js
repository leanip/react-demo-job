import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, NavBar } from 'antd-mobile'

import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }

  render() {
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div id='chat-page'>
        <NavBar>{user}</NavBar>
        <List>
          {this.props.chat.chatmsg.map(v => {
            return v.from === user ?
                <Item key={v._id}>{v.content}</Item>
              :
                <Item
                  key={v._id}
                  className='chat-me'
                  extra={'avatar'}
                >{v.content}</Item>
          })}
        </List>
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入...'
              value={this.state.text}
              onChange={v => {
                this.setState({ 'text': v })
              }}
              extra={<span onClick={this.handleSubmit}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat