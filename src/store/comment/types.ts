import { UserInfo } from '../user/types'
import { Cid , Page} from '../commonTypes'


export interface Comment {
  mid: number,
  compe_id: Cid,
  user: UserInfo,
  message: string,
  update: string,
}

export interface Comments {
  list: Comment[]
}

export const GET_COMMENTS = "GET_COMMENTS"

export interface GetComments {
  type: typeof GET_COMMENTS,
  payload: {
    compe_id: Cid,
    page: Page
  } 
} 

export type CommentAction = GetComments




