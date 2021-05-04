import client, * as api  from '../../api/'
import {Dispatch} from 'redux'
import {saveAs} from 'file-saver'
import {SetCombinations,SetCompetition,SetUser,SetCompetitions,SetClubs,SetComments,SetParticipants,SetSearchResult} from './actions'
import * as sys from '../system/actions' 
import {BundleCombination,FetchResult,Competition,User,BundleParticipant,PostParticipant,PostComment,PostCompetition,PostRealName,GetCombination} from '../app/types'


export const GetExcel = (cid:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({excel:true}))
    await client.get(api.API_GET_EXCEL + "/" + cid,{responseType:"blob"}).then(res => {
      const data = new Blob([res.data],{type:res.data.type})
      saveAs(data,"組み合わせ表.xlsx")
      dispatch(sys.SetLoading({excel:false}))
    }).catch(error =>{
      if (error.response) {
        sys.SetSnack({status:"error",message:error.response.data.cause})
        dispatch(sys.SetLoading({excel:false}))
      }
    })
  }
}
export const GetCombinationData = (cid:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetCombinations({} as GetCombination ))
    dispatch(sys.SetLoading({combinations:true}))
    await client.get(api.API_GET_COMBINATIONS + "/" + cid).then(res => {
      dispatch(SetCombinations(res.data))
      dispatch(sys.SetResult({name:"combinations",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({combinations:false}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"combinations",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({combinations:false}))
      }
    })
  }
}

export const GetUser = (id:string) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetUser({} as User))
    dispatch(sys.SetLoading({user:true}))
    await client.get(api.API_USER + "/" + id).then(res => {
      dispatch(SetUser(res.data))
      dispatch(sys.SetResult({name:"user",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({user:false}))
    }).catch(error =>{
       if (error.response) {
        dispatch(sys.SetResult({name:"user",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({user:false}))
       }
    })
  }
}

export const GetCompetition =  (id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetCompetition({} as Competition))
    dispatch(sys.SetLoading({competition:true}))
    await client.get(api.API_COMPETITION + "/" + id).then(res => {
      dispatch(SetCompetition(res.data))
      dispatch(sys.SetResult({name:"competition",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({competition:false}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"competition",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({competition:false}))
      }
    })
  }
}

export const GetUserCompetitions = (id:string,page:number,sort:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetCompetitions({} as FetchResult))
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
      if (error.response) {
        dispatch(sys.SetResult({name:"competitions",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({competitions:false}))
      }
    })
  }
}

export const GetCompetitions = (page:number,mode:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetCompetitions({} as FetchResult))
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
      if (error.response) {
        dispatch(sys.SetResult({name:"competitions",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({competitions:false}))
      }
    })
  }
}

export const GetClubs = (keyword:string) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetClubs([]))
    dispatch(sys.SetLoading({clubs:true}))
    await client.get(api.API_CLUBS,{
      params :{
        word:keyword
      }
    }).then(res => {
      dispatch(SetClubs(res.data))
      dispatch(sys.SetResult({name:"clubs",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({clubs:false}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"clubs",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({clubs:false}))
    })
  }
}

export const GetParticipants = (comptition_id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetParticipants([]))
    dispatch(sys.SetLoading({participants:true}))
    await client.get(api.API_PARTICIPANTS + "/" + comptition_id).then(res =>{
      dispatch(SetParticipants(res.data))
      dispatch(sys.SetResult({name:"participants",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({participants:false}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"participants",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({participants:false}))
      }
      dispatch(sys.SetLoading({participants:false}))
    })
  }
}

export const GetParticipantsWithName = (comptition_id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetParticipants([]))
    dispatch(sys.SetLoading({participants:true}))
    await client.get(api.API_GET_PARTICIPANTS_WITH_NAME + "/" + comptition_id).then(res =>{
      dispatch(SetParticipants(res.data))
      dispatch(sys.SetResult({name:"participants",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({participants:false}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"participants",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({participants:false}))
      }
    })
  }
}

export const GetComments = (competiton_id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetComments([]))
    dispatch(sys.SetLoading({comments:true}))
    await client.get(api.API_COMMENTS + "/" + competiton_id).then(res => {
      dispatch(SetComments(res.data))
      dispatch(sys.SetResult({name:"comments",status:200,cause:"ok"}))
      dispatch(sys.SetLoading({comments:false}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"comments",status:error.response.status,cause:error.response.data.cause}))
      }
      dispatch(sys.SetLoading({comments:false}))
    })
  }
}

export const SearchCompetition = (p:number,q:string | null,date:string | null,mode:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(SetSearchResult({} as FetchResult))
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
      if (error.response) {
        dispatch(sys.SetResult({name:"search",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetLoading({search:false}))
      }
    })
  }
}

export const PostComments = (data:PostComment) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({comments:true}))
    await client.post(api.API_POST_COMMENTS,{...data}).then((res => {
      dispatch(SetComments(res.data.payload))
      dispatch(sys.SetResult({name:"comments",status:200,cause:res.data.cause}))
      dispatch(sys.SetLoading({comments:false}))
      dispatch(sys.SetSnack({status:"success",message:res.data.cause}))
    })).catch(error => {
       if (error.response) {
        dispatch(sys.SetResult({name:"comments",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetSnack({status:"error",message:error.response.data.cause}))
      }
    })
  }
}

export const PostPatricipant = (data:PostParticipant) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({participants:true}))
    await client.post(api.API_POST_PARTICIPANT,{...data}).then((res => {
      dispatch(SetParticipants(res.data.payload))
      dispatch(sys.SetResult({name:"participants",status:200,cause:res.data.cause}))
      dispatch(sys.SetLoading({participants:false}))
      dispatch(sys.SetSnack({status:"success",message:res.data.cause}))
    })).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"participants",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetSnack({status:"error",message:error.response.data.cause}))
      }
    })
  }
}

export const PostBundlePatricipant = (data:BundleParticipant) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({participants:true}))
    await client.post(api.API_BUNDLE_PARTICIPANT,{...data}).then((res) => {
      dispatch(SetParticipants(res.data.payload))
      dispatch(sys.SetResult({name:"participants",status:200,cause:res.data.cause}))
      dispatch(sys.SetLoading({participants:false}))
      dispatch(sys.SetSnack({status:"success",message:res.data.cause}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"participants",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetSnack({status:"error",message:error.response.data.cause}))
      }
    })
  }

}

export const PostCompetitionDate = (data:PostCompetition) => {
  return async (dispatch:Dispatch) => {
    await client.post(api.API_POST_COMPETITION,{...data}).then((res)=> {
      dispatch(sys.SetResult({name:"competitions",status:200,cause:res.data.cause}))
      dispatch(sys.SetSnack({status:"success",message:res.data.cause}))
    }).catch(error => {
      if (error.response) {
        dispatch(sys.SetResult({name:"competitions",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetSnack({status:"error",message:error.response.data.cause}))
      }
    })
  }
}

export const PostRealNameData = (data:PostRealName) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({user:true}))
    await client.post(api.API_POST_BASIC_INFO,{...data}).then((res)=> {
      dispatch(sys.SetResult({name:"post_real_name",status:200,cause:res.data.cause}))
      dispatch(sys.SetSnack({status:"success",message:res.data.cause}))
      dispatch(sys.SetLoading({user:false}))
    }).catch(error => {
       if (error.response) {
        dispatch(sys.SetResult({name:"post_real_name",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetSnack({status:"error",message:error.response.data.cause}))
        dispatch(sys.SetLoading({user:false}))
       }
    })
  }
}

export const PostCombinationData = (data:BundleCombination,cid:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(sys.SetLoading({combinations:true}))
    await client.post(api.API_POST_COMBINATIONS + "/" + cid,{...data}).then(res => {
      dispatch(SetCombinations(res.data))
      dispatch(sys.SetResult({name:"combinations",status:200,cause:res.data.cause}))
      dispatch(sys.SetSnack({status:"success",message:res.data.cause}))
      dispatch(sys.SetLoading({combinations:false}))
    }).catch(error =>{
      if (error.response) {
        dispatch(sys.SetResult({name:"combinations",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetSnack({status:"error",message:error.response.data.cause}))
        dispatch(sys.SetLoading({combinations:false}))
      }
    })
  }

}

export const DeleteCompetition = (id:number) => {
  return async (dispatch:Dispatch) => {
    await client.delete(api.API_DELETE_COMPETITION + "/" + id ).then((res) =>{
      dispatch(sys.SetResult({name:"delete_competition",status:200,cause:res.data.cause}))
      dispatch(sys.SetSnack({status:"success",message:res.data.cause}))
    }).catch(error=> { 
      if (error.response) {
        dispatch(sys.SetResult({name:"delete_competition",status:error.response.status,cause:error.response.data.cause}))
        dispatch(sys.SetSnack({status:"error",message:error.response.data.cause}))
      }
    })
  }
}
