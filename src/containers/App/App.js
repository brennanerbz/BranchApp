import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, loadAuthCookie, loadAuth } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

function fetchData(getState, dispatch) {
  // const promises = [];
  // if (!isAuthLoaded(getState())) {
  //   promises.push(dispatch(loadAuthCookie()));
  // }
  // return Promise.all(promises);
  bindActionCreators({loadAuthCookie}, dispatch).loadAuthCookie();
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  dispatch => ({
    ...bindActionCreators({
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
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      console.log('logged in')
      this.props.pushState(null, '/')
    } else if (this.props.user && !nextProps.user) {
      console.log('logged out')
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

  render() {
    const { user } = this.props,
    { height, width } = this.state,
    appChildrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        appHeight: height,
        appWidth: width
      })
    }),
    styles = require('./App.scss');
    return (
      <div id={styles.app} ref="app">
        <Helmet {...config.app.head}/>
          {appChildrenWithProps}
      </div>
    );
  }
}
