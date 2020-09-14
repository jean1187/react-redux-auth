// constantes
const dataInicial = {};

// types
const alertConstants = {
  SUCCESS: "ALERT_SUCCESS",
  ERROR: "ALERT_ERROR",
  CLEAR: "ALERT_CLEAR",
};

// reducer
export function alertReducer(state = dataInicial, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "alert-success",
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        type: "alert-danger",
        message: action.message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}

// actions
export const alertSuccess=(message) =>{
  return { type: alertConstants.SUCCESS, message };
}

export const alertError=(message)=> {
  return { type: alertConstants.ERROR, message };
}

export const alertClear=()=> {
  return { type: alertConstants.CLEAR };
}
