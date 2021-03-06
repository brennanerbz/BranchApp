import cookie from 'react-cookie';
import request from 'superagent';
import $ from 'jquery';

// LogIn & Out
export const LOGIN = 'BranchApp/auth/LOGIN';
export const LOGIN_SUCCESS = 'BranchApp/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'BranchApp/auth/LOGIN_FAILURE';
export const LOGOUT = 'BranchApp/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'BranchApp/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'BranchApp/auth/LOGOUT_FAIL';
// SignUp
export const SIGNUP = 'BranchApp/auth/SIGNUP';
export const SIGNUP_SUCCESS = 'BranchApp/auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'BranchApp/auth/SIGNUP_FAILURE';
// Auth
export const LOAD_AUTH = 'BranchApp/auth/LOAD_AUTH';
export const LOAD_AUTH_SUCCESS = 'BranchApp/auth/LOAD_AUTH_SUCCESS';
export const LOAD_AUTH_FAILURE = 'BranchApp/auth/LOAD_AUTH_FAILURE';

export const UPDATE_USER = 'BranchApp/auth/UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'BranchApp/auth/UPDATE_USER_SUCCESS';

const initialState = {
  loaded: false,
  errorOnLogIn: false,
  errorOnSignUp: false,
  errorData: null,
  user: null,
  updatingUser: false
};

export default function reducer(state = initialState, action) {
  var { errorData } = state;
  if(action.error && action.error.req) {
    errorData = action.error.req._data
    if(errorData.password) {
      delete errorData.password
    }
  }

  switch (action.type) {
    case LOAD_AUTH:
      return {
        ...state
      }
    case LOAD_AUTH_SUCCESS:
      const user = action.result;
      return {
        ...state,
        loaded: true,
        user: user,
        errorData: null
      };
    case LOAD_AUTH_FAILURE:
      return {
        ...state
      }
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        errorOnLogIn: false,
        errorData: null
      };      
    case LOGIN_SUCCESS:
      cookie.save('_token', action.result.token, { path: '/'});
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        user: action.result
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loaded: false,
        loggingIn: false,
        user: null,
        errorOnLogIn: true,
        logInError: action.error ? action.error.text : null,
        errorData: errorData
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
        // loaded: false,
        user: null,
        errorData: null
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
        signUpError: null,
        errorData: null
      }
    case SIGNUP_SUCCESS:
      cookie.save('_token', action.result.token, {path: '/'})
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        user: action.result
      }
    case SIGNUP_FAILURE:
      if(!action.error || Object.keys(action.error).length === 0) {
        return {
          ...state
        }
      } else
      return {
        ...state,
        loaded: false,
        loggingIn: false,
        user: null,
        errorOnSignUp: true,
        signUpError: action.error.text,
        errorData: errorData
      }
    case UPDATE_USER:
      return {
        ...state,
        updatingUser: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        updatingUser: false
      }
    default:
      return state;
  }
}


export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded
}
export function loadAuth() {
  return (dispatch, getState) => {
    dispatch(loadAuthCookie());
  }
}
export function loadAuthCookie() {
  const token = cookie.load('_token', { path: '/'});
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
  cookie.remove('_token', { path: '/' });
  cookie.remove('_lastbranch', { path: '/' })
  cookie.remove('_lastfeed', { path: '/' })
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
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user
  };
}

// Update user
export function updateUser() {
  return {
    type: UPDATE_USER
  }
}
export function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user
  }
}

