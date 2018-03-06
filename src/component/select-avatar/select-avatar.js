import React from 'react'
import { Grid, List } from 'antd-mobile'

class SelectAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: ''
    }
  }


  render() {
    const avatarList = ['boy', 'girl', 'man', 'woman', 'chick', 'hippo', 'lemur', 'pig', 'whale', 'zebra', 'bull', 'crab', 'hedgehog', 'koala', 'tiger']
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }))
    const avatar = this.state.avatar
    const gridHeader = avatar
      ? <div>已选择头像：<span><img src={avatar.icon} alt='' style={{ width: 20 }} /></span></div>
      : <div>请选择头像</div>
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={v => {
              this.setState({ 'avatar': v })
              this.props.selectAvatar(v.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default SelectAvatar