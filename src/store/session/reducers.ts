import * as types from './types'
import {User} from '../app/types'

const initstate:types.Session = {
  login:false,
  auth: {} as User
}

const Reducer = (state:types.Session = initstate,actions:types.SessionAction):types.Session => {
  switch(actions.type) {
    case types.SET_SESSION_LOGIN: 
      return {
        ...state,login:actions.payload
      }
    case types.SET_SESSION_AUTH:
      return {
        ...state,auth:actions.payload
      }
    default:
      return state
  }
}
export default Reducer
