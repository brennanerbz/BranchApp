import cookie from 'react-cookie';
import request from 'superagent';

const LOAD = 'BranchApp/auth/LOAD';
const LOAD_SUCCESS = 'BranchApp/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'BranchApp/auth/LOAD_FAIL';
// LogIn
const LOGIN = 'BranchApp/auth/LOGIN';
export const LOGIN_SUCCESS = 'BranchApp/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'BranchApp/auth/LOGIN_FAIL';
const LOGOUT = 'BranchApp/auth/LOGOUT';
const LOGOUT_SUCCESS = 'BranchApp/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'BranchApp/auth/LOGOUT_FAIL';
// SignUp
const SIGNUP = 'BranchApp/auth/SIGNUP';
export const SIGNUP_SUCCESS = 'BranchApp/auth/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'BranchApp/auth/SIGNUP_FAILURE';

const LOAD_AUTH_COOKIE = 'BranchApp/auth/LOAD_AUTH_COOKIE';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        errorOnLogIn: false
      };
    case LOGIN_SUCCESS:
      cookie.save('loginResult', action.user);
      return {
        ...state,
        loggingIn: false,
        user: action.user
      };
    case LOAD_AUTH_COOKIE:
      const loginResult = cookie.load('loginResult');
      const user = loginResult ? loginResult : null
      return {
        ...state,
        loaded: user === null ? false : true,
        user: user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        errorOnLogIn: true,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case SIGNUP:
      return {
        ...state,
        loggingIn: true,
        errorOnSignUp: false,
        signUpError: null
      }
    case SIGNUP_SUCCESS:
      cookie.save('loginResult', action.user)
      return {
        ...state,
        loggingIn: false,
        user: action.user
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        loggingIn: false,
        user: null,
        errorOnSignUp: true,
        signUpError: action.error
      }
    default:
      return state;
  }
}


export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded
}
export function loadAuth() {
  return (dispatch) => {
    dispatch(loadAuthCookie());
  }
}
export function loadAuthCookie() {
  return {
    type: LOAD_AUTH_COOKIE
  }
}
export function login(user, pushState) {
  pushState(null, '/')
  return {
    type: LOGIN_SUCCESS,
    user
  };
}
export function logout() {
  cookie.remove('loginResult');
  return {
    type: LOGOUT_SUCCESS
  };
}
export function signup(user, pushState) {
  pushState(null, '/teambranch/welcome');
  return {
    type: SIGNUP_SUCCESS,
    user
  }
}

