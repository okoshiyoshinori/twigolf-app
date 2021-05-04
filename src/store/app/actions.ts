import * as app from "./types"

export const SetUser = (data:app.User):app.AppAction => {
  return {
    type: app.SET_USER,
    payload: data
  }
}

export const SetCompetition = (data:app.Competition):app.AppAction => {
  return {
    type: app.SET_COMPETITION,
    payload: data
  }
}

export const SetCompetitions = (data:app.FetchResult):app.AppAction => {
  return {
    type:app.SET_COMPETITIONS,
    payload:data
  }
}

export const SetComments = (data:app.Comment[]):app.AppAction => {
  return {
    type:app.SET_COMMENTS,
    payload:data
  }
}

export const SetParticipants = (data:app.Participant[]):app.AppAction => {
  return {
    type:app.SET_PATICIPANTS,
    payload:data
  }
} 

export const SetCombinations = (data:app.GetCombination):app.AppAction => {
  return {
    type:app.SET_COMBINATIONS,
    payload:data
  }
}

export const SetClubs = (data:app.Club[]):app.AppAction => {
  return {
    type:app.SET_CLUBS,
    payload:data
  }
}

export const SetSearchResult = (data:app.FetchResult):app.AppAction => {
  return {
    type:app.SET_SEARCH_RESULT,
    payload:data
  }
}

