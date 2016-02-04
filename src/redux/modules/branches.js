import { isEmpty } from '../../utils/validation';
import _ from 'lodash';
import cookie from 'react-cookie';


const NEW_BRANCH = 'BranchApp/branches/NEW_BRANCH';
const RECEIVE_BRANCHES = 'BranchApp/branches/RECEIVE_BRANCHES';
const LEAVE_BRANCH = 'BranchApp/branches/LEAVE_BRANCH';
const CHANGE_ACTIVE_BRANCH = 'BranchApp/branches/CHANGE_ACTIVE_BRANCH';
const MARK_BRANCH_UNREAD = 'BranchApp/branches/MARK_BRANCH_UNREAD';
const MARK_BRANCH_READ = 'BranchApp/branches/MARK_BRANCH_READ';
const CLEAR_BRANCHES = 'BranchApp/branches/CLEAR_BRANCHES';

const initialState = {
  branchMemberships: [],
  branches: [],
  activeBranch: null,
  loaded: false // <---- the initialState of branches have been loaded
};

export default function reducer(state = initialState, action) {
  { /* Variables to be used for multiple cases */}
  var { branchMemberships } = state;
  var { branches } = state;
  var isNewBranchInState;
  var isNewBranchMembershipInState;

  switch (action.type) {
    case NEW_BRANCH:
      isNewBranchMembershipInState = branchMemberships.filter(membership => { return membership.id === action.branch.id })[0];
      isNewBranchInState = branches.filter(branch => { return branch.id === action.branch.feed.id })[0];
      return {
        ...state, 
        branchMemberships: !isNewBranchMembershipInState ? [action.branch, ...branchMemberships] : branchMemberships,
        branches: !isNewBranchInState ? [action.branch.feed, ...branches] : branches
      }
    case RECEIVE_BRANCHES:
      let receivedBranchMemberships = [...branchMemberships, ...action.branches].__findUniqueByKey('id')
      let receivedBranches = [];
      receivedBranchMemberships.forEach(branch => {
        receivedBranches.push(branch.feed)
      })
      receivedBranches = [...branches, ...receivedBranches].__findUniqueByKey('id')
      return {
        ...state,
        branchMemberships: receivedBranchMemberships,
        branches: receivedBranches,
        loaded: true
      }
    case CHANGE_ACTIVE_BRANCH:
      cookie.save('_lastbranch', action.branch_id, { path: '/'})
      return {
        ...state,
        activeBranch: action.branch_id
      }
    case LEAVE_BRANCH:
      branchMemberships = branchMemberships.filter(membership => { return membership.feed_id !== action.branch_id })
      branches = branches.filter(branch => { return branch.id !== action.branch_id })
      return {
        ...state,
        branchMemberships: branchMemberships,
        branches: branches
      }
    case MARK_BRANCH_UNREAD:
      return {
        ...state,
        branches: branches.map(branch => {
          if(branch.id == action.branch_id) {
            branch.unread = true
          }
          return branch;
        })
      }
    case MARK_BRANCH_READ:
      return {
        ...state,
        branches: branches.map(branch => {
          if(branch.id == action.branch_id) {
            branch.unread = false
          }
          return branch;
        })
      }
    case CLEAR_BRANCHES:
      return {
        ...state = initialState,
        branchMemberships: [],
        branches: [],
        activeBranch: null
      }
    default:
      return state;
  }
}

// Change the active branch
export function changeActiveBranch(branch_id) {
  return {
    type: CHANGE_ACTIVE_BRANCH,
    branch_id
  }
}

// socket.on('receive parent membership')
export function newBranch(branch) {
  return (dispatch, getState) => {
    dispatch({type: NEW_BRANCH, branch})
    dispatch(changeActiveBranch(branch.feed.title))
    const user = getState().auth.user
    socket.emit('get nonmembership feeds', {
      user_id: user.id,
      feed_id: branch.feed_id
    })
  }
}

import { allFeedsLoaded } from './feeds';
//socket.on('receive parent memberships')
export function receiveBranches(branches) {
  return (dispatch, getState) => {
    dispatch({type: RECEIVE_BRANCHES, branches})
    if(Array.isArray(branches) && branches.length > 0) {
      const user = getState().auth.user
      for(var b = 0; b < branches.length; b++) {
        const branch = branches[b];
        socket.emit('get child memberships', {
          user_id: user.id,
          feed_id: branch.feed_id
        })
        socket.emit('get nonmembership feeds', {
          user_id: user.id,
          feed_id: branch.feed_id
        })
        if(b === branches.length - 1) {
          setTimeout(() => {
            dispatch(allFeedsLoaded())
          }, 1000)
        }
      }
    }
  }
}

// socket.on('left parent')
export function leaveBranch(branch_id, pushState) {
  return (dispatch, getState) => {
    const branches = getState().branches.branches;
    const activeBranch = getState().branches.activeBranch;
    const activeBranchId = branches.filter(branch => { return branch.title === activeBranch })[0].id

    dispatch({type: LEAVE_BRANCH, branch_id})

    var nextBranch;
    for(var b = 0; b < branches.length; b++) {
      if(branches[b].id !== activeBranchId) {
        nextBranch = branches[b]
        break;
      }
    }

    if(activeBranchId === branch_id) {
      if(nextBranch) {
        pushState(null, `/${nextBranch.title}/general`)
      }
    }

  }
}

// Unread && Read branches
export function markBranchUnread(branch_id) {
  return {
    type: MARK_BRANCH_UNREAD,
    branch_id
  };
}
export function markBranchRead(branch_id) {
  return {
    type: MARK_BRANCH_READ,
    branch_id
  };
}

// Loop to join branch on route load/change
export function waitToJoinBranch() {
  return (dispatch, getState) => {
    const _socket = global.socket;
    const { params } = getState().router;
    const { branches } = getState().branches;

    const activeBranch = branches.filter(branch => branch.title === params.branch_name)[0]

    const { loaded } = getState().branches;

    if(isEmpty(_socket) || !loaded) {
      setTimeout(() => {
        dispatch(waitToJoinBranch())
      }, 500)
    } else {
      if(isEmpty(activeBranch) && !isEmpty(branches)) {
        socket.emit('go to parent', {
          title: params.branch_name
        })
      } else if (isEmpty(branches)) {
        setTimeout(() => {
          dispatch(waitToJoinBranch())
        }, 500)
      } else {
        dispatch(changeActiveBranch(params.branch_name))
      }
    }
  }
}

export function clearBranches() {
  return {
    type: CLEAR_BRANCHES
  };
}