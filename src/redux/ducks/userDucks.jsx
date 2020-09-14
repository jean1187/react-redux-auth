import { userService } from "../_services";
import { history } from "../../_helpers";
import { alertError } from "./alertDucks";


// constantes
let user = JSON.parse(sessionStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

// types
export const userConstants = {
  LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
  LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

  LOGOUT: "USERS_LOGOUT",

  GETALL_REQUEST: "USERS_GETALL_REQUEST",
  GETALL_SUCCESS: "USERS_GETALL_SUCCESS",
  GETALL_FAILURE: "USERS_GETALL_FAILURE",
};


// reducer
export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}

export const authenticationReducer=(state = initialState, action) =>{
    switch (action.type) {
      case userConstants.LOGIN_REQUEST:
        return {
          loggingIn: true,
          user: action.user,
        };
      case userConstants.LOGIN_SUCCESS:
        return {
          loggedIn: true,
          user: action.user,
        };
      case userConstants.LOGIN_FAILURE:
        return {};
      case userConstants.LOGOUT:
        return {};
      default:
        return state;
    }
}

// actions

export const login = (username, password) => async (dispatch) => {
  
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertError(error));
      }
    );
  

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

export const logout = () =>  (dispatch) => {
  // remove user from local storage to log user out
  sessionStorage.removeItem("user");
  dispatch({ type: userConstants.LOGOUT });
}

export const getAll = () => (dispatch) => {
  
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error))
    );
  

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
};