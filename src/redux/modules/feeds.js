import { isEmpty } from '../../utils/validation';

const RECEIVE_MEMBERSHIPS = 'BranchApp/feeds/RECEIVE_MEMBERSHIPS';
const RECEIVE_ALL_FEEDS = 'BranchApp/feeds/RECEIVE_ALL_FEEDS';
const NEW_FEED = 'BranchApp/feeds/NEW_FEED';
const RECEIVE_FEED = 'BranchApp/feeds/RECEIVE_FEED';
const LEAVE_FEED = 'BranchApp/feeds/LEAVE_FEED';
const USER_JOINED_FEED = 'BranchApp/feeds/USER_JOINED_FEED';
const USER_LEFT_FEED = 'BranchApp/feeds/USER_LEFT_FEED';

const CHANGE_ACTIVE_FEED = 'BranchApp/feeds/CHANGE_ACTIVE_FEED';

const MARK_FEED_UNREAD = 'BranchApp/feeds/MARK_FEED_UNREAD';
const MARK_FEED_READ = 'BranchApp/feeds/MARK_FEED_READ';

const initialState = {
  memberships: [],
  feeds: [],
  activeFeed: null
};

export default function reducer(state = initialState, action) {
  { /* Variables to be used for multiple cases */}
  let { memberships } = state;
  let { feeds } = state;
  var isNewFeedInState;

  switch (action.type) {
    case RECEIVE_MEMBERSHIPS:
      let receivedFeedMemberships = action.memberships;
      let receivedFeeds = [];

      receivedFeedMemberships = receivedFeedMemberships.filter(membership => {
        return memberships.indexOf(membership) == -1;
      })

      receivedFeedMemberships.forEach(membership => {
        receivedFeeds.push(membership.feed)
      })

      receivedFeeds = receivedFeeds.filter(feed => {
        return feeds.indexOf(feed) == -1;
      })

      return {
        ...state,
        memberships: [...memberships, ...receivedFeedMemberships],
        feeds: [...feeds, ...receivedFeeds]
      }
    case RECEIVE_ALL_FEEDS:
      let allFeeds = action.feeds.filter(feed => {
        return feeds.indexOf(feed) == -1;
      })
      return {
        ...state,
        feeds: [...feeds, ...action.feeds]
      }
    case NEW_FEED:
      isNewFeedInState = feeds.filter(feed => {
        return feed.id === action.feed.id
      })[0]
      return {
        ...state,
        feeds: !isNewFeedInState ? [...state.feeds, action.feed] : feeds
      }
    case RECEIVE_FEED:
      let isNewMembershipInState = memberships.filter(membership => {
        return membership.id === action.membership.feed_id
      })[0]
      isNewFeedInState = feeds.filter(feed => {
        return feed.id === action.membership.feed_id
      })[0]
      return {
        ...state,
        memberships: !isNewMembershipInState ? [...state.memberships, action.membership]: memberships,
        feeds: !isNewFeedInState ? [...state.feeds, action.membership.feed] : feeds
      }
    case CHANGE_ACTIVE_FEED:
      return {
        ...state,
        activeFeed: action.feed_id
      }
    case LEAVE_FEED:
      memberships = memberships.filter(membership => membership.feed_id !== action.feed_id)
      feeds = feeds.filter(feed => feed.id !== action.feed_id)
      return {
        ...state,
        memberships: memberships,
        feeds: feeds
      }
    case MARK_FEED_UNREAD:
      return {
        ...state,
        feeds: feeds.map(feed => {
          if(feed.id === action.feed_id) {
            feed.unread = true
          }
        })
      }
    case MARK_FEED_READ:
      return {
        ...state,
        feeds: feeds.map(feed => {
          if(feed.id === action.feed_id) {
            feed.unread = false
          }
        })
      }
    default:
      return state;
  }
}

// Change the active feed
export function changeActiveFeed(feed_id) {
  return {
    type: CHANGE_ACTIVE_FEED,
    feed_id
  }
}


//socket.on('receive child memberships')
export function receiveMemberships(memberships) {
  return (dispatch, getState) => {
    dispatch({type: RECEIVE_MEMBERSHIPS, memberships})
    const user = getState().auth.user;
    memberships.forEach(membership => {
      socket.emit('get messages', {
        feed_id: membership.feed_id
      })
    })
  }
}

// socket.on('receive nonmembership feeds')
export function receiveAllFeeds(feeds) {
  return (dispatch, getState) => {
    dispatch({type: RECEIVE_ALL_FEEDS, feeds})
    const user = getState().auth.user;
    feeds.forEach(feed => {
      socket.emit('get messages', {
        feed_id: feed.id
      })
    })
  }
}

// socket.on('new feed')
export function newFeed(feed) {
  return {
    type: NEW_FEED,
    feed
  };
}

// socket.on('receive child membership')
export function receiveFeed(membership) {
  return (dispatch, getState) => {
    dispatch({type: RECEIVE_FEED, membership})
    const user = getState().auth.user
    socket.emit('get messages', {
      user_id: user.id,
      feed_id: membership.feed_id
    })
  }
}

// socket.on('user joined')
export function userJoinedFeed(membership) {
  return {
    type: USER_JOINED_FEED,
    membership
  };
}

// socket.emit('leave child')
export function leaveFeed(feed_id) {
  return {
    type: LEAVE_FEED,
    feed_id
  }
}

// socket.on('user left child')
export function userLeftFeed(membership) {
  return {
    type: USER_LEFT_FEED,
    membership
  };
}

// Unread && Read Feeds
export function markFeedUnread(feed_id) {
  return {
    type: MARK_FEED_UNREAD,
    feed_id
  };
}

export function markFeedRead(feed_id) {
  return {
    type: MARK_FEED_READ,
    feed_id
  };
}


// Loop to join feed on route change / load
export function waitToJoinChild() {
  return (dispatch, getState) => {
    const _socket = global.socket;
    const { branches } = getState().branches;
    const { feeds } = getState().feeds;

    const { params } = getState().router;
    console.log('waiting to join', params.branch_name, params.feed_name)

    const isBranchInState = branches.filter(branch => branch.title === params.branch_name)[0]
    const isFeedInState = feeds.filter(feed => {
      return feed.title.replace("#", "") === params.feed_name && feed.parent_id === isBranchInState.id
    })[0];

    if(isEmpty(isBranchInState) || isEmpty(_socket)) {
      setTimeout(() => {
        dispatch(waitToJoinChild())
      }, 500)
    } else if(isEmpty(isFeedInState)) {
      console.log('joining child', params.feed_name)
      socket.emit('join child', {
        parent_id: isBranchInState.id,
        title: "#" + params.feed_name
      })
      return;
    }
  }
} 



