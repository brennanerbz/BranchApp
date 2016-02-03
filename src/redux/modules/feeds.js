import { isEmpty } from '../../utils/validation';
import _ from 'lodash';

const RECEIVE_MEMBERSHIPS = 'BranchApp/feeds/RECEIVE_MEMBERSHIPS';
const RECEIVE_ALL_FEEDS = 'BranchApp/feeds/RECEIVE_ALL_FEEDS';
const CLIENT_JOINED_FEED = 'BranchApp/feeds/CLIENT_JOINED_FEED';
const SERVER_JOINED_FEED = 'BranchApp/feeds/SERVER_JOINED_FEED';
const NEW_FEED = 'BranchApp/feeds/NEW_FEED';
const RECEIVE_FEED = 'BranchApp/feeds/RECEIVE_FEED';
const LEAVE_FEED = 'BranchApp/feeds/LEAVE_FEED';
const USER_JOINED_FEED = 'BranchApp/feeds/USER_JOINED_FEED';
const USER_LEFT_FEED = 'BranchApp/feeds/USER_LEFT_FEED';
const CHANGE_ACTIVE_FEED = 'BranchApp/feeds/CHANGE_ACTIVE_FEED';
const MARK_FEED_UNREAD = 'BranchApp/feeds/MARK_FEED_UNREAD';
const MARK_FEED_READ = 'BranchApp/feeds/MARK_FEED_READ';
const CLEAR_FEEDS = 'BranchApp/feeds/CLEAR_FEEDS';

const MEMBERSHIPS_LOADED = 'BranchApp/feeds/MEMBERSHIPS_LOADED';
const FEEDS_LOADED = 'BranchApp/feeds/FEEDS_LOADED';

const initialState = {
  memberships: [],
  feeds: [],
  activeFeed: null,
  joined: false, // <---- Update the temporary state for joining feed here
  membershipsLoaded: false,
  feedsLoaded: false // <---- the initialState of feeds have been loaded
};

Array.prototype.__alphabetizeList = function() {
  const alphabetical = function (a, b) {
    var first = a.title.replace("#").toLowerCase()
    var second = b.title.replace("#").toLowerCase()
    if(first < second) return -1;
    else if(first > second) return 1;
    else return 0;
  }
  return this.sort(alphabetical)
}

Array.prototype.__uniqueShallow = function() {
  var seen = new Set;
  return this.filter(function(item, i){
    if (!seen.has(item)) {
      seen.add(item);
      return true;
    }
  });
}

Array.prototype.__findUniqueByKey = function(key) {
  var keyList = [];
  for(var l = 0; l < this.length; l++) {
    keyList.push(this[l][key])
  }
  var uniqueKeys = [];
  var unique = [];
  for (var i = 0; i < keyList.length; i++) {
    if(uniqueKeys.indexOf(keyList[i]) === -1) {
      uniqueKeys.push(keyList[i])
      unique.push(this[i])
    }
  }
  return unique;
}


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
      receivedMemberships.forEach(membership => {
        receivedFeeds.push(membership.feed)
      })
      receivedFeeds = [...feeds, ...receivedFeeds].__findUniqueByKey('id')
      return {
        ...state,
        memberships: receivedMemberships,
        feeds: receivedFeeds.__alphabetizeList()
      }
    case MEMBERSHIPS_LOADED:
      return {
        ...state,
        membershipsLoaded: true
      }
    case RECEIVE_ALL_FEEDS:
      return {
        ...state,
        feeds: [...feeds, ...action.feeds].__findUniqueByKey('id').__alphabetizeList()
      }
    case FEEDS_LOADED:
      return {
        ...state,
        feedsLoaded: true
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
        feeds: !isNewFeedInState ? [...feeds, action.feed].__alphabetizeList() : feeds
      }
    case RECEIVE_FEED:
      isNewMembershipInState = memberships.filter(membership => membership.id === action.membership.id)[0]
      isNewFeedInState = feeds.filter(feed => feed.id === action.membership.feed.id)[0]
      return {
        ...state,
        memberships: !isNewMembershipInState ? [...memberships, action.membership] : memberships,
        feeds: !isNewFeedInState ? [...feeds, action.feed].__alphabetizeList() : feeds
      }
    case CHANGE_ACTIVE_FEED:
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
        membershipsLoaded: false,
        feedsLoaded: false
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

    const lastBranch = getState().branches.branches.slice(-1)[0];
    const lastMembership = memberships.slice(-1)[0];

    if(lastMembership && lastBranch) {
      if(lastMembership.feed.parent_id === lastBranch.id) {
        dispatch({type: MEMBERSHIPS_LOADED})
      }
    }

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
    const user = getState().auth.user
    socket.emit('get messages', {
      user_id: user.id,
      feed_id: membership.feed_id
    })
    setTimeout(() => {
      dispatch({type: SERVER_JOINED_FEED})
      __JOINED__ = false;
    }, 1000)
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
global.__JOINED__ = false;
export function waitToJoinFeed() {
  return (dispatch, getState) => {
    const _socket = global.socket;
    const { branches } = getState().branches;
    const { feeds, memberships } = getState().feeds;

    const { params } = getState().router;

    const isBranchInState = branches.filter(branch => branch.title === params.branch_name)[0]
    const { membershipsLoaded, feedsLoaded } = getState().feeds;
    if(isEmpty(isBranchInState) || isEmpty(_socket) || (!feedsLoaded)) {
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
      if(isEmpty(isFeedInState) || isEmpty(isMembershipForFeed) && !__JOINED__) {
        dispatch({type: CLIENT_JOINED_FEED})
        __JOINED__ = true;
        console.log('join feed')
        socket.emit('join child', {
          parent_id: isBranchInState.id,
          title: "#" + params.feed_name
        })
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


