
export interface AppState {
  competition:Competition,
  competitions:FetchResult,
  clubs:Club[],
  participants:Participant[],
  comments:Comment[],
  searchresult: FetchResult,
  user:User
}


export interface FetchResult {
  allNumber:number,
  payload:Competition[]
}

export interface Competition {
  id:number,
  user_id:number,
  status:number,
  title:string,
  capacity:number,
  contents:string,
  club_id:number,
  place_text:string,
  event_day:Date,
  event_deadline:Date,
  keyword:string,
  user:User,
  club:Club,
  update_at:Date
}

export interface Club {
  id:number,
  class:number,
  name:string,
  address:string,
  other:string
}

export interface User {
  id:number,
  sns_id:string,
  screen_name:string,
  avatar:string,
  login_type:string,
  description:string,
  active:boolean,
  update_at:Date
}

export interface Participant {
  id:number,
  competition_id:number,
  user_id:number,
  status:number,
  user:User,
  update_at:Date
}

export interface Comment {
  id:number,
  competition_id:number,
  user_id:number,
  message:string,
  user:User,
  update_at:Date
}


export const SET_COMPETITION = "SET_COMPETITION" 
export const SET_COMPETITIONS = "SET_COMPETITIONS"
export const SET_COMMENTS = "SET_COMMENTS"
export const SET_PATICIPANTS = "SET_PATICIPANTS"
export const SET_CLUBS = "SET_CLUBS"
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT"
export const SET_USER = "SET_USER"

export interface SetUser {
  type: typeof SET_USER,
  payload: User
}

export interface SetFetchResult {
  type: typeof SET_SEARCH_RESULT,
  payload: FetchResult 
}

export interface SetCompetitionAction {
    type: typeof SET_COMPETITION,
    payload: Competition
}

export interface SetCompetitionsAction {
  type: typeof SET_COMPETITIONS,
  payload: FetchResult 
}

export interface SetCommentsAction {
  type: typeof SET_COMMENTS,
  payload: Comment[]
}

export interface SetParticipantAction {
  type: typeof SET_PATICIPANTS,
  payload: Participant[],
}

export interface SetClubAction {
  type: typeof SET_CLUBS,
  payload: Club[]
}

export type AppAction = SetCompetitionAction | SetCompetitionsAction | SetCommentsAction | 
                         SetParticipantAction | SetClubAction | SetFetchResult | SetUser
