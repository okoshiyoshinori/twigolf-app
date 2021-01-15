import { Uid } from '../commonTypes'
import { AxiosResponse, AxiosError} from 'axios'

export interface Pref {
  pid: number,
  name: string,
  address: string
}

export interface Session {
  uid: Uid, 
}

export interface Processing {
  done: boolean
}

export interface AppResult {
  status: number,
  cause: string
} 

export const GET_PREF = "GET_PREF"
export const GET_SESSION = "GET_SESSION"
export const API_SUCCESS = "API_SUCCESS"
export const API_ERROR = "API_ERROR"
export const SET_PROCESSING = "SET_PROCESSING"
export const SET_APPRESULT = "SET_APPREUSLT"

export interface GetPref {
  type: typeof GET_PREF,
  payload: Pref
}

export interface GetSession {
  type: typeof GET_SESSION,
  payload: Session
}

export interface SetProcessing {
  type: typeof SET_PROCESSING,
  payload: Processing 
}

export interface SetAppResult {
  type: typeof SET_APPRESULT,
  payload: AppResult 
} 

export type SystemAction = GetSession | GetPref | SetProcessing | SetAppResult
