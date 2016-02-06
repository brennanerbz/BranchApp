import { isEmpty } from '../../utils/validation';
import _ from 'lodash';
import cookie from 'react-cookie';

const RECEIVE_MEMBERSHIPS = 'BranchApp/feeds/RECEIVE_MEMBERSHIPS';
const RECEIVE_ALL_FEEDS = 'BranchApp/feeds/RECEIVE_ALL_FEEDS';
const CLIENT_JOINED_FEED = 'BranchApp/feeds/CLIENT_JOINED_FEED';
const SERVER_JOINED_FEED = 'BranchApp/feeds/SERVER_JOINED_FEED';
const NEW_FEED = 'BranchApp/feeds/NEW_FEED';
const NEW_FEED_READONLY = 'BranchApp/feeds/NEW_FEED_READONLY';
const RECEIVE_FEED = 'BranchApp/feeds/RECEIVE_FEED';
const LEAVE_FEED = 'BranchApp/feeds/LEAVE_FEED';
const LEAVE_BRANCH = 'BranchApp/feeds/LEAVE_BRANCH';
const USER_JOINED_FEED = 'BranchApp/feeds/USER_JOINED_FEED';
const USER_LEFT_FEED = 'BranchApp/feeds/USER_LEFT_FEED';
const CHANGE_ACTIVE_FEED = 'BranchApp/feeds/CHANGE_ACTIVE_FEED';
const MARK_FEED_UNREAD = 'BranchApp/feeds/MARK_FEED_UNREAD';
const MARK_FEED_READ = 'BranchApp/feeds/MARK_FEED_READ';
const CLEAR_FEEDS = 'BranchApp/feeds/CLEAR_FEEDS';

const READ_ONLY_ACTIVE = 'BranchApp/feeds/READ_ONLY_ACTIVE';
const MEMBERSHIPS_LOADED = 'BranchApp/feeds/MEMBERSHIPS_LOADED';
const FEEDS_LOADED = 'BranchApp/feeds/FEEDS_LOADED';

const initialState = {
  memberships: [],
  feeds: [],
  activeFeed: null,
  joined: false, // <---- Update the temporary state for joining feed here
  loaded: false,
  feedsLoaded: false // <---- the initialState of feeds have been loaded
};


export default function reducer(state = initialState, action) {
  { /* Variables to be used for multiple cases */}
  let { memberships } = state;
  let { feeds } = state;
  var isNewFeedInState;
  var isNewMembershipInState;

  switch (action.type) {
    case RECEIVE_MEMBERSHIPS:
      let receivedMemberships = [...memberships, ...action.memberships].__findUniqueByKey('id');
      let receivedFeeds = [];
      receivedMemberships
      .filter(membership => { return membership.open })
      .forEach(membership => {
        receivedFeeds.push(membership.feed)
      })
      receivedFeeds = [...feeds, ...receivedFeeds]
      .__findUniqueByKey('id')
      .__alphabetizeList()
      // .__placeItemFirst('title', '#general')
      return {
        ...state,
        memberships: receivedMemberships,
        feeds: receivedFeeds
      }
    case MEMBERSHIPS_LOADED:
      return {
        ...state,
        loaded: true
      }
    case READ_ONLY_ACTIVE:
      return {
        ...state,
        loaded: true
      }
    case RECEIVE_ALL_FEEDS:
      return {
        ...state,
        feeds: action.feeds.length > 0 
        ? [...feeds, ...action.feeds]
        .__findUniqueByKey('id')
        .__alphabetizeList()
        // .__placeItemFirst('title', '#general') 
        : feeds
      }
    case FEEDS_LOADED:
      return {
        ...state,
        loaded: true
      }
    case CLIENT_JOINED_FEED:
      return {
        ...state,
        joined: true
      }
    case SERVER_JOINED_FEED:
      return {
        ...state,
        joined: false
      }
    case NEW_FEED:
      isNewFeedInState = feeds.filter(feed => feed.id === action.feed.id)[0]
      return {
        ...state,
        feeds: !isNewFeedInState 
        ? [...feeds, action.feed]
        .__alphabetizeList() 
        // .__placeItemFirst('title', '#general')
        : feeds
      }
    case RECEIVE_FEED:
      isNewMembershipInState = memberships.filter(membership => membership.id === action.membership.id)[0]
      isNewFeedInState = feeds.filter(feed => feed.id === action.membership.feed.id)[0]
      return {
        ...state,
        memberships: !isNewMembershipInState ? [...memberships, action.membership] : memberships,
        feeds: !isNewFeedInState 
        ? [...feeds, action.membership.feed]
        .__alphabetizeList()
        // .__placeItemFirst('title', '#general') 
        : feeds
      }
    case NEW_FEED_READONLY:
      isNewFeedInState = feeds.filter(feed => feed.id === action.feed.id)[0]
      return {
        ...state,
        feeds: !isNewFeedInState 
        ? [...feeds, action.feed]
        .__alphabetizeList()
        // .__placeItemFirst('title', '#general') 
        : feeds
      }
    case CHANGE_ACTIVE_FEED:
      cookie.save('_lastfeed', action.feed_id, {path: '/'})
      return {
        ...state,
        activeFeed: action.feed_id
      }
    case LEAVE_FEED:
      memberships = memberships.filter(membership => { return membership.feed_id !== action.feed_id })
      feeds = feeds.filter(feed => { return feed.id !== action.feed_id })
      return {
        ...state,
        memberships: memberships,
        feeds: feeds
      }
    case LEAVE_BRANCH:
      return {
        ...state,
        memberships: memberships.filter(membership => { return membership.feed.parent_id !== action.branch_id }),
        feeds: feeds.filter(feed => { return feed.parent_id !== action.branch_id })
      }
    case MARK_FEED_UNREAD:
      feeds = feeds.map(feed => {
        if(feed.id === action.feed_id) {
          feed.unread = true
        }
        return feed;
      })
      return {
        ...state,
        feeds: feeds
      }
    case MARK_FEED_READ:
      return {
        ...state,
        feeds: feeds.map(feed => {
          if(feed.id === action.feed_id) {
            feed.unread = false
          }
          return feed;
        })
      }
    case CLEAR_FEEDS:
      return {
        ...state = initialState,
        memberships: [],
        feeds: [],
        activeFeed: null,
        loaded: true
      }
    default:
      return state;
  }
}

export function activateFeedsReadOnly() {
  return {
    type: READ_ONLY_ACTIVE
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

    const lastBranch = getState().branches.branches.slice(-1)[0];
    const lastMembership = memberships.slice(-1)[0];

    if(lastMembership && lastBranch) {
      if(lastMembership.feed.parent_id === lastBranch.id) {
        dispatch({type: MEMBERSHIPS_LOADED})
      }
    }

    const user = getState().auth.user;
    memberships
    .filter(membership => { return membership.open })
    .forEach(membership => {
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

    const lastBranch = getState().branches.branches.slice(-1)[0];
    const lastFeed = feeds.slice(-1)[0];

    if(lastFeed && lastBranch) {
      if(lastFeed.parent_id === lastBranch.id) {
        dispatch({type: FEEDS_LOADED})
      }
    }

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
    dispatch(changeActiveFeed(membership.feed.title.replace("#", "")))
    const user = getState().auth.user
    socket.emit('get messages', {
      user_id: user.id,
      feed_id: membership.feed_id
    })
    setTimeout(() => {
      dispatch({type: SERVER_JOINED_FEED})
    }, 1000)
  }
}

// socket.on('receive child feed')
export function newFeedReadOnly(feed) {
  return (dispatch, getState) => {
    if(!isEmpty(feed)) {
      dispatch({type: NEW_FEED_READONLY, feed})
      dispatch(changeActiveFeed(feed.title.replace('#', '')))
      socket.emit('get messages', {
        feed_id: feed.id
      })
    }
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
export function leaveFeed(feed_id, branch_id, pushState) {
  return (dispatch, getState) => {

    const feeds = getState().feeds.feeds;
    const branches = getState().branches.branches;
    const activeBranch = getState().branches.activeBranch;
    const activeFeed = getState().feeds.activeFeed;
    const activeFeedId = feeds.filter(feed => { return feed.title.replace('#', "") === activeFeed })[0]

    dispatch({type: LEAVE_FEED, feed_id})

    if(feed_id !== activeFeedId) {
      pushState(null, `/${activeBranch}/general`)
    }
  
  }
}

export function leaveAllFeedsForBranch(branch_id) {
  return {
    type: LEAVE_BRANCH,
    branch_id
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
export function waitToJoinFeed() {
  return (dispatch, getState) => {
    const _socket = global.socket;
    const { branches } = getState().branches;
    const { feeds, memberships } = getState().feeds;

    const { params } = getState().router;

    const isBranchInState = branches.filter(branch => branch.title === params.branch_name)[0]
    const { loaded, feedsLoaded } = getState().feeds;
    if(isEmpty(isBranchInState) || isEmpty(_socket) || !loaded) {
      setTimeout(() => {
        dispatch(waitToJoinFeed())
      }, 500)
    } else {
      const isFeedInState = feeds.filter(feed => {
        return feed.title.replace("#", "") === params.feed_name && feed.parent_id === isBranchInState.id
      })[0];
      let isMembershipForFeed;
      if(isFeedInState) {
        isMembershipForFeed = memberships.filter(membership => membership.feed_id == isFeedInState.id)[0];
      }
      if(isEmpty(isFeedInState) || isEmpty(isMembershipForFeed) || (!isEmpty(isMembershipForFeed) && !isMembershipForFeed.open)) {
        dispatch({type: CLIENT_JOINED_FEED})
        socket.emit('join child', {
          parent_id: isBranchInState.id,
          title: "#" + params.feed_name
        })
      } else {
        dispatch(changeActiveFeed(params.feed_name))
      }
    }
  }
} 

export function clearFeeds() {
  return {
    type: CLEAR_FEEDS
  };
}

export function allFeedsLoaded() {
  return {
    type: FEEDS_LOADED
  }
}


