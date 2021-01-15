export interface CourceDetail {
  cource_id: number,
  pref_id: number,
  name: string,
  address: string,
  other: string,
}

export interface CourceList {
  list: CourceDetail[],
}

export interface Key {
  pref_id: number,
  word: string,
}

export const GET_COURCELIST = "GET_COURCELIST"

export interface GetCourceList {
  type: typeof GET_COURCELIST,
  payload: Key,
}

export type CorceAction = GetCourceList

