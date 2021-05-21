import axios from 'axios'
import config from '../config/config'

//API url
export const API_USER = "/api/public/user"
export const API_COMPETITION = "/api/public/competition"
export const API_CLUBS = "/api/public/clubs"
export const API_COMMENTS = "/api/public/comments"
export const API_PARTICIPANTS = "/api/public/participants"
export const API_SEARCH = "/api/public/search"
export const API_USER_COMPETITIONS = "/api/public/user_competitions"
export const API_SESSION = "/api/public/session"
export const API_LOGOUT = "/api/private/logout"
export const API_POST_PARTICIPANT = "/api/private/participant"
export const API_POST_COMMENTS = "/api/private/comments"
export const API_POST_COMPETITION = "/api/private/competition"
export const API_DELETE_COMPETITION = "/api/private/competition"
export const API_POST_BASIC_INFO = "/api/private/user_basic_info"
export const API_BUNDLE_PARTICIPANT = "/api/private/bundle_participant"
export const API_GET_COMBINATIONS = "/api/public/combination"
export const API_GET_PARTICIPANTS_WITH_NAME = "/api/private/participants_with_name"
export const API_POST_COMBINATIONS = "/api/private/combination"
export const API_GET_EXCEL = "/api/private/get_combination_excel"
export const API_DM = "/api/private/send_dm"
export const API_TWITTER_LOGIN = "api/public/twitterlogin"

export default axios.create({
  baseURL: config?.api_url,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  withCredentials: true,
})
