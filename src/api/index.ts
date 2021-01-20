import axios from 'axios'

//API url
export const API_USER = "/api/user"
export const API_COMPE_DETAIL = "/api/competition"
export const API_COMPE_LIST = "/api/competition/list"
export const API_COURCE = "/api/cource"
export const API_COMMENT = "/api/comment"
export const API_COMMENTS = "/api/comments"
export const API_PREF = "/api/pref"

export default axios.create({
  baseURL: "http://localhost:9001",
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json'
})
