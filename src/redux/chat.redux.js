import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0
}

export const chat = (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload
      }
    case MSG_RECV:
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread: state.unread + 1
      }
    case MSG_READ:
    default:
      return state
  }
}

const msgList = data => {
  return { type: MSG_LIST, payload: data }
}

const msgRecv = data => {
  return { type: MSG_RECV, payload: data }
}

export const getMsgList = () => {
  return dispatch => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.data))
      }
    })
  }
}

export const sendMsg = data => {
  return dispatch => {
    socket.emit('sendmsg', data)
  }
}

export const recvMsg = () => {
  return dispatch => {
    socket.on('recvmsg', data => {
      console.log('recvmsg:',data)
      dispatch(msgRecv(data))
    })
  }
}