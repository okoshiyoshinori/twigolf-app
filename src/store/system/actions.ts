import * as tsystem from './types'

export const SetAppResult = (result:tsystem.AppResult):tsystem.SystemAction => {
  return {
    type: tsystem.SET_APPRESULT,
    payload: result 
  }
}

export const SetProcessing = (data:tsystem.Processing):tsystem.SystemAction => {
  return {
    type: tsystem.SET_PROCESSING,
    payload: data
  }
}

