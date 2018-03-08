import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
  userlist: []
}

export const chatuser = (state = initState, action) => {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userlist: action.payload }
    default:
      return state
  }
}

const userlist = data => {
  console.log(data)
  return { type: USER_LIST, payload: data}
}

export const getUserlist = type => {
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res => {
      if(res.status === 200 && res.data.code === 0){
        dispatch(userlist(res.data.data))
      }
    })
  }
}