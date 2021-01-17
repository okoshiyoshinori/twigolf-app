import * as tcomment from './types'
import { Cid,Page} from '../commonTypes'
import { Dispatch } from 'redux'
import {SetAppResult,SetProcessing} from '../system/actions'
import api from '../../api'
import {API_COMMENT,API_COMMENTS } from '../../api'

export const ApiCommentsSuccess = (c:tcomment.Comments):tcomment.CommentAction => {
  return {
    type: tcomment.API_COMMENTS_SUCCESS,
    payload:c
  }
}

export const ApiCommentSuccess = (c:tcomment.Comment):tcomment.CommentAction => {
  return {
    type: tcomment.API_COMMENT_SUCCESS,
    payload:c,
  }
}

export const PostComment = (com:tcomment.Comment) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.post(API_COMMENT,com)
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      dispatch(ApiCommentSuccess(com))
    }
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}

export const GetComments = (cid:Cid,p:Page) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetProcessing({done:true}))
    const res = await api.get(API_COMMENTS,{params:{ cid:cid,p:p}})
    dispatch(SetProcessing({done:false}))
    if (res.status == 200) {
      return dispatch(ApiCommentsSuccess(res.data))
    } 
    return dispatch(SetAppResult({status:res.status,cause:res.statusText}))
  }
}
