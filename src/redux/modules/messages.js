import _ from 'lodash';

export const RECEIVE_MESSAGES = 'BranchApp/messages/RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'BranchApp/messages/RECEIVE_MESSAGE';
export const RECEIVE_VOTE = 'BranchApp/messages/RECEIVE_VOTE';
export const UPDATE_VOTE = 'BranchApp/messages/UPDATE_VOTE';
export const USER_TYPING = 'BranchApp/messages/USER_TYPING';
export const USER_STOP_TYPING = 'BranchApp/messages/USER_STOP_TYPING';

const CLEAR_MESSAGES = 'BranchApp/feeds/CLEAR_MESSAGES';

const initialState = {
	loaded: false,
	messages: [],
	typers: [],
	loaded: false // <---- the initialState of messages have been loaded
}

export default function reducer(state = initialState, action) {
	let { messages, loaded, typers } = state;
	var isMessageInState;

	switch(action.type) {
		case RECEIVE_MESSAGES:
			return {
				...state,
				messages: [...messages, ...action.messages].__findUniqueByKey('id')
			}
		case RECEIVE_MESSAGE:
			isMessageInState = messages.filter(m => { return m.id === action.message.id })[0]
			return {
				...state,
				messages: !isMessageInState ? [...messages, action.message] : messages
			}
		case RECEIVE_VOTE:
			return {
				...state,
				messages: messages.map(message => {
							if(message.id === action.vote.message_id) {
								message.votes = [...message.votes, action.vote]
							}
							return message;
						})
			}
		case UPDATE_VOTE:
			var message, vote;
			for (var m = 0; m < messages.length; m++) {
				message = messages[m];
				for (var v = 0; v < message.votes.length; v++) {
					vote = message.votes[v];
					if(vote.id === action.vote.id) {
						messages[m].votes[v] = action.vote
					}
				}
			}
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
				...state,
				typers: typers.filter(typer => { return typer.user.username !== action.typer.user.username })
			}
		case CLEAR_MESSAGES:
		  return {
		    ...state = initialState,
		    messages: [],
		    typers: []
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
import { markFeedUnread } from './feeds';
import { markBranchUnread } from './branches';
export function receiveMessage(message) {
	return (dispatch, getState) => {
		dispatch({type: RECEIVE_MESSAGE, message})

		// Mark unread state
		const branchName = getState().branches.activeBranch;
		const activeBranch = getState().branches.branches
		.filter(branch => branch.title === branchName)[0]

		const feedName = getState().feeds.activeFeed;
		const activeFeed = getState().feeds.feeds
		.filter(feed => feed.title.replace('#', "") === feedName && feed.parent_id === activeBranch.id)[0]

		if(message.parent_feed_id !== activeBranch.id) {
			dispatch(markBranchUnread(message.parent_feed_id))
		}
		if(message.feed_id !== activeFeed.id) {
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
// socket.on('update vote')
export function updateVote(vote) {
	return {
		type: UPDATE_VOTE,
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


export function clearMessages() {
  return {
    type: CLEAR_MESSAGES
  };
}

