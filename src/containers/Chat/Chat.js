import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import { isEmpty } from '../../utils/validation';
import $ from 'jquery';
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
    location: state.router.location,
    pathname: state.router.location.pathname,
    params: state.router.params,
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
    $('body').addClass('chat')
    const { user, 
            onboarded, 
            branches, 
            branchMemberships, 
            feeds, 
            memberships, 
            changeActiveFeed, 
            changeActiveBranch, 
            params, 
            pathname,
            pushState } = this.props;
    if(pathname !== '/signup' && pathname !== '/login') {
      this.handleRouting(branches, feeds, params)
    }
    this.handleActiveChat(branches, branchMemberships, feeds, memberships, params, true, true)

    if(!global.socket) this.props.loadSocket()
  }

  componentWillReceiveProps(nextProps) {
    const { changeActiveFeed, changeActiveBranch } = this.props;
    const { branches, 
            branchMemberships, 
            activeBranch, 
            feeds, 
            memberships, 
            activeFeed, 
            params, 
            pathname,
            user } = nextProps;

    if(this.props.branches.length > 0 && branches.length === 0) {
      cookie.remove('_lastbranch', { path: '/'});
      cookie.remove('_lastfeed', { path: '/'});
      if(user) {
        this.props.pushState(null, '/')
      }
    }

    if((!this.props.user && nextProps.user) || (this.props.user && !nextProps.user)) {
    } else {
      if(pathname !== '/signup' && pathname !== '/login') {
        this.handleRouting(branches, feeds, nextProps.params)
      }
    }

    const branchRouteChanged = this.props.params.branch_name !== nextProps.params.branch_name;
    const feedRouteChanged = this.props.params.feed_name !== nextProps.params.feed_name;

    if(feedRouteChanged || branchRouteChanged) {
      this.handleActiveChat(branches, branchMemberships, feeds, memberships, params, true, true)
    }

  }

  handleActiveChat(branches, branchMemberships, feeds, memberships, params, updateBranch, updateFeed) {
    const { changeActiveBranch, changeActiveFeed } = this.props;
    if(updateBranch) {
      this.props.waitToJoinBranch()
    }

    if(updateFeed) {
      this.props.waitToJoinFeed()      
    }   
  }
 
  handleRouting(branches, feeds, params) {
    const { pushState, pathname } = this.props;
    if(pathname !== '/signup' && pathname !== '/login') {
      if(Object.keys(params).length === 0 || isEmpty(params)) {
        let recentBranch = cookie.load('_lastbranch', { path: '/'});
        let recentFeed = cookie.load('_lastfeed', { path: '/'});
        if(recentBranch && recentFeed) {
          pushState(null, `/${recentBranch}/${recentFeed}`)
          return;
        }
        if(recentBranch && !recentFeed) {
          pushState(null, `/${recentBranch}/general`)
          return;
        }
        if(!recentBranch && !recentFeed) {
          if(branches.length > 0) {
            const nextBranch = branches[0]
            const nextFeed = feeds.filter(feed => { return feed.parent_id === nextBranch.id })[0]
            if(nextFeed) {
              pushState(null, `/${nextBranch.title}/${nextFeed.title.replace("#", "")}`)           
            } else {
              pushState(null, `/${nextBranch.title}/general`)
            }
          }
        }
      } else {
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
    let branch = branches.filter(branch => {
      return branch.title === activeBranch
    })[0]
    let feed = branch ? feeds.filter(feed => {
      return feed.title
      .replace("#", "") === activeFeed && feed.parent_id === branch.id
    })[0] : null
    let membership = feed ? memberships.filter(membership => {
      return membership.feed.title
      .replace("#", "") === activeFeed && membership.feed.parent_id === branch.id
    })[0] : null
    // console.log('-----')
    // console.log('branch: ', branch)
    // console.log('feed: ', feed)
    // console.log('membership: ', membership)
    // console.log('-----')
    return (
      <div id={style.chat}>
        <Header
          user={user}
          feed={feed}
          branch={branch}
          membership={membership}
          pushState={this.props.pushState}
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

