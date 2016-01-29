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
    window.addEventListener('resize', ::this.updateAppSize)
    this.initSocketListeners()
    this.initSocketEmitters()
    const { params, pushState } = this.props;
    if(params.branch_name == 'signup') pushState(null, '/signup')
    if(params.branch_name == 'login') pushState(null, '/login')
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
    socket.emit('disconnect')
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
      socket.on('receive parent memberships', (res) => {
        this.props.receiveBranches(res.memberships)
        if(Array.isArray(res.memberships) && res.memberships.length > 0) {
          res.memberships.forEach(branch => {
            socket.emit('get child memberships', {
              user_id: user.id,
              parent_id: branch.id
            })
            socket.emit('get nonmembership feeds', {
              user_id: user.id,
              parent_id: branch.id
            })
          })
        }
      })
      socket.on('receive parent membership', (res) => {
        this.props.newBranch(res)
      })
      socket.on('left parent', (res) => {
        this.props.leaveBranch(res.mem)
      })
      // Feeds
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
        socket.emit('get messages', {
          user_id: user.id,
          feed_id: res.feed_id
        })
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
        this.props.receiveMessages(res.messages)
      })
      socket.on('receive message', (res) => {
        this.props.receiveMessage(res)
        if(mes.parent_id !== activeBranch) {
          this.props.markBranchUnread(mes.parent_id)
        }
        if(mes.feed_id !== activeFeed) {
          this.props.markFeedUnread(mes.feed_id)
        }
      })
      socket.on('receive vote', (res) => {
        this.props.receiveVote(res)
      })
      socket.on('user typing', (res) => {
        this.props.userTyping(res)
      })
      // User
      socket.on('update user', (res) => {
        this.props.updateUser(res)
      })
    })
  }

  initSocketEmitters() {
    const { user } = this.props;
    socket.emit('request connect', {
      user_id: isEmpty(user) ? null : user.id
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
