import { isEmpty } from '../../utils/validation';

const NEW_BRANCH = 'BranchApp/branches/NEW_BRANCH';
const RECEIVE_BRANCHES = 'BranchApp/branches/RECEIVE_BRANCHES';
const LEAVE_BRANCH = 'BranchApp/branches/LEAVE_BRANCH';
const CHANGE_ACTIVE_BRANCH = 'BranchApp/branches/CHANGE_ACTIVE_BRANCH';
const MARK_BRANCH_UNREAD = 'BranchApp/branches/MARK_BRANCH_UNREAD';
const MARK_BRANCH_READ = 'BranchApp/branches/MARK_BRANCH_READ';

const initialState = {
  branchMemberships: [],
  branches: [],
  activeBranch: null
};

export default function reducer(state = initialState, action) {
  { /* Variables to be used for multiple cases */}
  var { branchMemberships } = state;
  var { branches } = state;

  switch (action.type) {
    case NEW_BRANCH:
      let isNewBranchMembershipInState = branchMemberships.filter(membership => {
        return membership.id === action.branch.id
      })[0]
      let isNewBranchInState = branches.filter(branch => {
        return branch.id === action.branch.feed_id
      })[0]
      return {
        ...state, 
        branchMemberships: !isNewBranchMembershipInState ? [action.branch, ...state.branchMemberships] : branchMemberships,
        branches: !isNewBranchInState ? [action.branch.feed, ...state.branches] : branches
      }
    case RECEIVE_BRANCHES:
      let receivedBranchMemberships = action.branches;
      let receivedBranches = [];

      receivedBranchMemberships = receivedBranchMemberships.filter(branch => {
        return branchMemberships.indexOf(branch) == -1;
      })

      receivedBranchMemberships.forEach(branch => {
        receivedBranches.push(branch.feed)
      })

      receivedBranches = receivedBranches.filter(branch => {
        return branches.indexOf(branch) == -1;
      })

      return {
        ...state,
        branchMemberships: [...branchMemberships, ...receivedBranchMemberships],
        branches: [...branches, ...receivedBranches]
      }
    case CHANGE_ACTIVE_BRANCH:
      return {
        ...state,
        activeBranch: action.branch_id
      }
    case LEAVE_BRANCH:
      branchMemberships = branchMemberships.filter(membership => membership.feed_id !== action.branch.id)
      branches = branches.filter(branch => branch.id !== action.branch.id)
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
        })
      }
    case MARK_BRANCH_READ:
      return {
        ...state,
        branches: branches.map(branch => {
          if(branch.id == action.branch_id) {
            branch.unread = false
          }
        })
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
  return {
    type: NEW_BRANCH,
    branch
  };
}

//socket.on('receive parent memberships')
export function receiveBranches(branches) {
  return (dispatch, getState) => {
    dispatch({type: RECEIVE_BRANCHES, branches})
    if(Array.isArray(branches) && branches.length > 0) {
      const user = getState().auth.user
      branches.forEach(branch => {
        socket.emit('get child memberships', {
          user_id: user.id,
          feed_id: branch.feed_id
        })
        socket.emit('get nonmembership feeds', {
          user_id: user.id,
          feed_id: branch.feed_id
        })
      })
    }
  }
}

// socket.on('left parent')
export function leaveBranch(branch) {
  return {
    type: LEAVE_BRANCH,
    branch
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

    const activeBranch = branches.filter(branch => branch.feed.title === params.branch_name)[0]

    if(isEmpty(_socket)) {
      setTimeout(() => {
        dispatch(waitToJoinBranch())
      }, 500)
    } else {
      if(isEmpty(activeBranch)) {
        socket.emit('go to parent', {
          title: params.branch_name
        })
      }
    }
  }
}
