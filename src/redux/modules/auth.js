import cookie from 'react-cookie';

const LOAD = 'BranchApp/auth/LOAD';
const LOAD_SUCCESS = 'BranchApp/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'BranchApp/auth/LOAD_FAIL';
// LogIn
const LOGIN = 'BranchApp/auth/LOGIN';
const LOGIN_SUCCESS = 'BranchApp/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'BranchApp/auth/LOGIN_FAIL';
const LOGOUT = 'BranchApp/auth/LOGOUT';
const LOGOUT_SUCCESS = 'BranchApp/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'BranchApp/auth/LOGOUT_FAIL';
// SignUp
const SIGNUP = 'BranchApp/auth/SIGNUP';
const SIGNUP_SUCCESS = 'BranchApp/auth/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'BranchApp/auth/SIGNUP_FAILURE';

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
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      cookie.save('token', action.result.token);
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
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
        signUpError: null
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        loggingIn: false,
        user: null,
        signUpError: action.error
      }
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

// Change these values to access chat / landing 
export function checkAuth() {
  if (cookie.load('token')) {
    return false;
  }
  return true;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

// LogIn
export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        email: email,
        password: password
      }
    })
  };
}
export function logout() {
  cookie.remove('token');
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

// SignUp
export function signup(user) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    promise: (client) => client.post('/signup', user)
  }
}


