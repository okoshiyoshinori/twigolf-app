export const SET_LOADING = "SET_LOADING"
export const SET_RESULT = "SET_RESULT"
export const RESET_RESULT = "RESET_RESULT"

export interface SystemState {
  result:Result[],
  loading:Loading
}

export interface Result {
  name:string
  status:number,
  cause: string
}

export interface Loading {
  competition:boolean, 
  competitions:boolean,
  clubs:boolean,
  participants:boolean,
  comments:boolean,
  search:boolean
  user:boolean
}

export interface UserLoading {
  user:boolean
}

export interface CompetitionLoading {
  competition:boolean
}

export interface CompetitionsLoading {
  competitions:boolean
}

export interface ClubLoading {
  clubs:boolean
}

export interface ParticipantsLoading {
  participants:boolean
}

export interface CommentsLoading {
  comments:boolean
}

export interface SearchLoading {
  search:boolean
}

export type NowLoading = CompetitionLoading | CompetitionsLoading | ClubLoading | ParticipantsLoading | CommentsLoading |
    SearchLoading | UserLoading

export interface SetLoading {
  type:typeof SET_LOADING,
  payload:NowLoading
}

export interface SetResult {
  type:typeof SET_RESULT,
  payload:Result
}

export interface ResetResult {
  type:typeof RESET_RESULT
}

export type SystemAction = SetLoading | SetResult | ResetResult
