
const NEW_BRANCH = 'BranchApp/branches/NEW_BRANCH';
const RECEIVE_BRANCHES = 'BranchApp/branches/RECEIVE_BRANCHES';
const LEAVE_BRANCH = 'BranchApp/branches/LEAVE_BRANCH';
const CHANGE_ACTIVE_BRANCH = 'BranchApp/branches/CHANGE_ACTIVE_BRANCH';

const initialState = {
  branchMemberships: [],
  branches: [],
  activeBranch: null
};

export default function reducer(state = initialState, action) {
  { /* Variables to be used for multiple cases */}
  let branchMemberships = state.branchMemberships;
  let branches = state.branches;

  switch (action.type) {
    case NEW_BRANCH:
      return {
        ...state,
        branchMemberships: [...state.branchMemberships, action.branch],
        branches: [...state.branches, action.branch.feed]
      }
    case RECEIVE_BRANCHES:
      let b = [];
      action.branches.forEach(branch => {
        b.push(branch.feed)
      })
      return {
        ...state,
        branchMemberships: [...state.branchMemberships, ...action.branches],
        branches: [...state.branches, ...b]
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

// socket.on('receive parent')
export function newBranch(branch) {
  return {
    type: NEW_BRANCH,
    branch
  };
}

//socket.on('receive parent memberships')
export function receiveBranches(branches) {
  return {
    type: RECEIVE_BRANCHES,
    branches
  }
}

// socket.on('left parent')
export function leaveBranch(branch) {
  return {
    type: LEAVE_BRANCH,
    branch
  }
}

