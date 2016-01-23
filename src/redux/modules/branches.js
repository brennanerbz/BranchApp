
const NEW_BRANCH = 'BranchApp/branches/NEW_BRANCH';
const RECEIVE_BRANCHES = 'BranchApp/branches/RECEIVE_BRANCHES';
const LEAVE_BRANCH = 'BranchApp/branches/LEAVE_BRANCH';
const CHANGE_ACTIVE_BRANCH = 'BranchApp/branches/CHANGE_ACTIVE_BRANCH';

const initialState = {
  loaded: false,
  branches: [
    {
      id: 1,
      parent_id: null,
      title: 'Facebook',
      passcode: null,
      deleted: false,
      creation: Date.now()
    },
    {
      id: 2,
      parent_id: null,
      title: 'Twitter',
      passcode: null,
      deleted: false,
      creation: Date.now()
    }
  ],
  activeBranch: 1
};


export default function reducer(state = initialState, action) {
  { /* Variables to be used for multiple cases */}
  let loaded = state.loaded,
      branches = state.branches;

  switch (action.type) {
    case NEW_BRANCH:
      branches.push(action.branch)
      return {
        ...state,
        branches: branches
      }
    case RECEIVE_BRANCHES:
      return {
        ...state,
        branches: action.branches,
        loaded: true
      }
    case CHANGE_ACTIVE_BRANCH:
      return {
        ...state,
        activeBranch: action.branch_id
      }
    case LEAVE_BRANCH:
      branches = branches.filter(branch => branch.id !== action.branch.id)
      return {
        ...state,
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
    branch: branch
  };
}

//socket.on('receive parent memberships')
export function receiveBranches(branches) {
  return {
    type: RECEIVE_BRANCHES,
    branches: branches
  }
}

// socket.on('left parent')
export function leaveBranch(branch) {
  return {
    type: LEAVE_BRANCH,
    branch: branch
  }
}

