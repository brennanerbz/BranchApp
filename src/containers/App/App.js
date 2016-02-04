import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, loadAuthCookie, loadAuth } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import io from 'socket.io-client';
import cookie from 'react-cookie';

import { isEmpty } from '../../utils/validation';

// Global reducer actions to be used with socket =>
import * as authActions from '../../redux/modules/auth';
import * as branchActions from '../../redux/modules/branches';
import * as feedActions from '../../redux/modules/feeds';
import * as messageActions from '../../redux/modules/messages';
import * as miscActions from '../../redux/modules/misc';
import * as userActions from '../../redux/modules/user';

// Global components 
import Modal from '../../components/Modal/Modal';
import OnboardPopover from '../../components/Popovers/OnboardPopover';
import DefaultPopover from '../../components/Popovers/DefaultPopover';


// function fetchData(getState, dispatch) {
//   bindActionCreators({loadAuthCookie}, dispatch).loadAuthCookie();
// }

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuthCookie()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({
    mounted: state.misc.appMounted,
    onboarded: state.user.onboarded,
    user: state.auth.user,
    activeFeed: state.feeds.activeFeed,
    activeBranch: state.branches.activeBranch
  }),
  dispatch => ({
    ...bindActionCreators({
      ...authActions,
      ...branchActions,
      ...feedActions,
      ...messageActions,
      ...miscActions,
      ...userActions,
      loadAuth,
      pushState
    }, dispatch)
  })
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    height: 0,
    width: 0
  }

  componentWillMount() {
    const { mounted } = this.props;
    if(!mounted) {
      this.props.loadAuth()
    }
  }

  componentDidMount() {
    this.setState({
      height: this.refs.app.clientHeight,
      width: this.refs.app.clientWidth
    });
    const { mounted, appMounted } = this.props;
    if(!mounted) {
      appMounted()
      window.addEventListener('resize', ::this.updateAppSize)
      window.addEventListener('beforeunload', ::this.removeSocketListeners)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.setSocket(nextProps.user)
      // <--- On signup, go to the welcome route for onboarding
      if(this.props.onboarded && !nextProps.onboarded) {
        this.props.pushState(null, '/teambranch/general');
        return;
      }
    } else if (this.props.user && !nextProps.user) {
      cookie.remove('_token')
      this.props.clearBranches()
      this.props.clearFeeds()
      this.props.clearMessages()
      this.props.closeOnboarding()
      socket.emit('disconnect')
      this.props.pushState(null, '/')
      global.socket = ''
    }
  }

  updateAppSize() {
    this.setState({
      height: this.refs.app.clientHeight,
      width: this.refs.app.clientWidth
    });
  }

  setSocket(user) {
    global.socket = this.initSocket();
    this.initSocketListeners()
    socket.emit('authenticate', {
      token: cookie.load('_token')
    })
    socket.emit('get parent memberships', {
      user_id: user.id
    })
  }

  initSocket() {
    let socketAddress;
    if(__HEROKUSERVER__) {
      socketAddress = config.herokuApi + '/chat'
    } else {
      socketAddress = config.apiHost + ':' + config.apiPort + '/chat'
    }
    const socket = io(socketAddress);
    return socket;
  }

  initSocketListeners() {
    const { user, activeBranch, activeFeed, pushState } = this.props;
    socket.on('connect', (res) => {
      console.log('socket connect', socket)
      // <--- Hello
      socket.on('connected', (res) => {
        console.log('server connect')
      })
      socket.on('disconnected', (res) => {
        console.log('server disconnected')
      })
      socket.on('authenticate', (res) => {
        console.log('authenticated')
      })
      // <---- Branches
      socket.on('receive parent memberships', (res) => {
        this.props.receiveBranches(res.memberships)
      })
      socket.on('receive parent membership', (res) => {
        this.props.newBranch(res)
      })
      socket.on('left parent', (res) => {
        console.log('left parent', res)
        this.props.leaveBranch(res.feed_id)
      })
      // <---- Feeds
      socket.on('receive child memberships', (res) => {
        this.props.receiveMemberships(res.memberships)
      })
      socket.on('receive nonmembership feeds', (res) => {
        this.props.receiveAllFeeds(res.feeds)
      })
      socket.on('new feed', (res) => {
        this.props.newFeed(res)
      })
      socket.on('receive child membership', (res) => {
        this.props.receiveFeed(res)
      })
      socket.on('user joined', (res) => {
        this.props.userJoinedFeed(res)
      })
      socket.on('left child', (res) => {
        console.log('left child', res)
        this.props.leaveFeed(res.feed_id)
      })
      socket.on('reflection', (res) => {
        console.log('reflection: ', res)
      })
      socket.on('user left', (res) => {
        console.log('user left', res)
        this.props.userLeftFeed(res)
      })
      // <---- Messages
      socket.on('receive messages', (res) => {
        this.props.receiveMessages(res.messages)
      })
      socket.on('receive message', (res) => {
        this.props.receiveMessage(res)
      })
      socket.on('receive vote', (res) => {
        this.props.receiveVote(res)
      })
      socket.on('update vote', (res) => {
        this.props.updateVote(res)
      })
      socket.on('user typing', (res) => {
        this.props.userTyping(res)
      })
      // <---- User
      socket.on('update user', (res) => {
        this.props.updateUserSuccess(res)
      })
      // <---- Error
      socket.on('error', (res) => {
        console.log('socket error: ', res)
      })
    })
    socket.on('reconnect_attempt', res => {
      console.log('reconnect', res)
    })
    socket.on('disconnect', (res) => {
      console.log('socket disconnect', res)
    })
  }

  removeSocketListeners() {
    window.removeEventListener('resize', ::this.updateAppSize)
    window.removeEventListener('beforeunload', ::this.removeSocketListeners)
    // socket.emit('disconnect')
  }

  render() {
    const { user, modalOpen, modalType, closeModal } = this.props;
    const { height, width } = this.state;
    const appChildrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        appHeight: height,
        appWidth: width,
        user: user
      })
    });
    const styles = require('./App.scss');
    return (
      <div id={styles.app} ref="app">
        <Helmet {...config.app.head}/>
          {appChildrenWithProps}
          <Modal/>
          <div id={styles.popovers}>
            <OnboardPopover/>
            <DefaultPopover/>
          </div>
      </div>
    );
  }
}
