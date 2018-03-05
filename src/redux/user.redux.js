import axios from 'axios'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  msg: ''
}

export const user = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, msg: action.msg}
    default:
      return state
  }
}

const errorMsg = msg => ({msg, type: ERROR_MSG})

const authSuccess = data => ({type: AUTH_SUCCESS, payload: data})

export const register = ({user, pwd, pwd2, type}) => {
  if(!user || !pwd){
    return errorMsg('用户名和密码不能为空')
  }
  if(pwd !== pwd2){
    return errorMsg('密码和确认密码不一致')
  }

  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if(res.status===200 && res.data.code===0){
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}