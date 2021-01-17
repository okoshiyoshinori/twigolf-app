import * as tsystem from './types'
import {Dispatch} from 'redux'
import api from '../../api'
import {API_PREF} from '../../api'

export const SetAppResult = (result:tsystem.AppResult):tsystem.SystemAction => {
  return {
    type: tsystem.SET_APPRESULT,
    payload: result 
  }
}

export const SetProcessing = (data:tsystem.Processing):tsystem.SystemAction => {
  return {
    type: tsystem.SET_PROCESSING,
    payload: data
  }
}

export const SetPref = (pref:tsystem.PrefList):tsystem.SystemAction => {
  return {
    type: tsystem.SET_PREF, 
    payload: pref
  }
}

export const GetPref = () => {
  return async (dispatch:Dispatch) => {
    const res = await api.get(API_PREF)
    if (res.status == 200) {
     return dispatch(SetPref(res.data))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}
