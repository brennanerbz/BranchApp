export const RECEIVE_MESSAGES = 'BranchApp/messages/RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'BranchApp/messages/RECEIVE_MESSAGE';
export const RECEIVE_VOTE = 'BranchApp/messages/RECEIVE_VOTE';
export const USER_TYPING = 'BranchApp/messages/USER_TYPING';
export const USER_STOP_TYPING = 'BranchApp/messages/USER_STOP_TYPING';

const initialState = {
	loaded: false,
	messages: [],
	typers: []
}

export default function reducer(state = initialState, action) {
	let { messages, loaded } = state;

	switch(action.type) {
		case RECEIVE_MESSAGES:
			let receivedMessages = action.messages.filter(message => {
				return messages.indexOf(message) == -1
			})
			return {
				...state,
				messages: [...messages, ...receivedMessages]
			}
		case RECEIVE_MESSAGE:
			let isMessageInState = messages.filter(message => message.id == action.message.id)[0]
			return {
				...state,
				messages: !isMessageInState ? [...state.messages, action.message] : messages
			}
		case RECEIVE_VOTE:
			messages = messages.map(message => {
				if(message.id == action.vote.message_id) {
					if(action.vote.vote) {
						message.positives += 1
					} else if(!action.vote.vote) {
						message.negatives += 1
					}
				}
			})
			return {
				...state,
				messages: messages
			}
		case USER_TYPING:
			return {
				...state,
				typers: [...state.typers, action.typer]
			}
		case USER_STOP_TYPING:
			return {
				state,
				typers: state.typers.filter(typer => typer.username !== action.typer.username)
			}
		default:
			return state;
	}
}


// socket.on('receive messages')
export function receiveMessages(messages) {
	return {
		type: RECEIVE_MESSAGES,
		messages
	}
}

// socket.on('receive message')
export function receiveMessage(message) {
	return (dispatch, getState) => {
		dispatch({type: RECEIVE_MESSAGE, message})

		// Mark unread state
		const activeBranch = getState().branches.activeBranch;
		const activeFeed = getState().feeds.activeFeed;
		if(message.parent_id !== activeBranch) {
			dispatch(markBranchUnread(message.parent_id))
		}
		if(message.feed_id !== activeFeed) {
			dispatch(markFeedUnread(message.feed_id))
		}
	}
}

// socket.on('receive vote')
export function receiveVote(vote) {
	return {
		type: RECEIVE_VOTE,
		vote
	}
}

// socket.on('user typing') && a timeout to remove typer from list 
export function userTyping(typer) {
	return (dispatch, getState) => {
		dispatch({type: USER_TYPING, typer})
		setTimeout(() => {
			dispatch(userStopTyping(typer))
		}, 4000)
	}
}
export function userStopTyping(typer) {
	return {
		type: USER_STOP_TYPING,
		typer
	}
}
