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
    const { user, onboarded } = this.props;
    if(!onboarded) { return; }
    if(user) {
      socket.emit('get parent memberships', {
        user_id: user.id
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { changeActiveFeed, changeActiveBranch } = this.props;
    const { feeds, activeFeed, params } = nextProps;
    if(feeds.length > 0) {
      const feedName = feeds.filter(feed => feed.id === activeFeed)[0].title
      if(!isEmpty(params.feed_name)) {
        if(feedName !== params.feed_name) {
          console.log('need to update the active / current feed')
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
      return membership.feed_id == activeFeed
    })[0]
    let feed = feeds.filter(feed => {
      return feed.id == activeFeed
    })[0]
    let branch = branches.filter(branch => {
      return branch.id == activeBranch
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

