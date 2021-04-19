
export interface AppState {
  competition:Competition,
  competitions:FetchResult,
  clubs:Club[],
  participants:Participant[],
  comments:Comment[],
  searchresult: FetchResult,
  user:User,
  combinations:Combination[],
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
  real_name:string,
  real_name_kana:string,
  avatar:string,
  login_type:string,
  description:string,
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

export interface Combination {
  id:number,
  competition_id:number,
  start_time: Date,
  start_in_out: number,
  member1:number | null,
  member2:number | null,
  member3:number | null,
  member4:number | null,
  update_at:Date | null,
} 

export interface BundleCombination {
  transaction: Combination[]
}

export interface PostParticipant {
  id:number,
  competition_id:number,
  user_id:number,
  status:number
}

export interface BundleParticipant {
  transaction: PostParticipant[]
}

export interface PostComment {
  competition_id:number,
  user_id:number,
  message:string
}

export interface PostCompetition {
  id:number,
  user_id:number,
  status:number,
  title:string,
  contents:string,
  club_id:number | null,
  capacity:number | null,
  place_text:string | null,
  event_day:Date | null,
  event_deadline:Date | null,
  keyword:string | null,
  twitter:boolean
}

export interface PostRealName {
  id:number,
  real_name: string,
  real_name_kana: string
}


export const SET_COMPETITION = "SET_COMPETITION" 
export const SET_COMPETITIONS = "SET_COMPETITIONS"
export const SET_COMMENTS = "SET_COMMENTS"
export const SET_PATICIPANTS = "SET_PATICIPANTS"
export const SET_CLUBS = "SET_CLUBS"
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT"
export const SET_USER = "SET_USER"
export const SET_COMBINATIONS = "SET_COMBINATIONS"

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

export interface SetCombinationAction {
  type: typeof SET_COMBINATIONS,
  payload: Combination[]
}

export type AppAction = SetCompetitionAction | SetCompetitionsAction | SetCommentsAction | 
                         SetParticipantAction | SetClubAction | SetFetchResult | SetUser | SetCombinationAction
