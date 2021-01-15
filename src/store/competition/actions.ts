import * as tcompetition from './types'
import { Cid , Page} from '../commonTypes'
import api from '../../api'
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
    const res = await api.get('/api/competition/',{params:{cid:cid}})
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
    const res = await api.post("/api/competiton/",detail)
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      dispatch(ApiCometitionDetailSuccess(res.data))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

export const GetList = (page:Page) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.get('/api/competition/list/',{ params: { p:page}})
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      return dispatch(ApicompetitionListSuccess(res.data))
    } else {
      return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
    }
  }
}
