import * as sys from './types' 

export const SetLoading = (data:sys.NowLoading):sys.SystemAction => {
  return {
    type: sys.SET_LOADING,
    payload: data,
  }
}

export const SetResult = (data:sys.Result):sys.SystemAction => {
  return {
    type: sys.SET_RESULT,
    payload: data
  }
}

export const ResetResult = ():sys.SystemAction => {
  return {
    type:sys.RESET_RESULT
  }
}

export const SetSnack = (data:sys.SnackData):sys.SystemAction => {
  return {
    type:sys.SET_SNACK,
    payload:data
  }
}

export const ResetSnack = ():sys.SystemAction => {
  return {
    type:sys.RESET_SNACK
  }
}
