import * as tcource from './types'
import {API_COURCE} from '../../api'
import api from '../../api'
import {Dispatch} from 'redux'
import {SetAppResult,SetProcessing} from '../system/actions'

export const ApiCourceSuccess = (list:tcource.CourceList):tcource.CorceAction => {
  return {
    type: tcource.GET_COURCELIST,
    payload:list
  }
}

export const GetCource = (key:tcource.Key) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.get(API_COURCE,{params:{pref:key.pref_id,word:encodeURI(key.word)}})
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      dispatch(ApiCourceSuccess(res.data))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}
