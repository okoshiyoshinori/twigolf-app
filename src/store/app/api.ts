import client, * as api  from '../../api/'
import {Dispatch} from 'redux'
import {SetCompetition,SetUser,SetCompetitions,SetClubs,SetComments,SetParticipants,SetSearchResult} from './actions'
import * as sys from '../system/actions' 


export const GetUser = (id:string) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({user:true}))
    await client.get(api.API_USER + "/" + id).then(res => {
      dispatch(SetUser(res.data))
      dispatch(sys.SetResult({name:"user",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({user:false}))
    }).catch(error =>{
       console.log(error.response)
       if (error.response != undefined) {
        dispatch(sys.SetResult({name:"user",status:error.response.status,cause:error.response.data.cause}))
        }
        dispatch(sys.SetLoading({user:false}))
    })
  }
}

export const GetCompetition =  (id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({competition:true}))
    await client.get(api.API_COMPETITION + "/" + id).then(res => {
      dispatch(SetCompetition(res.data))
      dispatch(sys.SetResult({name:"competition",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({competition:false}))
    }).catch(error => {
      if (error.response != undefined) {
        dispatch(sys.SetResult({name:"competition",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({competition:false}))
    })
  }
}

export const GetUserCompetitions = (id:string,page:number,sort:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({competitions:true}))
    await client.get(api.API_USER_COMPETITIONS + "/" + id,{
      params: {
        p:page,
        sort:sort
      }
    }).then((res) => {
      dispatch(SetCompetitions(res.data))
      dispatch(sys.SetResult({name:"competitions",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({competitions:false}))
    }).catch(error => {
      if (error.response != undefined) {
        dispatch(sys.SetResult({name:"competitions",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({competitions:false}))
    })
  }
}

export const GetCompetitions = (page:number,mode:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({competitions:true}))
    await client.get(api.API_COMPETITION,{
      params: {
        p:page,
        mode:mode
      }
    }).then((res) => {
      dispatch(SetCompetitions(res.data))
      dispatch(sys.SetResult({name:"competitions",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({competitions:false}))
    }).catch(error => {
      if (error.response != undefined) {
        dispatch(sys.SetResult({name:"competitions",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({competitions:false}))
    })
  }
}

export const GetClubs = (keyword:string) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({clubs:true}))
    await client.get(api.API_CLUBS,{
      params :{
        word:keyword
      }
    }).then(res => {
      dispatch(SetClubs(res.data))
      dispatch(sys.SetResult({name:"club",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({clubs:false}))
    }).catch(error => {
      if (error.response != undefined) {
        dispatch(sys.SetResult({name:"club",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({clubs:false}))
    })
  }
}

export const GetParticipants = (comptition_id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({participants:true}))
    await client.get(api.API_PARTICIPANTS + "/" + comptition_id).then(res =>{
      dispatch(SetParticipants(res.data))
      dispatch(sys.SetResult({name:"participants",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({participants:false}))
    }).catch(error => {
      if (error.response != undefined) {
        dispatch(sys.SetResult({name:"participants",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({participants:false}))
    })
  }
}

export const GetComments = (competiton_id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({comments:true}))
    await client.get(api.API_COMMENTS + "/" + competiton_id).then(res => {
      dispatch(SetComments(res.data))
      dispatch(sys.SetResult({name:"comments",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({comments:false}))
    }).catch(error => {
      if (error.response != undefined) {
        dispatch(sys.SetResult({name:"comments",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({comments:false}))
    })
  }
}

export const SearchCompetition = (p:number,q:string | null,date:string | null,mode:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({search:true}))
    await client.get(api.API_SEARCH,{params:{
      p:p,
      q:q,
      date:date,
      mode:mode
    }}).then(res => {
      dispatch(SetSearchResult(res.data))
      dispatch(sys.SetResult({name:"search",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({search:false}))
    }).catch(error =>{
      if (error.response != undefined) {
        dispatch(sys.SetResult({name:"search",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({search:false}))
    })
  }
}
