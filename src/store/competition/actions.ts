import * as tcompetition from './types'
import { Cid , Page} from '../commonTypes'
import api from '../../api'
import {API_COMPE_DETAIL,API_COMPE_LIST} from '../../api'
import { Dispatch } from 'redux'
import { SetAppResult,SetProcessing } from '../system/actions'

export const ApiCometitionDetailSuccess = (detail:tcompetition.Detail):tcompetition.CompetionAction => {
  return {
    type: tcompetition.API_COMPETITION_DETAIL_SUCCESS,
    payload:detail
  }
}

export const ApicompetitionListSuccess = (list:tcompetition.CompeList):tcompetition.CompetionAction => {
  return {
    type: tcompetition.API_COMPETITION_LIST_SUCCESS,
    payload: list
  }
}

export const GetDetail = (cid:Cid) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.get(API_COMPE_DETAIL,{params:{cid:cid}})
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      return dispatch(ApiCometitionDetailSuccess(res.data))
    } else {
      return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
    }
  }
}

export const PostDetail = (detail:tcompetition.Detail) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.post(API_COMPE_DETAIL,detail)
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      dispatch(ApiCometitionDetailSuccess(res.data))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

export const UpdateDetail = (detail:tcompetition.Detail) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.put(API_COMPE_DETAIL,detail)
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      dispatch(ApicompetitionListSuccess(res.data))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

export const DeleteDetail = (cid:Cid) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.delete(API_COMPE_DETAIL,{data:cid})
    dispatch(SetProcessing({done:false}))
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

export const GetList = (page:Page) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.get(API_COMPE_LIST,{ params: { p:page}})
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      return dispatch(ApicompetitionListSuccess(res.data))
    } else {
      return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
    }
  }
}
