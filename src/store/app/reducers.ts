import * as types  from './types'

const initState:types.AppState = {
  comments:[] as types.Comment[],
  competition:{} as types.Competition ,
  competitions:{} as types.FetchResult,
  clubs:[] as types.Club[],
  participants:[] as types.Participant[],
  searchresult:{} as types.FetchResult,
  user:{} as types.User,
  combinations:[] as types.Combination[],
}

const Reducers = (state:types.AppState= initState,action:types.AppAction):types.AppState => {
  switch(action.type) {
    case types.SET_USER:
      return Object.assign({},state,{
        user:action.payload
      })
    case types.SET_CLUBS:
      return Object.assign({},state,{
        clubs:action.payload
      })
    case types.SET_COMPETITIONS:
      return Object.assign({},state,{
        competitions: action.payload
      })
    case types.SET_COMPETITION:
      return Object.assign({},state,{
        competition: action.payload
      })
    case types.SET_COMMENTS:
      return Object.assign({},state,{
        comments: action.payload
      })
    case types.SET_PATICIPANTS:
      return Object.assign({},state,{
        participants: action.payload
      })
    case types.SET_COMBINATIONS:
      return Object.assign({},state,{
        combinations: action.payload
      })
    case types.SET_SEARCH_RESULT:
      return Object.assign({},state,{
        searchresult: action.payload
      })
    default:
      return state
  }
}

export default Reducers

