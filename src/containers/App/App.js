import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, loadAuthCookie, loadAuth } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

// Global actions to be used => with socket
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
    user: state.auth.user
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
    window.addEventListener('resize', ::this.updateAppSize)
    this.initSocketListeners()
    this.initSocketEmitters()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState(null, '/')
      this.updateAppSize()
    } else if (this.props.user && !nextProps.user) {
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.updateAppSize)
  }

  updateAppSize() {
    this.setState({
      height: this.refs.app.clientHeight,
      width: this.refs.app.clientWidth
    });
  }

  initSocketListeners() {
    const { pushState } = this.props;
    socket.on('connect', (res) => {
      socket.on('connected', (res) => {
        console.log('hello: ', res)
      })
      // Auth
      socket.on('login', (res) => {
        this.props.login(res, pushState)
      })
      socket.on('signup', (res) => {
        this.props.signup(res)
      })
      // Branches
      socket.on('receive parent', (res) => {
        this.props.newBranch(res)
      })
      socket.on('receive parent memberships', (res) => {
        this.props.receiveBranches(res)
      })
      socket.on('left parent', (res) => {
        this.props.leaveBranch(res)
      })
      // Feeds
      socket.on('receive child memberships', (res) => {
        this.props.receiveMemberships(res)
      })
      socket.on('receive nonmembership feeds', (res) => {
        this.props.receiveAllFeeds(res)
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
      // Messages
      socket.on('receive messages', (res) => {
        this.props.receiveMessages(res)
      })
      socket.on('receive message', (res) => {
        this.props.receiveMessage(res)
      })
      socket.on('receive vote', (res) => {
        this.props.receiveVote(res)
      })
      // User
      socket.on('update user', (res) => {
        this.props.updateUser(res)
      })
    })
  }

  initSocketEmitters() {
    socket.emit('request connect', {
      user_id: this.props.user
    })
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
