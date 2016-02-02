
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
  let memberships = state.memberships;
  let feeds = state.feeds;

  switch (action.type) {
    case RECEIVE_MEMBERSHIPS:
      let f = []
      action.memberships.forEach(membership => f.push(membership.feed))
      return {
        ...state,
        memberships: [...state.memberships, ...action.memberships],
        feeds: [...state.feeds, ...f]
      }
    case RECEIVE_ALL_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.feeds]
      }
    case NEW_FEED:
      return {
        ...state,
        feeds: [...state.feeds, action.feed]
      }
    case RECEIVE_FEED:
      return {
        ...state,
        memberships: [...state.memberships, action.membership],
        feeds: [...state.feeds, action.membership.feed]
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





