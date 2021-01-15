import { Uid,Cid,Page } from '../commonTypes'
import { UserInfo } from '../user/types'

export type Detail = {
  compe_id: Cid,
  register: UserInfo,
  title: string,
  place: number,
  place_text: string,
  capacity: number,
  contents: string,
  event_day: string,
  event_deadline: string,
  update: string,
}  

export type OverView = {
  compe_id: Cid,
  register: UserInfo,
  title: string,
  place: number,
  place_text: string,
  capacity: number,
  event_day: string,
  event_deadline: string
}

export type CompeList = {
  compeList: OverView[],
  page: Page,
  total: number,
}

export const API_COMPETITION_DETAIL_SUCCESS = "API_COMPETITION_DETAIL_SUCCESS" 
export const API_COMPETITION_LIST_SUCCESS = "API_COMPETITION_LIST_SUCCESS"

export interface ApiCompetitonDetailSuccess {
    type: typeof API_COMPETITION_DETAIL_SUCCESS,
    payload: Detail
}

export interface ApicompetitionListSuccess {
  type: typeof API_COMPETITION_LIST_SUCCESS,
  payload: CompeList 
}

export type CompetionAction = ApicompetitionListSuccess | ApiCompetitonDetailSuccess
