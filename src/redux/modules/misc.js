
const OPEN_MODAL = 'BranchApp/misc/OPEN_MODAL';
const CLOSE_MODAL = 'BranchApp/misc/CLOSE_MODAL';

const initialState = {
  modalOpen: false,
  modalType: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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