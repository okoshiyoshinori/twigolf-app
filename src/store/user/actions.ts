import * as tuser from './types'
import { Uid } from '../commonTypes'
import {API_USER} from '../../api'
import api from '../../api'
import {Dispatch} from 'redux'
import { SetAppResult,SetProcessing } from '../system/actions'

export const ApiUserSuccess = (user:tuser.UserInfo):tuser.UserAction => {
  return {
    type: tuser.API_USER_SUCCESS,
    payload: user
  }
}

export const GetUser = (uid: Uid) => { 
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.get(API_USER,{ params:{ id: uid }})
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      return dispatch(ApiUserSuccess(res.data))
    } else {
      return dispatch(SetAppResult({status:res.status,cause:res.statusText }))
    }
  } 
}

export const RegistUser = (user:tuser.UserInfo) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.post(API_USER,user)
    dispatch(SetProcessing({done:false}))
    if ( res.status == 200 ) {
      dispatch(ApiUserSuccess(res.data))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

export const UpdateUser = (user:tuser.UserInfo) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.put(API_USER,user)
    dispatch(SetProcessing({done:false}))
    if ( res.status == 200 ) {
       dispatch(ApiUserSuccess(res.data))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

export const DeleteUser = (uid:Uid) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.delete(API_USER,{data:uid})
    dispatch(SetProcessing({done:false}))
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

