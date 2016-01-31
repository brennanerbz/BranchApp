
const APP_MOUNTED = 'BranchApp/misc/APP_MOUNTED';
const OPEN_MODAL = 'BranchApp/misc/OPEN_MODAL';
const CLOSE_MODAL = 'BranchApp/misc/CLOSE_MODAL';

const initialState = {
  appMounted: false,
  modalOpen: false,
  modalType: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case APP_MOUNTED:
      return {
        ...state,
        appMounted: true
      }
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
        modalType: action.modalType
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
        modalType: ''
      }
    default:
      return state;
  }
}

// Is the app mounted?
export function appMounted() {
  return {
    type: APP_MOUNTED
  }
}


// Open a global modal
export function openModal(modalType) {
  return {
    type: OPEN_MODAL,
    modalType
  }
}

// Close a global modal
export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}