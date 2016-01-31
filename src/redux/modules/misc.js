
const APP_MOUNTED = 'BranchApp/misc/APP_MOUNTED';
// Modals
const OPEN_MODAL = 'BranchApp/misc/OPEN_MODAL';
const CLOSE_MODAL = 'BranchApp/misc/CLOSE_MODAL';
// Popovers
const OPEN_POPOVER = 'BranchApp/misc/OPEN_POPOVER';
const CLOSE_POPOVER = 'BranchApp/misc/CLOSE_POPOVER';

const initialState = {
  appMounted: false,
  modalOpen: false,
  modalType: '',
  popoverOpen: false,
  popoverType: '',
  targetComponent: ''
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
    case OPEN_POPOVER:
      return {
        ...state,
        popoverOpen: true,
        popoverType: action.popoverType,
        targetComponent: action.targetComponent
      }
    case CLOSE_POPOVER:
      return {
        ...state,
        popoverOpen: false,
        popoverType: '',
        targetComponent: ''
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


// Open a global popover
export function openPopover(popoverType, targetComponent) {
  return {
    type: OPEN_POPOVER,
    popoverType,
    targetComponent
  }
}

// Close a global popover
export function closePopover() {
  return {
    type: CLOSE_POPOVER
  }
}


