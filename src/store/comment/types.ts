import { UserInfo } from '../user/types'
import { Cid , Page} from '../commonTypes'


export type Comment = {
  mid: number,
  compe_id: Cid,
  user: UserInfo,
  message: string,
  update: string,
}

export type Comments = {
  list: Comment[],
  page: Page
}

export const API_COMMENTS_SUCCESS = "API_COMMENTS_SUCCESS"
export const API_COMMENT_SUCCESS = "API_COMMENT_SUCCESS"

export type ApiCommentsSuccess = {
  type: typeof API_COMMENTS_SUCCESS,
  payload: Comments
} 

export type ApiCommentSuccess = {
  type: typeof API_COMMENT_SUCCESS,
  payload:Comment
}

export type CommentAction = ApiCommentsSuccess | ApiCommentSuccess




