import cookie from 'react-cookie';
import request from 'superagent';

// LogIn & Out
const LOGIN = 'BranchApp/auth/LOGIN';
export const LOGIN_SUCCESS = 'BranchApp/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'BranchApp/auth/LOGIN_FAILURE';
const LOGOUT = 'BranchApp/auth/LOGOUT';
const LOGOUT_SUCCESS = 'BranchApp/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'BranchApp/auth/LOGOUT_FAIL';
// SignUp
const SIGNUP = 'BranchApp/auth/SIGNUP';
export const SIGNUP_SUCCESS = 'BranchApp/auth/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'BranchApp/auth/SIGNUP_FAILURE';
// Auth
const LOAD_AUTH = 'BranchApp/auth/LOAD_AUTH';
const LOAD_AUTH_SUCCESS = 'BranchApp/auth/LOAD_AUTH_SUCCESS';
const LOAD_AUTH_FAILURE = 'BranchApp/auth/LOAD_AUTH_FAILURE';

const initialState = {
  loaded: false,
  errorOnLogIn: false,
  errorOnSignUp: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_AUTH_SUCCESS:
      const user = action.result;
      return {
        ...state,
        loaded: true,
        user: user
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        errorOnLogIn: false
      };
    case LOGIN_SUCCESS:
      cookie.save('_token', action.result.token);
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        user: action.result
      };
    case LOGIN_FAILURE:
      cookie.remove('_token')
      return {
        ...state,
        loaded: false,
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
        loaded: false,
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
      cookie.save('_token', action.result.token)
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        user: action.result
      }
    case SIGNUP_FAILURE:
      cookie.remove('_token')
      return {
        ...state,
        loaded: false,
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
  const token = cookie.load('_token');
  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_FAILURE],
    promise: (client) => client.post('/authenticate', {
      token: token
    })
  }
}
export function login(user) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: (client) => client.post('/login', user)
  };
}
export function logout() {
  cookie.remove('_token');
  return {
    type: LOGOUT_SUCCESS
  };
}
export function signup(user) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    promise: (client) => client.post('/signup', user)
  };
}

