import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import { isEmpty } from '../../utils/validation';

/* Config */
import config from '../../config';
/* Helpers */
import connectData from 'helpers/connectData';

/* Components */
import Header from '../../components/ChatHeader/ChatHeader';
import Footer from '../../components/ChatFooter/ChatFooter';
import Navigation from '../Navigation/Navigation';
import Feed from '../Feed/Feed';

// Reducer actions
import * as branchActions from '../../redux/modules/branches';
import * as feedActions from '../../redux/modules/feeds';

// when the chat container is mounted, we want to set up listeners for the events that will take place. each of the listeners will have corresponding redux function and state.

// function fetchData(getState, dispatch) {
  // for the initial load, we want to get all memberships, feeds and messages for the active feed
// }

// @connectData(fetchData)

@connect(
  state => ({
    onboarded: state.user.onboarded,
    user: state.auth.user,
    branchMemberships: state.branches.branchMemberships,
    branches: state.branches.branches,
    memberships: state.feeds.memberships,
    feeds: state.feeds.feeds,
    activeBranch: state.branches.activeBranch,
    activeFeed: state.feeds.activeFeed
  }),
  dispatch => ({
    ...bindActionCreators({
      ...branchActions,
      ...feedActions,
      pushState
    }, dispatch)
  })
)
export default class Chat extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  state = {

  }

  componentWillMount() {
  }

  componentDidMount() {
    const { user, onboarded, branches, branchMemberships, feeds, memberships, changeActiveFeed, changeActiveBranch, params, pushState } = this.props;
    this.handleRouting(branches, feeds, changeActiveBranch, changeActiveFeed, params)
    this.handleActiveChat(branches, branchMemberships, feeds, memberships, params, true, true)
  }

  componentWillReceiveProps(nextProps) {
    const { changeActiveFeed, changeActiveBranch } = this.props;
    const { branches, branchMemberships, activeBranch, feeds, memberships, activeFeed, params } = nextProps;
    if((!this.props.user && nextProps.user) || (this.props.user && !nextProps.user)) {
    } else {
      this.handleRouting(branches, feeds, params)
    }

    const branchRouteChanged = this.props.params.branch_name !== nextProps.params.branch_name;
    const feedRouteChanged = this.props.params.feed_name !== nextProps.params.feed_name;

    if(feedRouteChanged && branchRouteChanged) {
      this.handleActiveChat(branches, branchMemberships, feeds, memberships, params, true, true)
    } else if(branchRouteChanged) {
      this.handleActiveChat(branches, branchMemberships, feeds, memberships, params, true, false)
    } else if(feedRouteChanged) {
      this.handleActiveChat(branches, branchMemberships, feeds, memberships, params, false, true)
    }
  }

  handleActiveChat(branches, branchMemberships, feeds, memberships, params, updateBranch, updateFeed) {
    const { changeActiveBranch, changeActiveFeed } = this.props;
    const _socket = global.socket;

    const activeBranch = branches.filter(branch => branch.title === params.branch_name)[0]
    if(updateBranch) {
      const nextBranch = params.branch_name;
      const isBranchInState = activeBranch;
      // <---- Update the activeBranch here
      if(!isBranchInState) {
        if(_socket) {
          socket.emit('go to parent', { title: nextBranch })
        } else {
          this.props.waitToJoinBranch()
        }
      }
      changeActiveBranch(nextBranch)
    }

    if(updateFeed) {
      const nextFeed = params.feed_name;
      const isFeedInState = feeds.filter(feed => {
        return feed.title.replace("#", "") == nextFeed && feed.parent_id === activeBranch.id
      })[0];
      let isFeedMembership;
      if(isFeedInState) {
        isFeedMembership = memberships.filter(mem => mem.feed_id == isFeedInState.id)[0];
      }
      // <---- Update the activeFeed here
      if(!isFeedInState || !isFeedMembership) {
        if(_socket && activeBranch) {
          socket.emit('join child', {
            parent_id: activeBranch.id,
            title: "#" + nextFeed
          })
        } else {
          this.props.waitToJoinFeed()
        }
      }
      changeActiveFeed(nextFeed)
    }   
  }
 
  handleRouting(branches, feeds, params) {
    const { pushState } = this.props;
    if(Object.keys(params).length === 0 || isEmpty(params)) {
      let nextBranch;
      let nextFeed;
      let nextFeeds;
      if(branches.length > 0) {
        nextBranch = branches[0];
        nextFeeds = feeds.filter(feed => feed.parent_id === nextBranch.id)
        if(nextFeeds.length > 0) {
          nextFeed = nextFeeds[0];
          if(nextFeed) {
            pushState(null, `/${nextBranch.title}/${nextFeed.title.replace("#", "")}`)
          } else {
            pushState(null, `/${nextBranch.title}/general`)
          }
        } 
        else {
            pushState(null, `/${nextBranch.title}/general`)
        }
      }
    } else {
      if(params.branch_name) {
        if(!params.feed_name) {
          pushState(null, `/${params.branch_name}/general`)
        }
      } 
    }
  }

  render() {
    const { 
      user, 
      appHeight, 
      appWidth, 
      branches, 
      feeds, 
      memberships,
      activeBranch, 
      activeFeed } = this.props,
    style = require('./Chat.scss');
    let membership = memberships.filter(membership => {
      return membership.feed.title.replace("#", "") === activeFeed
    })[0]
    let feed = feeds.filter(feed => {
      return feed.title.replace("#", "") === activeFeed
    })[0]
    let branch = branches.filter(branch => {
      return branch.title === activeBranch
    })[0]
    return (
      <div id={style.chat}>
        <Header
          user={user}
          feed={feed}
          branch={branch}
          membership={membership}
        />
        <div 
          id={style.chat_body} 
          className="flex_vertical flex_spacer">
          <section className="flex_horizontal flex_spacer">
            <Navigation
              user={user}
              appHeight={appHeight}
              appWidth={appWidth}
              branches={branches}
              memberships={memberships}
              feeds={feeds}
              activeBranch={activeBranch}
              activeFeed={activeFeed}
            />
            <Feed
              user={user}
              appHeight={appHeight}
              appWidth={appWidth}
              activeBranch={activeBranch}
              activeFeed={activeFeed}
              feed={feed}
              branch={branch}
              membership={membership}
            />
          </section>
        </div>
        <Footer
          user={user}
          activeFeed={activeFeed}
          feed={feed}
          branch={branch}
          membership={membership}
        />
      </div>
    );
  }
}

