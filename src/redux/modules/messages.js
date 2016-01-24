export const RECEIVE_MESSAGES = 'BranchApp/messages/RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'BranchApp/messages/RECEIVE_MESSAGE';
export const RECEIVE_VOTE = 'BranchApp/messages/RECEIVE_VOTE';

const initialState = {
	loaded: false,
	messages: []
}

export default function reducer(state = initialState, action) {
	let { messages, loaded } = state;

	switch(action.type) {
		case RECEIVE_MESSAGES:
			messages.concat(action.messages)
			return {
				...state,
				messages: messages
			}
		case RECEIVE_MESSAGE:
			return {
				...state,
				messages: [...state.messages, action.message]
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
	return {
		type: RECEIVE_MESSAGE,
		message
	}
}

// socket.on('receive vote')
export function receiveVote(vote) {
	return {
		type: RECEIVE_VOTE,
		vote
	}
}