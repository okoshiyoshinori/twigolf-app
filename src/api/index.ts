import axios from 'axios'

//API url
export const API_USER = "/api/public/user"
export const API_COMPETITION = "/api/public/competition"
export const API_CLUBS = "/api/public/club"
export const API_COMMENTS = "/api/public/comments"
export const API_PARTICIPANTS = "/api/public/participants"
export const API_SEARCH = "/api/public/search"
export const API_USER_COMPETITIONS = "/api/public/user_competitions"
export const API_SESSION = "api/public/session"
export const API_LOGOUT = "api/public/logout"

export default axios.create({
  baseURL: "http://127.0.0.1:9001",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
  },
  responseType: 'json',
  withCredentials: true,
})
