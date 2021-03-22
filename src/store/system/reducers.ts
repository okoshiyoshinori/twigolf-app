import * as types from './types'

const initState:types.SystemState = {
  result:[] as types.Result[],
  loading:{
    competition:false,
    clubs:false,
    competitions:false,
    comments:false,
    participants:false,
    search:false,
    user:false
  } 
}

const Reducers = (state:types.SystemState=initState,action:types.SystemAction):types.SystemState =>{
  switch(action.type) {
    case types.SET_LOADING:
     let a = { loading:{...state.loading,...action.payload}}
     let b = {...state}
     return Object.assign(b,a) 
    case types.SET_RESULT:
      let after = {...state}
      after.result.push(action.payload)
      return after 
    case types.RESET_RESULT:
      let base = {...state}
      base.result = []
      return base
    default:
      return state
  }
}

export default Reducers
