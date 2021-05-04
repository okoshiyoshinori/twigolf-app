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
    user:false,
    combinations:false,
    session:false,
    excel:false
  },
  snack:{
    status:null,
    message:""
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
      after.result.unshift(action.payload)
      return after 
    case types.RESET_RESULT:
      let base = {...state}
      base.result = []
      return base
    case types.SET_SNACK:
      let temp = {...state}
      temp.snack = action.payload
      return temp
    case types.RESET_SNACK:
      let temp1 = {...state}
      temp1.snack = {
        status:null,
        message:""
      }
      return temp1
    default:
      return state
  }
}

export default Reducers
