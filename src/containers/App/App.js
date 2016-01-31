import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, loadAuthCookie, loadAuth } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
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
import Popover from '../../components/Popovers/Popover';

function fetchData(getState, dispatch) {
  bindActionCreators({loadAuthCookie}, dispatch).loadAuthCookie();
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
    this.props.loadAuth()
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
      this.initSocketListeners()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      if(this.props.onboarded && !nextProps.onboarded) {
        this.props.pushState(null, '/teambranch/welcome');
        return;
      }
      this.props.pushState(null, '/')
    } else if (this.props.user && !nextProps.user) {
      this.props.closeOnboarding()
      this.props.pushState(null, '/')
    }
  }

  componentWillUnmount() {
    const { mounted } = this.props;
  }

  updateAppSize() {
    this.setState({
      height: this.refs.app.clientHeight,
      width: this.refs.app.clientWidth
    });
  }

  initSocketListeners() {
    const { user, activeBranch, activeFeed, pushState } = this.props;
    socket.on('connect', (res) => {
      console.log('first connect')
      socket.on('connected', (res) => {
        console.log('second connect')
      })
      // <---- Auth
      socket.on('login', (res) => {
        this.props.login(res)
      })
      socket.on('signup', (res) => {
        this.props.signup(res, pushState)
      })
      socket.on('authenticate', (res) => {
        console.log('authenticate: ', res)
      })
      // <---- Branches
      socket.on('receive parent memberships', (res) => {
        this.props.receiveBranches(res.memberships)
      })
      socket.on('receive parent membership', (res) => {
        this.props.newBranch(res)
      })
      socket.on('left parent', (res) => {
        this.props.leaveBranch(res.mem)
      })
      // <---- Feeds
      socket.on('receive child memberships', (res) => {
        console.log('child mems: ', res)
        this.props.receiveMemberships(res.memberships)
      })
      socket.on('receive nonmembership feeds', (res) => {
        console.log('all feeds: ', res)
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
      socket.on('leave child', (res) => {
        this.props.leaveFeed(res)
      })
      socket.on('user left child', (res) => {
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
      socket.on('user typing', (res) => {
        this.props.userTyping(res)
      })
      // <---- User
      socket.on('update user', (res) => {
        this.props.updateUser(res)
      })
      // <---- Error
      socket.on('error', (res) => {
        console.log('error: ', res)
      })
    })
  }

  removeSocketListeners() {
    window.removeEventListener('resize', ::this.updateAppSize)
    window.removeEventListener('beforeunload', ::this.removeSocketListeners)
    socket.emit('disconnect')
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
          <Popover/>
      </div>
    );
  }
}
