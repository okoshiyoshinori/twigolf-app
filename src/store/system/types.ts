export const SET_LOADING = "SET_LOADING"
export const SET_RESULT = "SET_RESULT"
export const RESET_RESULT = "RESET_RESULT"
export const SET_SNACK = "SET_SNACK"
export const RESET_SNACK = "RESET_SNACK"

export interface SystemState {
  result:Result[],
  loading:Loading
  snack: SnackData
}

export interface Result {
  name:string
  status:number
  cause: string
}

export interface Loading {
  competition:boolean 
  competitions:boolean
  clubs:boolean
  participants:boolean
  comments:boolean
  search:boolean
  user:boolean
  combinations:boolean
  session:boolean
  excel:boolean
  dm:boolean
}

export type snackStatus = "error" | "warning" | "info" | "success" | null

export interface SnackData {
  status: snackStatus,
  message:string
}

export interface UserLoading {
  user:boolean
}

export interface ExcelLoading {
  excel:boolean
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

export interface CombinationLoading {
  combinations:boolean
}

export interface SessionLoading {
  session:boolean
}

export interface DmLoading {
  dm:boolean
}

export type NowLoading = CompetitionLoading | CompetitionsLoading | ClubLoading | ParticipantsLoading | CommentsLoading |
    SearchLoading | UserLoading | CombinationLoading | SessionLoading | ExcelLoading | DmLoading

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

export interface SetSnack {
  type:typeof SET_SNACK,
  payload: SnackData
}

export interface ResetSnack {
  type:typeof RESET_SNACK
}

export type SystemAction = SetLoading | SetResult | ResetResult | SetSnack | ResetSnack
