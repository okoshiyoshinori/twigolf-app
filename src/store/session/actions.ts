import * as types from './types'
import {User} from '../app/types'

export const SetSessionLogin = (data:boolean):types.SessionAction => {
  return {
    type: types.SET_SESSION_LOGIN,
    payload:data
  }
}

export const SetSessionAuth = (data:User):types.SessionAction => {
  return {
    type: types.SET_SESSION_AUTH,
    payload:data
  }
}

export const DelSession =():types.SessionAction => {
  return {
    type:types.DELETE_SESSION
  }
}
