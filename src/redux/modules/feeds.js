
const RECEIVE_MEMBERSHIPS = 'BranchApp/feeds/RECEIVE_MEMBERSHIPS';
const RECEIVE_ALL_FEEDS = 'BranchApp/feeds/RECEIVE_ALL_FEEDS';
const NEW_FEED = 'BranchApp/feeds/NEW_FEED';
const RECEIVE_FEED = 'BranchApp/feeds/RECEIVE_FEED';
const LEAVE_FEED = 'BranchApp/feeds/LEAVE_FEED';
const USER_JOINED_FEED = 'BranchApp/feeds/USER_JOINED_FEED';
const USER_LEFT_FEED = 'BranchApp/feeds/USER_LEFT_FEED';

const CHANGE_ACTIVE_FEED = 'BranchApp/feeds/CHANGE_ACTIVE_FEED';

const initialState = {
  loaded: false,
  memberships: [
    {
      id: Math.floor(Math.random() * 10000),
      user_id: 1,
      feed_id: 1,
      alias: '',
      open: true,
      deleted: false,
      creation: Date.now(),
      modified: null
    },
    {
      id: Math.floor(Math.random() * 10000),
      user_id: 1,
      feed_id: 2,
      alias: '',
      open: true,
      deleted: false,
      creation: Date.now(),
      modified: null
    },
    {
      id: Math.floor(Math.random() * 10000),
      user_id: 1,
      feed_id: 3,
      alias: '',
      open: true,
      deleted: false,
      creation: Date.now(),
      modified: null
    }
  ],
  feeds: [
    {
      id: 1,
      parent_id: 1,
      title: 'marketing',
      passcode: null,
      deleted: false,
      creation: Date.now()
    },
    {
      id: 2,
      parent_id: 1,
      title: 'business',
      passcode: null,
      deleted: false,
      creation: Date.now()
    },
    {
      id: 3,
      parent_id: 1,
      title: 'product',
      passcode: null,
      deleted: false,
      creation: Date.now()
    },
    {
      id: 4,
      parent_id: 2,
      title: 'annoucements',
      passcode: null,
      deleted: false,
      creation: Date.now()
    }
  ],
  activeFeed: 1
};

export default function reducer(state = initialState, action) {
  { /* Variables to be used for multiple cases */}
  let loaded = state.loaded,
      memberships = state.memberships,
      feeds = state.feeds;

  switch (action.type) {
    case RECEIVE_MEMBERSHIPS:
      let f = []
      action.memberships.forEach(membership => f.push(membership.feed))
      return {
        ...state,
        memberships: action.memberships,
        feeds: f
      }
    case RECEIVE_ALL_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, action.feeds],
        loaded: true
      }
    case NEW_FEED:
      feeds.push(action.feed)
      return {
        ...state,
        feeds: feeds
      }
    case RECEIVE_FEED:
      memberships.push(action.membership)
      feeds.push(action.membership.feed)
      return {
        ...state,
        memberships: memberships,
        feeds: feeds
      }
    case CHANGE_ACTIVE_FEED:
      return {
        ...state,
        activeFeed: action.feed_id,
      }
    case LEAVE_FEED:
      memberships = memberships.filter(membership => membership.feed.id !== action.id)
      feeds = feeds.filter(feed => feed.id !== action.id)
      return {
        ...state,
        memberships: memberships,
        feeds: feeds
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
  return {
    type: RECEIVE_MEMBERSHIPS,
    memberships
  }
}

// socket.on('receive nonmembership feeds')
export function receiveAllFeeds(feeds) {
  return {
    type: RECEIVE_ALL_FEEDS,
    feeds: feeds
  }
}

// socket.on('new feed')
export function newFeed(membership) {
  return {
    type: NEW_FEED,
    feed: membership.feed
  };
}

// socket.on('receive child membership')
export function receiveFeed(membership) {
  return {
    type: RECEIVE_FEED,
    membership
  };
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





