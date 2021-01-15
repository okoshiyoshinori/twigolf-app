import { Uid,LoginType } from '../commonTypes'
import { AxiosResponse } from 'axios'

export type UserInfo = {
  uid: Uid,
  screen_name:string,
  email:string,
  sns_id: string,
  password:string,
  avatar:string,
  description:string,
  login_type: LoginType,
}

export const API_USER_SUCCESS = "API_USER_SUCCESS"

export type ApiUserSuccess = {
  type: typeof API_USER_SUCCESS,
  payload: UserInfo
}

export type UserAction = ApiUserSuccess
