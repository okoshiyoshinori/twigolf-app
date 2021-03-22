import {User} from '../app/types'

export const SET_SESSION_LOGIN = "SET_SESSION_LOGIN"
export const SET_SESSION_AUTH = "SET_SESSION_AUTH"
export const DELETE_SESSION = "DELETE_SESSION"

export interface Session {
  login:boolean
  auth: User
}

export interface SetSessionLogin {
  type: typeof SET_SESSION_LOGIN,
  payload: boolean 
}

export interface SetSessionAuth {
  type: typeof SET_SESSION_AUTH,
  payload: User 
}

export interface DelSession {
  type: typeof DELETE_SESSION
}

export type SessionAction = SetSessionLogin | SetSessionAuth | DelSession


