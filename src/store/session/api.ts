import {SetLoading,SetSnack,SetResult} from '../system/actions'
import {SetSessionAuth} from './actions'
import {SetSessionLogin} from './actions'
import {DelSession} from './actions'
import client,* as api from '../../api' 
import {Dispatch} from 'redux'


export const GetSession = () => {
  return async (dispatch:Dispatch) => {
    dispatch(SetLoading({session:true}))
    await client.get(api.API_SESSION).then((res)=> {
      dispatch(SetSessionAuth(res.data))
      dispatch(SetSessionLogin(true))
      dispatch(SetResult({name:"session",status:200,cause:"ok"}))
      dispatch(SetLoading({session:false}))
    }).catch(error => {
      if (error.response) {
        dispatch(SetResult({name:"session",status:error.response.status,cause:error.response.data.cause}))
        dispatch(SetLoading({session:false}))
      }
    })
  }
}

export const LogOut = () => {
  return async (dispatch:Dispatch) => {
    await client.delete(api.API_LOGOUT).then((res) => {
      dispatch(SetSessionLogin(false))
      dispatch(DelSession())
      dispatch(SetResult({name:"logout",status:200,cause:"ok"}))
      dispatch(SetSnack({status:"success",message:"ログアウトしました"}))
    }).catch(error => {
      if (error.response) {
        dispatch(SetResult({name:"logout",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(SetSnack({status:"error",message:"ログアウトに失敗しました"}))
    })
  }
}
