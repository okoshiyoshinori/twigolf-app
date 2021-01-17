export type CourceDetail = {
  cource_id: number,
  pref_id: number,
  name: string,
  address: string,
  other: string,
}

export type CourceList = {
  list: CourceDetail[],
}

export type Key = {
  pref_id: number,
  word: string,
}

export const GET_COURCELIST = "GET_COURCELIST"

export interface GetCourceList {
  type: typeof GET_COURCELIST,
  payload: CourceList,
}

export type CorceAction = GetCourceList

