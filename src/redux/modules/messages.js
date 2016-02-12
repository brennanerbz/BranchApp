import _ from 'lodash';
import moment from 'moment';

export const RECEIVE_MESSAGES = 'BranchApp/messages/RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'BranchApp/messages/RECEIVE_MESSAGE';
export const RECEIVE_VOTE = 'BranchApp/messages/RECEIVE_VOTE';
export const UPDATE_VOTE = 'BranchApp/messages/UPDATE_VOTE';
export const USER_TYPING = 'BranchApp/messages/USER_TYPING';
export const USER_STOP_TYPING = 'BranchApp/messages/USER_STOP_TYPING';

const CLEAR_MESSAGES = 'BranchApp/feeds/CLEAR_MESSAGES';

const initialState = {
	loaded: false,
	unfilteredMessages: [],
	messages: {},
	typers: [],
	loaded: false // <---- the initialState of messages have been loaded
}

export function createMessageList(messages) {
	var list = [];
	var group = [];
	var message, prevMessage;
	var difference;
	for(var i = 0; i < messages.length; i++) {
		message = messages[i]
		// Message groups
		if(i === 0) {
			group.push(message)
		}
		if(i !== 0) {
			difference = moment(message.creation).diff(moment(prevMessage.creation), 'minutes')

			if(message.user_id === prevMessage.user_id && difference < 6) group.push(message)
			else if(message.user_id !== prevMessage.user_id || difference >= 6) {
				list.push(group)
				group = [];
				group.push(message);				
			}
		}
		
		if(i === messages.length - 1) list.push(group)
		prevMessage = message;
		
	}
	return list;
}
export default function reducer(state = initialState, action) {
	let { messages, loaded, typers } = state;
	var isMessageInState;
	var isTyperInState;
	var uniqueBranchFeedId;
	var messageGroups;

	switch(action.type) {
		case RECEIVE_MESSAGES:
			messageGroups = createMessageList(action.messages.__findUniqueByKey('id'));
			var message = action.messages.length > 0 ? action.messages[0] : null;
			uniqueBranchFeedId = message !== null ? message.parent_feed_id + '#' + message.feed_id : null;
			if(uniqueBranchFeedId) {
				messages[uniqueBranchFeedId] = messageGroups
				return {
					...state,
					messages: messages,
					unfilteredMessages: [...state.unfilteredMessages, ...action.messages]
				}
			} else {
				return {
					...state
				}
			}
		case RECEIVE_MESSAGE:
			var newMessage = action.message;
			uniqueBranchFeedId = newMessage.parent_feed_id + '#' + newMessage.feed_id;
			messageGroups = messages[uniqueBranchFeedId] && messages[uniqueBranchFeedId].length > 0 
			? messages[uniqueBranchFeedId]
			.reduce((a, b) => { return a.concat(b) })
			.slice(-50)
			: null
			var newMessageGroups = messageGroups !== null 
			? createMessageList([...messageGroups, newMessage].__findUniqueByKey('id'))
			: createMessageList([...newMessage])
			messages[uniqueBranchFeedId] = newMessageGroups
			return {
				...state,
				messages: messages,
				unfilteredMessages: [...state.unfilteredMessages, action.message]
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
			isTyperInState = typers.filter(t => { return t.user.username === action.typer.user.username })[0]
			return {
				...state,
				typers: !isTyperInState ? [...typers, action.typer] : typers
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

		const { typers } = getState().messages;
		const messageSenderIsTyper = typers.filter(typer => { return typer.user.username === message.user.username })[0]
		const typer = message;
		if(messageSenderIsTyper) {
			dispatch({type: USER_STOP_TYPING, typer})
		}

		// Mark unread state
		const branchName = getState().branches.activeBranch;
		const activeBranch = getState().branches.branches
		.filter(branch => {return branch.title === branchName })[0]

		const feedName = getState().feeds.activeFeed;
		const activeFeed = getState().feeds.feeds
		.filter(feed => { return feed.title.replace('#', "") === feedName && feed.parent_id === activeBranch.id })[0]

		if(activeBranch) {
			if(message.parent_feed_id !== activeBranch.id) {
				dispatch(markBranchUnread(message.parent_feed_id))
			}
		}
		
		if(activeFeed) {
			if(message.feed_id !== activeFeed.id) {
				dispatch(markFeedUnread(message.feed_id))
			}
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

